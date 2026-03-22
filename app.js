/* ===== DOM Elements ===== */
const boardEl = document.getElementById("board");
const gameModeEl = document.getElementById("game-mode");
const playerColorEl = document.getElementById("player-color");
const difficultyRangeEl = document.getElementById("difficulty-range");
const difficultyLabelEl = document.getElementById("difficulty-label");
const removeModeEl = document.getElementById("remove-mode");
const evalScoreEl = document.getElementById("eval-score");
const evalDetailEl = document.getElementById("eval-detail");
const evalFillEl = document.getElementById("eval-fill");
const statusEl = document.getElementById("status");
const statusDotEl = document.getElementById("status-dot");
const removeControlsEl = document.getElementById("remove-controls");
const qualityFillEl = document.getElementById("quality-fill");
const qualityTextEl = document.getElementById("quality-text");
const playerLevelEl = document.getElementById("player-level");
const playerEloEl = document.getElementById("player-elo");
const handicapOfferEl = document.getElementById("handicap-offer");
const handicapSuggestionEl = document.getElementById("handicap-suggestion");
const handicapHelpEl = document.getElementById("handicap-help");
const startSuggestedEl = document.getElementById("start-suggested");
const editHandicapEl = document.getElementById("edit-handicap");
const startCustomEl = document.getElementById("start-custom");
const cancelHandicapEl = document.getElementById("cancel-handicap");
const startGameEl = document.getElementById("start-game");
const resetGameEl = document.getElementById("reset-game");
const flipBoardEl = document.getElementById("flip-board");
const undoMoveEl = document.getElementById("undo-move");
const moveHistoryEl = document.getElementById("move-history");
const opponentCapturedEl = document.getElementById("opponent-captured");
const playerCapturedEl = document.getElementById("player-captured");
const gameOverModal = document.getElementById("game-over-modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalIcon = document.getElementById("modal-icon");
const modalNewGame = document.getElementById("modal-new-game");
const modalClose = document.getElementById("modal-close");

/* ===== Game State ===== */
const ACTION_STACK = [];
const REMOVED_PIECES = new Map();
const ENGINE_TIMEOUT_MS = 8000;

// Difficulty levels: time limit in ms (how long engine thinks)
const DIFFICULTY_LEVELS = {
  1: { time: 200,  depth: 5,  label: "Beginner",      elo: "~800" },
  2: { time: 400,  depth: 8,  label: "Easy",           elo: "~1200" },
  3: { time: 800,  depth: 10, label: "Medium",         elo: "~1600" },
  4: { time: 1500, depth: 14, label: "Hard",           elo: "~2000" },
  5: { time: 3000, depth: 20, label: "Maximum",        elo: "~2300" },
};
let currentDifficulty = 3; // default to Medium

let game = new Chess();
let board = null;
let engine = null;
let pendingEngineMove = false;
let engineBusy = false;
let engineReady = false;
let engineSearchTimeout = null;
let lastEvalWhite = 0;
let lastEvalValid = false;
let pendingQuality = false;
let prevEvalWhite = 0;
let totalCpl = 0;
let moveCount = 0;
let editHandicapActive = false;
let lastMoveFrom = null;
let lastMoveTo = null;
let moveHistoryData = [];

/* ===== Sound Effects ===== */
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'move':
        osc.frequency.value = 600;
        gain.gain.value = 0.08;
        osc.type = 'sine';
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
        break;
      case 'capture':
        osc.frequency.value = 300;
        gain.gain.value = 0.12;
        osc.type = 'triangle';
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
        break;
      case 'check':
        osc.frequency.value = 800;
        gain.gain.value = 0.1;
        osc.type = 'square';
        osc.start();
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
        break;
      case 'gameover':
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
        osc.type = 'sine';
        osc.start();
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(330, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(220, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
        break;
    }
  } catch (e) {
    // Audio not available, no big deal
  }
}

