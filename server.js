import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  next();
});
app.use(express.static(__dirname));
app.use(
  "/engine",
  express.static(path.join(__dirname, "node_modules", "fairy-stockfish-nnue.wasm"))
);

const rooms = new Map();

app.post("/api/create-room", (_req, res) => {
  const roomId = nanoid(8);
  rooms.set(roomId, { fen: null, players: {}, updatedAt: Date.now() });
  res.json({ roomId });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcast(roomId, payload, exclude) {
  for (const client of wss.clients) {
    if (client.readyState !== 1) continue;
    if (client.roomId !== roomId) continue;
    if (exclude && client === exclude) continue;
    client.send(JSON.stringify(payload));
  }
}

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (msg.type === "join") {
      const room = rooms.get(msg.roomId);
      if (!room) {
        ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
        return;
      }
      ws.roomId = msg.roomId;
      const existing = room.players[msg.clientId];
      const usedSides = new Set(Object.values(room.players).map((player) => player.side));
      const assignedSide = existing?.side || (usedSides.has("w") ? "b" : "w");
      room.players[msg.clientId] = {
        name: msg.name || existing?.name || "Player",
        elo: msg.elo || existing?.elo || 500,
        side: assignedSide,
      };
      if (!room.fen && msg.fen) {
        room.fen = msg.fen;
      }
      ws.send(
        JSON.stringify({
          type: "state",
          fen: room.fen,
          roomId: msg.roomId,
          side: assignedSide,
          players: room.players,
        })
      );
      broadcast(msg.roomId, { type: "presence", players: room.players }, ws);
      return;
    }

    if (msg.type === "move") {
      const room = rooms.get(msg.roomId);
      if (!room) return;
      if (msg.fen) {
        room.fen = msg.fen;
      }
      room.updatedAt = Date.now();
      broadcast(msg.roomId, { type: "move", fen: msg.fen || null, move: msg.move }, ws);
      return;
    }
  });

  ws.on("close", () => {
    if (!ws.roomId) return;
    const room = rooms.get(ws.roomId);
    if (room) {
      room.updatedAt = Date.now();
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