/* ===== Engine ===== */
function estimateEloForDepth(depth) {
  return Math.round(600 + Math.min(Math.max(depth, 1), 30) * 85);
}

function estimatePlayerEloFromAcpl(acpl) {
  return Math.round(2600 - Math.min(Math.max(acpl, 10), 200) * 8);
}

function initEngine() {
  if (engine) engine.terminate?.();
  // Try WASM first, fall back to old JS engine
  try {
    engine = new Worker("stockfish-18-lite-single.js");
  } catch (e) {
    console.warn("WASM engine failed, falling back to stockfish.js", e);
    engine = new Worker("stockfish.js");
  }
  engine.onmessage = handleEngineMessage;
  engineReady = false;
  engine.postMessage("uci");
  applyDifficultySettings();
  engine.postMessage("isready");
}

function applyDifficultySettings() {
  const diff = DIFFICULTY_LEVELS[currentDifficulty];
  if (currentDifficulty <= 2) {
    // Lower difficulties: limit strength
    const skillLevel = currentDifficulty === 1 ? 0 : 5;
    engine.postMessage(`setoption name Skill Level value ${skillLevel}`);
    engine.postMessage("setoption name UCI_LimitStrength value true");
    engine.postMessage(`setoption name UCI_Elo value ${parseInt(diff.elo.replace('~',''))}`);
  } else {
    engine.postMessage("setoption name Skill Level value 20");
    engine.postMessage("setoption name UCI_LimitStrength value false");
  }
  // Update UI
  const opponentRating = document.getElementById("opponent-rating");
  const opponentName = document.getElementById("opponent-name");
  if (opponentRating) opponentRating.textContent = `${diff.elo} Elo · ${diff.label}`;
  if (opponentName) opponentName.textContent = `Stockfish 18 WASM`;
}

function handleEngineMessage(event) {
  const msg = typeof event.data === "string" ? event.data : "";

  if (msg.startsWith("info")) {
    const scoreMatch = msg.match(/score (cp|mate) (-?\d+)/);
    if (scoreMatch) {
      const type = scoreMatch[1];
      const raw = parseInt(scoreMatch[2], 10);
      updateEvaluation(type, raw);
      if (type === "cp") {
        lastEvalWhite = game.turn() === "w" ? raw : -raw;
        lastEvalValid = true;
      }
    }
  }

  if (msg.startsWith("readyok")) {
    engineReady = true;
    if (pendingEngineMove) analyzePosition();
  }

  if (msg.startsWith("bestmove")) {
    if (engineSearchTimeout) { clearTimeout(engineSearchTimeout); engineSearchTimeout = null; }
    engineBusy = false;
    const bestMove = msg.split(" ")[1];
    if (pendingQuality) { recordMoveQuality(); pendingQuality = false; }
    if (pendingEngineMove && bestMove && bestMove !== "(none)") {
      applyEngineMove(bestMove);
    }
    pendingEngineMove = false;
  }
}

/* ===== Evaluation ===== */
function updateEvaluation(type, value) {
  if (type === "mate") {
    const sign = value > 0 ? "+" : "-";
    evalScoreEl.textContent = `${sign}M${Math.abs(value)}`;
    evalDetailEl.textContent = "Mate sequence";
    evalScoreEl.style.color = value > 0 ? "var(--success)" : "var(--danger)";
    // Eval bar for mate
    const fillPct = value > 0 ? 95 : 5;
    evalFillEl.style.height = `${fillPct}%`;
    return;
  }

  const score = (value / 100).toFixed(2);
  const displayScore = value >= 0 ? `+${score}` : score;
  evalScoreEl.textContent = displayScore;
  evalDetailEl.textContent = `${value} centipawns`;

  // Color based on who's ahead
  const evalWhite = game.turn() === "w" ? value : -value;
  if (evalWhite > 50) evalScoreEl.style.color = "#fff";
  else if (evalWhite < -50) evalScoreEl.style.color = "var(--text-muted)";
  else evalScoreEl.style.color = "var(--text)";

  // Update eval bar (50% = equal, 100% = white winning, 0% = black winning)
  const sigmoid = 1 / (1 + Math.exp(-evalWhite / 300));
  const fillPct = Math.max(2, Math.min(98, sigmoid * 100));
  evalFillEl.style.height = `${fillPct}%`;
}

/* ===== Board Moves ===== */
function applyEngineMove(bestMove) {
  const from = bestMove.slice(0, 2);
  const to = bestMove.slice(2, 4);
  const promotion = bestMove.slice(4, 5);
  const move = { from, to };
  if (promotion) move.promotion = promotion;

  const made = game.move(move);
  if (made) {
    ACTION_STACK.push({ type: "move", actor: "engine" });
    lastMoveFrom = from;
    lastMoveTo = to;
    if (made.captured) playSound('capture');
    else playSound('move');
  }
  syncBoard();
  highlightLastMove();
  updateMoveHistory();
  updateCapturedPieces();
  analyzePosition();
  updateStatusAfterMove();
  updateTurnIndicator();
}

function analyzePosition() {
  if (!engine || engineBusy) return;
  if (!engineReady) { engine.postMessage("isready"); return; }
  engineBusy = true;
  engine.postMessage("stop");
  engine.postMessage(`position fen ${game.fen()}`);

  const diff = DIFFICULTY_LEVELS[currentDifficulty];
  if (pendingEngineMove) {
    // Engine's turn: use time limit for responsive play
    engine.postMessage(`go movetime ${diff.time}`);
  } else {
    // Just analyzing player's position: quick shallow search
    engine.postMessage(`go depth ${Math.min(diff.depth, 12)}`);
  }

  setStatus("thinking", "Engine thinking...");

  if (engineSearchTimeout) clearTimeout(engineSearchTimeout);
  engineSearchTimeout = setTimeout(() => {
    if (!engineBusy) return;
    engine.postMessage("stop");
    engineBusy = false;
    if (pendingEngineMove || isEngineTurn()) analyzePosition();
  }, ENGINE_TIMEOUT_MS);
}

function requestEngineMove() {
  if (!engine || engineBusy) return;
  pendingEngineMove = true;
  analyzePosition();
}

function isEngineTurn() {
  if (gameModeEl.value !== "pve") return false;
  const playerColor = playerColorEl.value === "white" ? "w" : "b";
  return game.turn() !== playerColor;
}

/* ===== Drag & Drop ===== */
function handleDragStart(source, piece) {
  if (removeModeEl.value !== "off") return false;
  if (gameModeEl.value === "pve") {
    const playerColor = playerColorEl.value === "white" ? "w" : "b";
    if (piece[0] !== playerColor) return false;
  }
  if (game.game_over()) return false;
  highlightMoves(source);
  return true;
}

function handleDrop(source, target) {
  if (removeModeEl.value !== "off") return "snapback";

  const move = game.move({ from: source, to: target, promotion: "q" });
  if (!move) return "snapback";

  if (lastEvalValid) { prevEvalWhite = lastEvalWhite; pendingQuality = true; }

  ACTION_STACK.push({ type: "move", actor: "player" });
  lastMoveFrom = source;
  lastMoveTo = target;

  if (move.captured) playSound('capture');
  else playSound('move');

  syncBoard();
  highlightLastMove();
  clearHighlights();
  updateMoveHistory();
  updateCapturedPieces();
  updateTurnIndicator();

  if (isEngineTurn()) requestEngineMove();
  else analyzePosition();

  updateStatusAfterMove();
  return undefined;
}

function handleSnapEnd() {
  board.position(game.fen());
}

/* ===== Board Sync ===== */
function syncBoard() {
  board.position(game.fen());
  applyRemovedShading();
}

function resetGame() {
  game.reset();
  ACTION_STACK.length = 0;
  REMOVED_PIECES.clear();
  clearRemovedShading();
  pendingQuality = false;
  prevEvalWhite = 0;
  totalCpl = 0;
  moveCount = 0;
  lastMoveFrom = null;
  lastMoveTo = null;
  moveHistoryData = [];
  syncBoard();
  updateMoveHistory();
  updateCapturedPieces();
  analyzePosition();
  updateStatusAfterMove();
  updateTurnIndicator();
  setStatus("ready", "Ready — your move!");
  if (isEngineTurn()) requestEngineMove();
}

/* ===== Status Updates ===== */
function setStatus(type, text) {
  statusEl.textContent = text;
  statusDotEl.style.background =
    type === "thinking" ? "var(--warning)" :
    type === "check" ? "var(--danger)" :
    type === "gameover" ? "var(--text-muted)" :
    "var(--success)";
}

function updateStatusAfterMove() {
  if (game.in_checkmate()) {
    const winner = game.turn() === "w" ? "Black" : "White";
    const playerColor = playerColorEl.value === "white" ? "w" : "b";
    const playerWon = winner[0].toLowerCase() === playerColor;

    playSound('gameover');
    setStatus("gameover", `Checkmate! ${winner} wins.`);
    showGameOverModal(
      playerWon ? "🎉" : "💀",
      playerWon ? "You Win!" : "You Lost",
      playerWon ? "Checkmate — great game!" : `Checkmate — ${winner} wins. Try again!`
    );
    return;
  }

  if (game.in_stalemate()) {
    playSound('gameover');
    setStatus("gameover", "Stalemate — draw!");
    showGameOverModal("🤝", "Stalemate", "The game is a draw.");
    return;
  }

  if (game.in_draw()) {
    playSound('gameover');
    setStatus("gameover", "Draw!");
    showGameOverModal("🤝", "Draw", "The game is a draw.");
    return;
  }

  if (game.in_check()) {
    playSound('check');
    setStatus("check", "Check!");
    return;
  }

  const turn = game.turn() === "w" ? "White" : "Black";
  if (isEngineTurn()) {
    setStatus("thinking", "Engine thinking...");
  } else {
    setStatus("ready", `${turn} to move`);
  }
}

/* ===== Game Over Modal ===== */
function showGameOverModal(icon, title, message) {
  modalIcon.textContent = icon;
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  gameOverModal.classList.remove("hidden");
}

function hideGameOverModal() {
  gameOverModal.classList.add("hidden");
}

modalNewGame.addEventListener("click", () => { hideGameOverModal(); openHandicapOffer(); });
modalClose.addEventListener("click", hideGameOverModal);
gameOverModal.querySelector(".modal-backdrop").addEventListener("click", hideGameOverModal);

/* ===== Highlights ===== */
function highlightMoves(square) {
  clearHighlights();
  const moves = game.moves({ square, verbose: true });
  if (!moves.length) return;
  for (const move of moves) {
    const el = boardEl.querySelector(`[data-square='${move.to}']`);
    if (el) el.classList.add("square-highlight");
  }
  const fromEl = boardEl.querySelector(`[data-square='${square}']`);
  if (fromEl) fromEl.classList.add("square-highlight");
}

function clearHighlights() {
  boardEl.querySelectorAll(".square-highlight").forEach(el => el.classList.remove("square-highlight"));
}

function highlightLastMove() {
  boardEl.querySelectorAll(".square-last-move").forEach(el => el.classList.remove("square-last-move"));
  if (lastMoveFrom) {
    const fromEl = boardEl.querySelector(`[data-square='${lastMoveFrom}']`);
    if (fromEl) fromEl.classList.add("square-last-move");
  }
  if (lastMoveTo) {
    const toEl = boardEl.querySelector(`[data-square='${lastMoveTo}']`);
    if (toEl) toEl.classList.add("square-last-move");
  }
}

/* ===== Turn Indicator ===== */
function updateTurnIndicator() {
  const playerBar = document.querySelector(".player-bar.player");
  const opponentBar = document.querySelector(".player-bar.opponent");
  const playerColor = playerColorEl.value === "white" ? "w" : "b";
  const isPlayerTurn = game.turn() === playerColor;

  playerBar.classList.toggle("active-turn", isPlayerTurn);
  opponentBar.classList.toggle("active-turn", !isPlayerTurn);
}

/* ===== Move History ===== */
function updateMoveHistory() {
  const history = game.history();
  moveHistoryData = history;

  if (!history.length) {
    moveHistoryEl.innerHTML = '<div class="move-history-empty">No moves yet</div>';
    return;
  }

  let html = '';
  for (let i = 0; i < history.length; i += 2) {
    const moveNum = Math.floor(i / 2) + 1;
    const whiteMove = history[i];
    const blackMove = history[i + 1] || '';
    const isLatestWhite = i === history.length - 1;
    const isLatestBlack = i + 1 === history.length - 1;

    html += `<div class="move-row">
      <span class="move-num">${moveNum}.</span>
      <span class="move-white ${isLatestWhite ? 'move-latest' : ''}">${whiteMove}</span>
      <span class="move-black ${isLatestBlack ? 'move-latest' : ''}">${blackMove}</span>
    </div>`;
  }

  moveHistoryEl.innerHTML = html;
  moveHistoryEl.scrollTop = moveHistoryEl.scrollHeight;
}

/* ===== Captured Pieces ===== */
const PIECE_SYMBOLS = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚',
  P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔'
};

const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9 };

function updateCapturedPieces() {
  const history = game.history({ verbose: true });
  const whiteCaptured = []; // pieces white captured (black pieces)
  const blackCaptured = []; // pieces black captured (white pieces)

  for (const move of history) {
    if (move.captured) {
      if (move.color === 'w') whiteCaptured.push(move.captured);
      else blackCaptured.push(move.captured);
    }
  }

  // Sort by value
  const sortByValue = (a, b) => (PIECE_VALUES[b] || 0) - (PIECE_VALUES[a] || 0);
  whiteCaptured.sort(sortByValue);
  blackCaptured.sort(sortByValue);

  const playerColor = playerColorEl.value;
  const playerPieces = playerColor === 'white' ? whiteCaptured : blackCaptured;
  const opponentPieces = playerColor === 'white' ? blackCaptured : whiteCaptured;

  playerCapturedEl.textContent = playerPieces.map(p => PIECE_SYMBOLS[p] || p).join(' ');
  opponentCapturedEl.textContent = opponentPieces.map(p => PIECE_SYMBOLS[p] || p).join(' ');
}

/* ===== Piece Removal (Handicap) ===== */
function removePieceAtSquare(square) {
  if (REMOVED_PIECES.has(square)) {
    const stored = REMOVED_PIECES.get(square);
    game.put(stored, square);
    REMOVED_PIECES.delete(square);
    ACTION_STACK.push({ type: "restore", square, piece: stored });
  } else {
    const piece = game.get(square);
    if (!piece) return;
    REMOVED_PIECES.set(square, piece);
    ACTION_STACK.push({ type: "remove", square, piece });
    game.remove(square);
  }
  syncBoard();
  analyzePosition();
}

function onBoardClick(event) {
  if (!editHandicapActive || removeModeEl.value === "off") return;
  const squareEl = event.target.closest(".square-55d63");
  if (!squareEl) return;
  removePieceAtSquare(squareEl.dataset.square);
}

function applyRemovedShading() {
  if (!editHandicapActive) { clearRemovedShading(); return; }
  clearRemovedShading();
  REMOVED_PIECES.forEach((_, sq) => {
    const el = boardEl.querySelector(`[data-square='${sq}']`);
    if (el) el.classList.add("square-removed");
  });
}

function clearRemovedShading() {
  boardEl.querySelectorAll(".square-removed").forEach(el => el.classList.remove("square-removed"));
}

/* ===== Undo ===== */
function undoMove() {
  if (!ACTION_STACK.length) return;
  let last = ACTION_STACK.pop();

  if (last.type === "remove") {
    game.put(last.piece, last.square);
    REMOVED_PIECES.delete(last.square);
    syncBoard(); analyzePosition();
    return;
  }

  if (last.type === "restore") {
    game.remove(last.square);
    REMOVED_PIECES.set(last.square, last.piece);
    syncBoard(); analyzePosition();
    return;
  }

  if (gameModeEl.value === "pve") {
    if (last.type === "move" && last.actor === "engine") {
      game.undo();
      last = ACTION_STACK.pop();
    }
    if (last && last.type === "move" && last.actor === "player") {
      game.undo();
    }
  } else {
    if (last.type === "move") game.undo();
  }

  syncBoard();
  updateMoveHistory();
  updateCapturedPieces();
  pendingQuality = false;
  pendingEngineMove = isEngineTurn();
  engineBusy = false;
  engine.postMessage("stop");
  analyzePosition();
  updateStatusAfterMove();
  updateTurnIndicator();
}

/* ===== Move Quality ===== */
function recordMoveQuality() {
  if (!lastEvalValid) return;
  if (REMOVED_PIECES.size > 0) {
    qualityTextEl.textContent = "Last move: --";
    playerLevelEl.textContent = "~500 Elo";
    return;
  }
  const playerColor = playerColorEl.value === "white" ? "w" : "b";
  const prevEval = playerColor === "w" ? prevEvalWhite : -prevEvalWhite;
  const currentEval = playerColor === "w" ? lastEvalWhite : -lastEvalWhite;
  const cpl = Math.max(0, prevEval - currentEval);
  totalCpl += cpl;
  moveCount += 1;
  const acpl = totalCpl / moveCount;
  const quality = Math.max(0, Math.min(100, Math.round(100 - cpl / 2)));

  qualityFillEl.style.width = `${quality}%`;
  qualityTextEl.textContent = `Last move: ${Math.round(cpl)} CPL`;
  const playerElo = estimatePlayerEloFromAcpl(acpl);
  playerLevelEl.textContent = `~${playerElo} Elo`;
  playerEloEl.textContent = `~${playerElo} Elo`;
  localStorage.setItem("playerEloEstimate", playerElo.toString());
  localStorage.setItem("playerAcpl", acpl.toFixed(1));
}

function loadPlayerEstimate() {
  const storedElo = localStorage.getItem("playerEloEstimate");
  if (storedElo) {
    playerLevelEl.textContent = `~${storedElo} Elo`;
    playerEloEl.textContent = `~${storedElo} Elo`;
  } else {
    playerLevelEl.textContent = "Play to estimate";
    playerEloEl.textContent = "Play to estimate";
  }
}

/* ===== Handicap ===== */
function computeSuggestedHandicap() {
  const storedElo = parseInt(localStorage.getItem("playerEloEstimate") || "500", 10);
  const diff = DIFFICULTY_LEVELS[currentDifficulty];
  const engineElo = parseInt(diff.elo.replace('~',''));
  const gap = engineElo - storedElo;
  const options = [
    { label: "Remove pawn rows (both)", offset: 1000, pieces: ["p-row"] },
  ];
  let pick = options[0];
  for (const o of options) { if (o.offset <= gap) pick = o; }
  return { ...pick, gap, engineElo, playerElo: storedElo };
}

function applyHandicapSuggestion(suggestion) {
  const aiColor = playerColorEl.value === "white" ? "b" : "w";
  const pieceSquares = {
    b: { q: ["d8"], r: ["a8"], n: ["b8"], b: ["c8"], p: "a7 b7 c7 d7 e7 f7 g7 h7".split(" ") },
    w: { q: ["d1"], r: ["a1"], n: ["b1"], b: ["c1"], p: "a2 b2 c2 d2 e2 f2 g2 h2".split(" ") },
  };
  suggestion.pieces.forEach(piece => {
    if (piece === "p-row") {
      pieceSquares[aiColor].p.forEach(sq => removePieceAtSquare(sq));
      const playerColor = aiColor === "w" ? "b" : "w";
      pieceSquares[playerColor].p.forEach(sq => removePieceAtSquare(sq));
      return;
    }
    const squares = pieceSquares[aiColor][piece];
    const sq = squares.find(s => game.get(s));
    if (sq) removePieceAtSquare(sq);
  });
}

function openHandicapOffer() {
  const suggestion = computeSuggestedHandicap();
  handicapSuggestionEl.textContent = suggestion.label;
  handicapHelpEl.textContent = `AI ~${suggestion.engineElo} vs you ~${suggestion.playerElo} Elo`;
  handicapOfferEl.classList.remove("hidden");
  startCustomEl.classList.add("hidden");
  editHandicapEl.classList.remove("hidden");
  removeControlsEl.classList.add("hidden");
  removeModeEl.value = "off";
  editHandicapActive = false;

  startSuggestedEl.onclick = () => {
    resetGame();
    applyHandicapSuggestion(suggestion);
    finishHandicapSetup();
  };
  editHandicapEl.onclick = () => {
    resetGame();
    editHandicapActive = true;
    removeModeEl.value = "on";
    startCustomEl.classList.remove("hidden");
    editHandicapEl.classList.add("hidden");
    removeControlsEl.classList.remove("hidden");
  };
  startCustomEl.onclick = () => finishHandicapSetup();
  cancelHandicapEl.onclick = () => {
    handicapOfferEl.classList.add("hidden");
    removeModeEl.value = "off";
    editHandicapActive = false;
    removeControlsEl.classList.add("hidden");
  };
}

function finishHandicapSetup() {
  handicapOfferEl.classList.add("hidden");
  removeModeEl.value = "off";
  editHandicapActive = false;
  removeControlsEl.classList.add("hidden");
  clearRemovedShading();
  pendingEngineMove = isEngineTurn();
  analyzePosition();
  if (isEngineTurn()) requestEngineMove();
}

/* ===== Init Board ===== */
function initBoard() {
  board = Chessboard("board", {
    position: "start",
    draggable: true,
    orientation: "white",
    pieceTheme: "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
    onDragStart: handleDragStart,
    onDrop: handleDrop,
    onSnapEnd: handleSnapEnd,
    onMouseoutSquare: clearHighlights,
    onMouseoverSquare: (square, piece) => {
      if (!piece || removeModeEl.value !== "off") return;
      if (gameModeEl.value === "pve") {
        const pc = playerColorEl.value === "white" ? "w" : "b";
        if (piece[0] !== pc) return;
      }
      highlightMoves(square);
    },
  });
  boardEl.addEventListener("click", onBoardClick);

  // Handle window resize for responsive board
  window.addEventListener("resize", () => board.resize());
}

/* ===== Boot ===== */
loadPlayerEstimate();

try { initEngine(); }
catch (e) {
  evalDetailEl.textContent = "Engine failed";
  setStatus("gameover", "Engine failed to load");
  console.error(e);
}

initBoard();
analyzePosition();
updateStatusAfterMove();
updateTurnIndicator();

/* ===== Event Listeners ===== */
gameModeEl.addEventListener("change", resetGame);
playerColorEl.addEventListener("change", () => {
  board.orientation(playerColorEl.value);
  resetGame();
});
startGameEl.addEventListener("click", openHandicapOffer);
resetGameEl.addEventListener("click", resetGame);
flipBoardEl.addEventListener("click", () => board.flip());
undoMoveEl.addEventListener("click", undoMove);

// Difficulty slider
difficultyRangeEl.addEventListener("input", () => {
  currentDifficulty = parseInt(difficultyRangeEl.value);
  const diff = DIFFICULTY_LEVELS[currentDifficulty];
  difficultyLabelEl.textContent = diff.label;
  applyDifficultySettings();
  engine.postMessage("isready");
});
