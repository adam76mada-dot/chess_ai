const boardEl = document.getElementById("board");
const gameModeEl = document.getElementById("game-mode");
const statusEl = document.getElementById("status");
const depthRangeEl = document.getElementById("depth-range");
const depthValueEl = document.getElementById("depth-value");
const depthControlEl = document.getElementById("depth-control");
const variantSelectEl = document.getElementById("variant-select");
const userSelectEl = document.getElementById("user-select");
const newUserNameEl = document.getElementById("new-user-name");
const newUserEloEl = document.getElementById("new-user-elo");
const addUserEl = document.getElementById("add-user");
const currentEloEl = document.getElementById("current-elo");
const saveEloEl = document.getElementById("save-elo");
const userEloEl = document.getElementById("user-elo");
const moveArrowsEl = document.getElementById("move-arrows");
const turnIndicatorEl = document.getElementById("turn-indicator");
const whiteNameEl = document.getElementById("white-name");
const whiteEloEl = document.getElementById("white-elo");
const blackNameEl = document.getElementById("black-name");
const blackEloEl = document.getElementById("black-elo");
const whiteNameBoardEl = document.getElementById("white-name-board");
const whiteEloBoardEl = document.getElementById("white-elo-board");
const blackNameBoardEl = document.getElementById("black-name-board");
const blackEloBoardEl = document.getElementById("black-elo-board");
const whiteIconEl = document.getElementById("white-icon");
const blackIconEl = document.getElementById("black-icon");
const whiteIconBoardEl = document.getElementById("white-icon-board");
const blackIconBoardEl = document.getElementById("black-icon-board");
const whiteHandicapEl = document.getElementById("white-handicap");
const blackHandicapEl = document.getElementById("black-handicap");
const whiteCapturedEl = document.getElementById("white-captured");
const blackCapturedEl = document.getElementById("black-captured");
const startGameEl = document.getElementById("start-game");
const flipBoardEl = document.getElementById("flip-board");
const undoMoveEl = document.getElementById("undo-move");
const fullscreenToggleEl = document.getElementById("fullscreen-toggle");
const toggleSettingsEl = document.getElementById("toggle-settings");
const settingsContentEl = document.getElementById("settings-content");
const handicapModalEl = document.getElementById("handicap-modal");
const handicapSuggestionEl = document.getElementById("handicap-suggestion");
const handicapHelpEl = document.getElementById("handicap-help");
const applySuggestionEl = document.getElementById("apply-suggestion");
const startCustomEl = document.getElementById("start-custom");
const startPvpModalEl = document.getElementById("start-pvp-modal");
const handicapLinkRowEl = document.getElementById("handicap-link-row");
const handicapLinkEl = document.getElementById("handicap-link");
const handicapCopyEl = document.getElementById("handicap-copy");
const showAllMovesEl = document.getElementById("show-all-moves");
const showTurnArrowsEl = document.getElementById("show-turn-arrows");
const timeModeEl = document.getElementById("time-mode");
const timeSecondsEl = document.getElementById("time-seconds");
const timerBarEl = document.getElementById("timer-bar");
const timerFillEl = document.getElementById("timer-fill");
const totalTimeModeEl = document.getElementById("total-time-mode");
const totalTimeMinutesEl = document.getElementById("total-time-minutes");
const totalTimerBarEl = document.getElementById("total-timer-bar");
const totalTimerFillEl = document.getElementById("total-timer-fill");
const checkmateModalEl = document.getElementById("checkmate-modal");
const checkmateTextEl = document.getElementById("checkmate-text");
const checkmateNewGameEl = document.getElementById("checkmate-new-game");
const tieModalEl = document.getElementById("tie-modal");
const tieTextEl = document.getElementById("tie-text");
const tieNewGameEl = document.getElementById("tie-new-game");
const pieceModalEl = document.getElementById("piece-modal");
const pieceGridEl = document.getElementById("piece-grid");
const pieceCancelEl = document.getElementById("piece-cancel");
const pieceWhiteEl = document.getElementById("piece-white");
const pieceBlackEl = document.getElementById("piece-black");
const promotionModalEl = document.getElementById("promotion-modal");
const promotionGridEl = document.getElementById("promotion-grid");
const promotionCancelEl = document.getElementById("promotion-cancel");
const openPieceMakerEl = document.getElementById("open-piece-maker");
const pieceMakerModalEl = document.getElementById("piece-maker-modal");
const pieceMakerGridEl = document.getElementById("piece-maker-grid");
const pieceIconGridEl = document.getElementById("piece-icon-grid");
const pieceMaxDiagEl = document.getElementById("piece-max-diag");
const pieceMaxForwardEl = document.getElementById("piece-max-forward");
const pieceMaxBackwardEl = document.getElementById("piece-max-backward");
const pieceCaptureEffectEl = document.getElementById("piece-capture-effect");
const pieceMakerSaveEl = document.getElementById("piece-maker-save");
const pieceMakerCancelEl = document.getElementById("piece-maker-cancel");
const openFeedbackEl = document.getElementById("open-feedback");
const feedbackModalEl = document.getElementById("feedback-modal");
const feedbackRatingEl = document.getElementById("feedback-rating");
const feedbackRatingValueEl = document.getElementById("feedback-rating-value");
const feedbackTextEl = document.getElementById("feedback-text");
const feedbackSubmitEl = document.getElementById("feedback-submit");
const feedbackCancelEl = document.getElementById("feedback-cancel");
const userModalEl = document.getElementById("user-modal");
const userListEl = document.getElementById("user-list");
const joinNameEl = document.getElementById("join-name");
const joinLevelEl = document.getElementById("join-level");
const joinSaveEl = document.getElementById("join-save");
const createRoomEl = document.getElementById("create-room");
const roomLinkEl = document.getElementById("room-link");
const pvpSettingsEl = document.getElementById("pvp-settings");
const joinRoomEl = document.getElementById("join-room");
const joinCodeEl = document.getElementById("join-code");

const STORAGE_KEYS = {
  users: "chess.users",
  currentUser: "chess.currentUser",
  depth: "chess.depth",
  variant: "chess.variant",
  gameState: "chess.gameState",
  userConfirmed: "chess.userConfirmed",
};

const VARIANTS = [
  { id: "5x6chess", label: "5x6", files: 5, ranks: 6 },
  { id: "losalamos", label: "6x6", files: 6, ranks: 6 },
  { id: "4x6chess", label: "4x6", files: 4, ranks: 6 },
  { id: "4x5chess", label: "4x5", files: 4, ranks: 5 },
  { id: "chess", label: "8x8", files: 8, ranks: 8 },
];

const START_FEN_BY_VARIANT = {
  losalamos: "rnqknr/pppppp/6/6/PPPPPP/RNQKNR w - - 0 1",
  "5x6chess": "rnqkr/ppppp/5/5/PPPPP/RNQKR w - - 0 1",
  "4x6chess": "rknr/pppp/4/4/PPPP/RKNR w - - 0 1",
  "4x5chess": "rknr/pppp/4/PPPP/RKNR w - - 0 1",
  chess: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
};

function getStartFen(variantId) {
  return START_FEN_BY_VARIANT[variantId] || START_FEN_BY_VARIANT.losalamos;
}

const PIECE_ARROW_COLORS = {
  w: {
    p: "rgba(96, 165, 250, 0.25)",
    n: "rgba(59, 130, 246, 0.25)",
    b: "rgba(14, 165, 233, 0.25)",
    r: "rgba(99, 102, 241, 0.25)",
    q: "rgba(34, 211, 238, 0.25)",
    k: "rgba(56, 189, 248, 0.25)",
  },
  b: {
    p: "rgba(248, 113, 113, 0.22)",
    n: "rgba(239, 68, 68, 0.22)",
    b: "rgba(251, 113, 133, 0.22)",
    r: "rgba(244, 63, 94, 0.22)",
    q: "rgba(250, 93, 106, 0.22)",
    k: "rgba(248, 113, 113, 0.22)",
  },
};

const BEST_ARROW_COLORS = {
  w: {
    p: "rgba(56, 189, 248, 1)",
    n: "rgba(34, 197, 94, 1)",
    b: "rgba(234, 179, 8, 1)",
    r: "rgba(249, 115, 22, 1)",
    q: "rgba(168, 85, 247, 1)",
    k: "rgba(244, 63, 94, 1)",
  },
  b: {
    p: "rgba(14, 165, 233, 1)",
    n: "rgba(22, 163, 74, 1)",
    b: "rgba(202, 138, 4, 1)",
    r: "rgba(234, 88, 12, 1)",
    q: "rgba(124, 58, 237, 1)",
    k: "rgba(190, 18, 60, 1)",
  },
};

let engine = null;
let engineReady = false;
let engineBusy = false;
let analysisEngine = null;
let analysisReady = false;
let analysisBusy = false;
let analysisPendingResolve = null;
let analysisPendingScore = null;
let currentFen = null;
let legalMoves = [];
let currentVariant = VARIANTS[0];
let selectedSquare = null;
let modalOpen = false;
let editHandicapActive = false;
let mySide = "w";
let searchDepth = 20;
let boardMap = new Map();
let engineScriptLoaded = false;
let engineLog = [];
let perftActive = false;
let perftMoves = [];
let pendingEngineMove = false;
let dragState = null;
let removedPieces = new Map();
let moveHistory = [];
let showAllMoves = false;
let showTurnArrows = false;
let timeModeEnabled = false;
let timeSeconds = 10;
let timerRemaining = 0;
let timerInterval = null;
let lastTurnSide = null;
let totalTimeEnabled = false;
let totalTimeSeconds = 600;
let totalTimeRemaining = { w: 600, b: 600 };
let totalTimerInterval = null;
let analysisToken = 0;
let analysisTimeout = null;
let bestMovesByPiece = new Map();
let checkers = [];
let checkKingSquare = null;
let wasInCheck = false;
let pvpSocket = null;
let pvpRoomId = null;
let pvpSide = null;
let pvpPlayers = {};
let pvpClientId = null;
let pendingPieceSquare = null;
let initialModalShown = false;
let pendingStartModal = false;
let userModalOpen = false;
let eloDelta = null;
let eloDeltaClass = "";
let customPieces = new Map();
let pendingPromotion = null;
let pendingCustomPiece = null;
let customPlaceMode = false;
let pendingCustomMove = null;
let pendingCustomCapture = null;
let teleportMode = null;
let piecePickerColor = "w";
const PIECE_SVG = {
  w: {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙",
  },
  b: {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  },
};

let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function playWoodClick(kind = "move") {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime;
  const base = kind === "capture" ? 145 : 185;
  const vol = kind === "capture" ? 0.13 : 0.10;

  const body = ctx.createOscillator();
  const bodyGain = ctx.createGain();
  body.type = "triangle";
  body.frequency.setValueAtTime(base, t0);
  body.frequency.exponentialRampToValueAtTime(base * 0.62, t0 + 0.05);
  bodyGain.gain.setValueAtTime(vol, t0);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06);
  body.connect(bodyGain).connect(ctx.destination);
  body.start(t0);
  body.stop(t0 + 0.07);

  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.24));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1400;
  bp.Q.value = 1.1;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(vol * 0.55, t0);
  ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.03);
  noise.connect(bp).connect(ng).connect(ctx.destination);
  noise.start(t0);
  noise.stop(t0 + 0.03);
}

function playChessSound(type) {
  try {
    if (type === "move") playWoodClick("move");
    if (type === "capture") playWoodClick("capture");
    if (type === "check") {
      playWoodClick("move");
      const ctx = getAudioCtx();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 860;
      g.gain.setValueAtTime(0.05, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.18);
    }
  } catch {}
}

function getClientId() {
  const key = "chess.clientId";
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const fresh = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `client-${Date.now()}`;
  localStorage.setItem(key, fresh);
  return fresh;
}

function loadUsers() {
  const stored = localStorage.getItem(STORAGE_KEYS.users);
  if (stored) {
    return JSON.parse(stored);
  }
  const defaultUsers = {
    kid: { id: "kid", name: "Kid", elo: 500 },
  };
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(defaultUsers));
  localStorage.setItem(STORAGE_KEYS.currentUser, "kid");
  return defaultUsers;
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getCurrentUser(users) {
  const id = localStorage.getItem(STORAGE_KEYS.currentUser) || "kid";
  return users[id] || users.kid;
}

function setCurrentUser(id) {
  localStorage.setItem(STORAGE_KEYS.currentUser, id);
}

function getUserBadge(elo) {
  if (elo >= 800) return "👴";
  if (elo >= 700) return "🧔";
  if (elo >= 600) return "🧑";
  return "🧒";
}

function formatUserName(user) {
  return user.name;
}

function renderUserList(users) {
  if (!userListEl) return;
  userListEl.innerHTML = "";
  Object.values(users).forEach((user) => {
    const button = document.createElement("button");
    button.className = "ghost";
    button.textContent = `${formatUserName(user)} ${user.elo}`;
    button.addEventListener("click", () => {
      setCurrentUser(user.id);
      localStorage.setItem(STORAGE_KEYS.userConfirmed, "true");
      userModalOpen = false;
      if (userModalEl) userModalEl.classList.add("hidden");
      renderUsers(loadUsers());
      if (pendingStartModal) {
        pendingStartModal = false;
        openHandicapOffer();
      }
    });
    userListEl.appendChild(button);
  });
}

function renderUsers(users) {
  userSelectEl.innerHTML = "";
  Object.values(users).forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${formatUserName(user)} ${user.elo}`;
    userSelectEl.appendChild(option);
  });
  const current = getCurrentUser(users);
  if (current) {
    userSelectEl.value = current.id;
    const deltaText = eloDelta ? ` (${eloDelta > 0 ? "+" : ""}${eloDelta})` : "";
    userEloEl.textContent = `User Elo: ${current.elo}${deltaText}`;
    if (currentEloEl) {
      currentEloEl.value = String(current.elo);
    }
  }
  renderUserList(users);
  updatePlayerPanels();
}

function showUserModal() {
  if (!userModalEl) return;
  userModalOpen = true;
  userModalEl.classList.remove("hidden");
  renderUserList(loadUsers());
}

function hideUserModal() {
  if (!userModalEl) return;
  userModalOpen = false;
  userModalEl.classList.add("hidden");
}

function createUserFromModal() {
  const name = (joinNameEl?.value || "").trim() || "Player";
  const elo = Number.parseInt(joinLevelEl?.value || "500", 10);
  const usersNext = loadUsers();
  const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
  usersNext[id] = { id, name, elo: Math.min(Math.max(elo, 100), 3000) };
  saveUsers(usersNext);
  setCurrentUser(id);
  localStorage.setItem(STORAGE_KEYS.userConfirmed, "true");
  if (joinNameEl) joinNameEl.value = "";
  hideUserModal();
  renderUsers(usersNext);
  if (pendingStartModal) {
    pendingStartModal = false;
    openHandicapOffer();
  }
}

function applyEloDeltaDisplay(el, text) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove("elo-delta-good", "elo-delta-great", "elo-delta-bad");
  if (eloDelta && eloDeltaClass) {
    el.classList.add(eloDeltaClass);
  }
}

function updatePlayerPanels() {
  if (gameModeEl.value === "pvp") {
    const white = Object.values(pvpPlayers).find((p) => p.side === "w");
    const black = Object.values(pvpPlayers).find((p) => p.side === "b");
    const whiteName = white ? white.name : "White";
    const blackName = black ? black.name : "Black";
    const whiteElo = white ? `${white.elo}` : "--";
    const blackElo = black ? `${black.elo}` : "--";
    whiteNameEl.textContent = whiteName;
    blackNameEl.textContent = blackName;
    applyEloDeltaDisplay(whiteEloEl, whiteElo);
    applyEloDeltaDisplay(blackEloEl, blackElo);
    if (whiteNameBoardEl) whiteNameBoardEl.textContent = whiteName;
    if (whiteEloBoardEl) applyEloDeltaDisplay(whiteEloBoardEl, whiteElo);
    if (blackNameBoardEl) blackNameBoardEl.textContent = blackName;
    if (blackEloBoardEl) applyEloDeltaDisplay(blackEloBoardEl, blackElo);
    const whiteBadge = white ? getUserBadge(white.elo) : "👤";
    const blackBadge = black ? getUserBadge(black.elo) : "👤";
    if (whiteIconEl) whiteIconEl.textContent = whiteBadge;
    if (whiteIconBoardEl) whiteIconBoardEl.textContent = whiteBadge;
    if (blackIconEl) blackIconEl.textContent = blackBadge;
    if (blackIconBoardEl) blackIconBoardEl.textContent = blackBadge;
    renderHandicapIcons();
    return;
  }
  const users = loadUsers();
  const current = getCurrentUser(users);
  const nameText = formatUserName(current);
  const eloText = eloDelta ? `${current.elo} (${eloDelta > 0 ? "+" : ""}${eloDelta})` : `${current.elo}`;
  whiteNameEl.textContent = nameText;
  blackNameEl.textContent = "AI";
  applyEloDeltaDisplay(whiteEloEl, eloText);
  applyEloDeltaDisplay(blackEloEl, "3000");
  if (whiteNameBoardEl) whiteNameBoardEl.textContent = nameText;
  if (whiteEloBoardEl) applyEloDeltaDisplay(whiteEloBoardEl, eloText);
  if (blackNameBoardEl) blackNameBoardEl.textContent = "AI";
  if (blackEloBoardEl) applyEloDeltaDisplay(blackEloBoardEl, "3000");
  if (whiteIconEl) whiteIconEl.textContent = getUserBadge(current.elo);
  if (whiteIconBoardEl) whiteIconBoardEl.textContent = getUserBadge(current.elo);
  if (blackIconEl) blackIconEl.textContent = "🤖";
  if (blackIconBoardEl) blackIconBoardEl.textContent = "🤖";
  renderHandicapIcons();
}

function setDepth(value) {
  searchDepth = Math.min(Math.max(value, 6), 30);
  depthRangeEl.value = String(searchDepth);
  depthValueEl.value = String(searchDepth);
  localStorage.setItem(STORAGE_KEYS.depth, String(searchDepth));
}

function loadDepth() {
  const stored = Number.parseInt(localStorage.getItem(STORAGE_KEYS.depth) || "20", 10);
  return Math.min(Math.max(Number.isFinite(stored) ? stored : 20, 6), 30);
}

function setVariant(id) {
  const variant = VARIANTS.find((item) => item.id === id) || VARIANTS[0];
  currentVariant = variant;
  localStorage.setItem(STORAGE_KEYS.variant, variant.id);
  selectedSquare = null;
  legalMoves = [];
  currentFen = getStartFen(variant.id);
  buildBoard();
  if (engineReady) {
    engine.postMessage("setoption name VariantPath value /variants.ini");
    engine.postMessage(`setoption name UCI_Variant value ${variant.id}`);
    engine.postMessage("ucinewgame");
    engine.postMessage("position startpos");
    engine.postMessage("isready");
  }
  if (analysisReady && analysisEngine) {
    analysisEngine.postMessage("setoption name VariantPath value /variants.ini");
    analysisEngine.postMessage(`setoption name UCI_Variant value ${variant.id}`);
    analysisEngine.postMessage("ucinewgame");
    analysisEngine.postMessage("position startpos");
    analysisEngine.postMessage("isready");
  }
}

function loadVariant() {
  const stored = localStorage.getItem(STORAGE_KEYS.variant) || "losalamos";
  const mapped = stored === "minichess" || stored === "mini" ? "5x6chess" : stored;
  setVariant(mapped);
  variantSelectEl.value = mapped;
}

function buildBoard() {
  boardEl.innerHTML = "";
  boardEl.style.display = "grid";
  boardEl.style.gridTemplateColumns = `repeat(${currentVariant.files}, 1fr)`;
  boardEl.style.gridTemplateRows = `repeat(${currentVariant.ranks}, 1fr)`;
  boardEl.style.aspectRatio = `${currentVariant.files} / ${currentVariant.ranks}`;
  updateBoardSize();
  for (let rank = currentVariant.ranks; rank >= 1; rank -= 1) {
    for (let file = 0; file < currentVariant.files; file += 1) {
      const square = document.createElement("div");
      const fileChar = String.fromCharCode(97 + file);
      const squareId = `${fileChar}${rank}`;
      square.className = (file + rank) % 2 === 0 ? "white-1e1d7 square" : "black-3c85d square";
      square.dataset.square = squareId;
      square.addEventListener("pointerdown", handlePointerDown);
      boardEl.appendChild(square);
    }
  }
  renderBoardFromFen();
}

function updateBoardSize() {
  const ratio = currentVariant.files / currentVariant.ranks;
  const availableHeight = Math.max(240, window.innerHeight - 220);
  const availableWidth = Math.max(240, window.innerWidth * 0.96);
  const width = Math.min(availableWidth, availableHeight * ratio);
  const height = width / ratio;
  boardEl.style.width = `${Math.floor(width)}px`;
  boardEl.style.height = `${Math.floor(height)}px`;
}

function renderBoardFromFen() {
  if (!currentFen) return;
  boardMap = new Map();
  boardEl.querySelectorAll(".piece").forEach((piece) => piece.remove());
  boardEl.querySelectorAll(".custom-icon").forEach((icon) => icon.remove());
  const [placement] = currentFen.split(" ");
  let rank = currentVariant.ranks;
  let file = 0;
  for (const char of placement) {
    if (char === "/") {
      rank -= 1;
      file = 0;
      continue;
    }
    if (/\d/.test(char)) {
      file += Number.parseInt(char, 10);
      continue;
    }
    const fileChar = String.fromCharCode(97 + file);
    const squareId = `${fileChar}${rank}`;
    const squareEl = boardEl.querySelector(`[data-square='${squareId}']`);
    if (squareEl) {
      const piece = document.createElement("img");
      const color = char === char.toUpperCase() ? "w" : "b";
      const type = char.toLowerCase();
      piece.src = pieceImageUrl({ color, type });
      piece.className = `piece piece-417db piece-${color}`;
      piece.alt = `${color}${type}`;
      squareEl.appendChild(piece);
      boardMap.set(squareId, { color, type });
      const custom = customPieces.get(squareId);
      if (custom?.icon) {
        const iconEl = document.createElement("span");
        iconEl.className = "custom-icon";
        iconEl.textContent = custom.icon;
        squareEl.appendChild(iconEl);
      }
      if (editHandicapActive && removedPieces.has(squareId)) {
        squareEl.classList.add("square-removed");
      } else {
        squareEl.classList.remove("square-removed");
      }
    }
    file += 1;
  }
  removedPieces.forEach((_piece, squareId) => {
    const squareEl = boardEl.querySelector(`[data-square='${squareId}']`);
    if (!squareEl) return;
    if (editHandicapActive) {
      squareEl.classList.add("square-removed");
    } else {
      squareEl.classList.remove("square-removed");
    }
  });
  renderMoveArrows();
}

function pieceImageUrl(piece) {
  const code = `${piece.color}${piece.type.toUpperCase()}`;
  return `./assets/pieces/${code}.png`;
}


async function ensureStockfishScript() {
  if (engineScriptLoaded) return;

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });

  try {
    await loadScript("./fairy-stockfish.js");
  } catch (error) {
    console.warn("Fairy engine script failed, falling back to stockfish.js", error);
    await loadScript("./stockfish.js");
  }

  engineScriptLoaded = true;
}

async function initEngine() {
  if (engine && typeof engine.terminate === "function") {
    engine.terminate();
  }
  await ensureStockfishScript();
  engine = await window.Stockfish();
  window.__sfInstance = engine;
  await loadVariantFileFor(engine);
  engine.addMessageListener(handleEngineMessage);
  engine.postMessage("uci");
}

async function loadVariantFileFor(target) {
  if (!target?.FS) return;
  try {
    const response = await fetch("./variants.ini");
    if (!response.ok) return;
    const text = await response.text();
    const data = new TextEncoder().encode(text);
    target.FS.writeFile("/variants.ini", data);
  } catch (error) {
    console.warn("Failed to load variants.ini", error);
  }
}

async function initAnalysisEngine() {
  if (analysisEngine && typeof analysisEngine.terminate === "function") {
    analysisEngine.terminate();
  }
  analysisReady = false;
  await ensureStockfishScript();
  analysisEngine = await window.Stockfish();
  await loadVariantFileFor(analysisEngine);
  analysisEngine.addMessageListener(handleAnalysisMessage);
  analysisEngine.postMessage("uci");
}

function requestDump() {
  if (!engine) return;
  engine.postMessage("d");
}

function requestLegalMoves() {
  if (!engine || perftActive || !currentFen) return;
  perftActive = true;
  perftMoves = [];
  engine.postMessage(`position fen ${currentFen}`);
  engine.postMessage("go perft 1");
}

function handleEngineMessage(message) {
  if (typeof message !== "string") return;
  const lines = message.split("\n");
  lines.forEach((line) => {
    if (!line) return;
    engineLog.push(line);
    if (engineLog.length > 80) {
      engineLog = engineLog.slice(-80);
    }
    window.__engineLog = engineLog;
    if (line.startsWith("uciok")) {
      engine.postMessage("setoption name VariantPath value /variants.ini");
      engine.postMessage(`setoption name UCI_Variant value ${currentVariant.id}`);
      engine.postMessage("ucinewgame");
      engine.postMessage("position startpos");
      engine.postMessage("isready");
    }
    if (line.startsWith("option name UCI_Variant")) {
      window.__variantOptions = line;
    }
    if (line.startsWith("readyok")) {
      engineReady = true;
      requestDump();
    }
    if (line.startsWith("Checkers:")) {
      const payload = line.replace("Checkers:", "").trim();
      checkers = payload ? payload.split(/\s+/) : [];
      updateCheckState();
    }
    if (line.startsWith("Fen:") || line.startsWith("FEN:")) {
      currentFen = line.replace("Fen:", "").replace("FEN:", "").trim();
      window.__lastFen = currentFen;
      renderBoardFromFen();
      updateCheckState();
      if (pendingCustomMove) {
        customPieces.delete(pendingCustomMove.from);
        customPieces.set(pendingCustomMove.to, pendingCustomMove.custom);
        pendingCustomMove = null;
      }
      if (pendingCustomCapture) {
        applyCustomCaptureEffects(pendingCustomCapture);
        pendingCustomCapture = null;
      }
      if (teleportMode) {
        customPieces.delete(teleportMode.from);
      }
      if (!engineBusy) {
        requestLegalMoves();
      }
      if (!initialModalShown) {
        initialModalShown = true;
        if (userModalOpen) {
          pendingStartModal = true;
        } else {
          openHandicapOffer();
        }
      }
      if (pendingEngineMove) {
        pendingEngineMove = false;
        requestEngineMove();
      }
    }
    if (line.startsWith("Legal moves:")) {
      const moves = line.replace("Legal moves:", "").trim();
      legalMoves = moves ? moves.split(" ") : [];
      window.__lastLegal = legalMoves;
      renderMoveArrows();
      updateCheckState();
      if (timeModeEnabled && isMyTurn()) {
        scheduleBestMoveHints();
      }
    }
    if (perftActive) {
      const match = line.match(/^([a-z]\d+[a-z]\d+[a-z]?)\s*:/i);
      if (match) {
        perftMoves.push(match[1]);
      }
      if (line.toLowerCase().startsWith("nodes searched") || line.toLowerCase().startsWith("nodes")) {
        perftActive = false;
        legalMoves = perftMoves;
        window.__lastLegal = legalMoves;
        renderMoveArrows();
        updateCheckState();
        if (timeModeEnabled && isMyTurn()) {
          scheduleBestMoveHints();
        }
      }
    }
    if (line.startsWith("bestmove")) {
      engineBusy = false;
      const bestMove = line.split(" ")[1];
      if (bestMove && bestMove !== "(none)") {
        applyMove(bestMove);
      }
    }
  });
}

function handleAnalysisMessage(message) {
  if (typeof message !== "string") return;
  const lines = message.split("\n");
  lines.forEach((line) => {
    if (!line) return;
    if (line.startsWith("uciok")) {
      analysisEngine.postMessage("setoption name VariantPath value /variants.ini");
      analysisEngine.postMessage(`setoption name UCI_Variant value ${currentVariant.id}`);
      analysisEngine.postMessage("ucinewgame");
      analysisEngine.postMessage("position startpos");
      analysisEngine.postMessage("isready");
    }
    if (line.startsWith("readyok")) {
      analysisReady = true;
    }
    if (analysisPendingResolve && line.startsWith("info")) {
      const scoreMatch = line.match(/score (cp|mate) (-?\d+)/);
      if (scoreMatch) {
        const type = scoreMatch[1];
        const value = Number.parseInt(scoreMatch[2], 10);
        if (type === "cp") {
          analysisPendingScore = value;
        } else if (type === "mate") {
          analysisPendingScore = value > 0 ? 100000 : -100000;
        }
      }
    }
    if (line.startsWith("bestmove")) {
      const best = line.split(" ")[1];
      if (analysisPendingResolve) {
        const resolve = analysisPendingResolve;
        analysisPendingResolve = null;
        const score = analysisPendingScore;
        analysisPendingScore = null;
        analysisBusy = false;
        resolve({ bestMove: best && best !== "(none)" ? best : null, score });
      }
    }
  });
}

function applyMove(move) {
  if (!currentFen) return;
  const to = move.slice(2, 4);
  const isCapture = boardMap.has(to);
  playChessSound(isCapture ? "capture" : "move");
  moveHistory.push({ fen: currentFen, removed: cloneRemovedPieces(), custom: cloneCustomPieces() });
  engine.postMessage(`position fen ${currentFen} moves ${move}`);
  requestDump();
}

function requestEngineMove() {
  if (gameModeEl.value === "pvp") return;
  if (!engine || engineBusy) return;
  engineBusy = true;
  engine.postMessage(`position fen ${currentFen}`);
  engine.postMessage(`go depth ${searchDepth}`);
}

function handlePointerDown(event) {
  if (userModalOpen) return;
  const square = event.currentTarget.dataset.square;
  if (teleportMode) {
    if (boardMap.has(square)) {
      statusEl.textContent = "Pick an empty square.";
      return;
    }
    currentFen = updateFenAtSquare(currentFen, teleportMode.from, null);
    currentFen = updateFenAtSquare(currentFen, square, teleportMode.pieceChar);
    if (teleportMode.custom) {
      customPieces.delete(teleportMode.from);
      customPieces.set(square, teleportMode.custom);
    }
    teleportMode = null;
    engine.postMessage(`position fen ${currentFen}`);
    requestDump();
    return;
  }
  if (gameModeEl.value === "pvp" && !isMyTurn()) {
    statusEl.textContent = "Not your turn.";
    return;
  }
  if (gameModeEl.value === "pvp") {
    const piece = boardMap.get(square);
    if (piece && piece.color !== mySide) {
      statusEl.textContent = "You can only move your pieces.";
      return;
    }
  }
  if (editHandicapActive || (modalOpen && !handicapModalEl.classList.contains("hidden"))) {
    if (customPlaceMode && pendingCustomPiece) {
      placeCustomPiece(square, pendingCustomPiece);
      customPlaceMode = false;
      pendingCustomPiece = null;
      if (pieceMakerModalEl) pieceMakerModalEl.classList.add("hidden");
      modalOpen = false;
      return;
    }
    openPiecePicker(square);
    return;
  }
  const pieceEl = event.currentTarget.querySelector(".piece");
  if (!pieceEl && !selectedSquare) {
    return;
  }
  event.preventDefault();
  dragState = {
    from: square,
    pieceEl,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
  };
  if (pieceEl) {
    const rect = pieceEl.getBoundingClientRect();
    const ghost = pieceEl.cloneNode(true);
    ghost.classList.add("drag-ghost");
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    document.body.appendChild(ghost);
    dragState.ghost = ghost;
    dragState.ghostSize = rect.width;
    positionGhost(event.clientX, event.clientY);
    selectedSquare = square;
    highlightMoves(square);
  } else if (selectedSquare) {
    attemptMove(selectedSquare, square);
  }
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp, { once: true });
  document.addEventListener("pointercancel", handlePointerUp, { once: true });
}

function handlePointerMove(event) {
  if (!dragState?.ghost) return;
  const dx = event.clientX - dragState.startX;
  const dy = event.clientY - dragState.startY;
  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
    dragState.moved = true;
  }
  positionGhost(event.clientX, event.clientY);
}

function handlePointerUp(event) {
  document.removeEventListener("pointermove", handlePointerMove);
  if (!dragState) return;
  const { from, pieceEl, ghost, moved } = dragState;
  if (ghost) ghost.remove();
  const targetSquare = moved ? getSquareFromPoint(event.clientX, event.clientY) : null;
  if (moved && targetSquare) {
    attemptMove(from, targetSquare);
  } else if (pieceEl && !moved) {
    handleSquareTap(from);
  }
  dragState = null;
}

function cleanupDragState() {
  if (!dragState) return;
  if (dragState.ghost) dragState.ghost.remove();
  dragState = null;
}

function positionGhost(x, y) {
  if (!dragState?.ghost) return;
  const size = dragState.ghostSize || 48;
  dragState.ghost.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
}

function handleSquareTap(square) {
  if (timeModeEnabled) {
    attemptBestMoveFrom(square);
    selectedSquare = null;
    clearHighlights();
    return;
  }
  if (!selectedSquare) {
    selectedSquare = square;
    highlightMoves(square);
    return;
  }
  if (selectedSquare === square) {
    selectedSquare = null;
    clearHighlights();
    return;
  }
  attemptMove(selectedSquare, square);
}

function attemptMove(from, to) {
  if (timeModeEnabled) {
    cancelBestMoveHints();
  }
  if (gameModeEl.value === "pvp" && !isMyTurn()) {
    statusEl.textContent = "Not your turn.";
    selectedSquare = null;
    clearHighlights();
    return;
  }
  if (gameModeEl.value === "pvp") {
    const piece = boardMap.get(from);
    if (!piece || piece.color !== mySide) {
      statusEl.textContent = "You can only move your pieces.";
      selectedSquare = null;
      clearHighlights();
      return;
    }
  }
  const custom = customPieces.get(from);
  let moveStr = null;
  const move = findMove(from, to);
  if (!move) {
    const fallback = findClosestLegalMove(from, to);
    if (!fallback) {
      statusEl.textContent = "Illegal move. Try again.";
      selectedSquare = null;
      clearHighlights();
      return;
    }
    moveStr = `${from}${fallback.to}`;
  } else {
    moveStr = `${from}${to}`;
  }
  if (custom && !isCustomMoveAllowed(from, to, custom)) {
    statusEl.textContent = "Illegal move. Try again.";
    selectedSquare = null;
    clearHighlights();
    return;
  }
  if (isPromotionMove(from, to)) {
    pendingPromotion = { from, to, baseMove: moveStr };
    openPromotionPicker();
    return;
  }
  const capturedCustom = customPieces.get(to);
  if (capturedCustom) {
    pendingCustomCapture = {
      from,
      to,
      captured: capturedCustom,
      capturer: boardMap.get(from),
    };
  }
  if (custom) {
    pendingCustomMove = { from, to, custom };
  }
  if (gameModeEl.value === "pve" && getSideToMove() === mySide) {
    void evaluatePlayerMoveQuality(currentFen, moveStr);
  }
  applyMove(moveStr);
  selectedSquare = null;
  clearHighlights();
  if (gameModeEl.value === "pve") {
    pendingEngineMove = true;
  }
  if (gameModeEl.value === "pvp") {
    sendPvpMove(`${from}${to}`);
  }
}

function attemptBestMoveFrom(square) {
  if (!isMyTurn()) return;
  const piece = boardMap.get(square);
  if (!piece || piece.color !== mySide) return;
  const best = bestMovesByPiece.get(square);
  if (!best) return;
  attemptMove(best.slice(0, 2), best.slice(2, 4));
}

function findMove(from, to) {
  return legalMoves.find((move) => move.startsWith(from) && move.slice(2, 4) === to);
}

function findClosestLegalMove(from, target) {
  const moves = legalMoves.filter((move) => move.startsWith(from));
  if (!moves.length) return null;
  const [targetFile, targetRank] = squareToCoords(target);
  let best = null;
  let bestDist = Number.POSITIVE_INFINITY;
  moves.forEach((move) => {
    const to = move.slice(2, 4);
    const [file, rank] = squareToCoords(to);
    const dist = Math.abs(file - targetFile) + Math.abs(rank - targetRank);
    if (dist < bestDist) {
      bestDist = dist;
      best = { to };
    }
  });
  return best;
}

function squareToCoords(square) {
  const file = square.charCodeAt(0) - 97;
  const rank = Number.parseInt(square[1], 10);
  return [file, rank];
}

function highlightMoves(square) {
  clearHighlights();
  legalMoves
    .filter((move) => move.startsWith(square))
    .forEach((move) => {
      const target = move.slice(2, 4);
      const squareEl = boardEl.querySelector(`[data-square='${target}']`);
      if (squareEl) squareEl.classList.add("square-highlight");
    });
  renderMoveArrows();
}

function clearHighlights() {
  boardEl.querySelectorAll(".square-highlight").forEach((el) => el.classList.remove("square-highlight"));
  renderMoveArrows();
}

function renderMoveArrows() {
  if (!moveArrowsEl) return;
  moveArrowsEl.innerHTML = "";
  const movesToRender = [];
  if (selectedSquare) {
    movesToRender.push(...legalMoves.filter((move) => move.startsWith(selectedSquare)));
  } else if (timeModeEnabled && isMyTurn()) {
    movesToRender.push(...bestMovesByPiece.values());
  } else if (showTurnArrows && isMyTurn()) {
    movesToRender.push(...legalMoves.filter((move) => {
      const from = move.slice(0, 2);
      const piece = boardMap.get(from);
      return piece && piece.color === mySide;
    }));
  } else if (showAllMoves) {
    movesToRender.push(...legalMoves);
  }
  const thinLines = !selectedSquare && !(timeModeEnabled && isMyTurn());
  movesToRender.forEach((move) => {
    const from = move.slice(0, 2);
    const to = move.slice(2, 4);
    const fromEl = boardEl.querySelector(`[data-square='${from}']`);
    const toEl = boardEl.querySelector(`[data-square='${to}']`);
    if (!fromEl || !toEl) return;
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const boardRect = boardEl.getBoundingClientRect();
    const x1 = fromRect.left + fromRect.width / 2 - boardRect.left;
    const y1 = fromRect.top + fromRect.height / 2 - boardRect.top;
    const x2 = toRect.left + toRect.width / 2 - boardRect.left;
    const y2 = toRect.top + toRect.height / 2 - boardRect.top;
    const piece = boardMap.get(from);
    const pieceType = piece ? piece.type : "q";
    const palette = timeModeEnabled && isMyTurn() ? BEST_ARROW_COLORS : PIECE_ARROW_COLORS;
    const sidePalette = palette[piece?.color || "w"] || palette.w;
    const stroke = sidePalette[pieceType] || sidePalette.q;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", stroke);
    line.setAttribute("stroke-width", thinLines ? "1.25" : timeModeEnabled ? "2.75" : "2");
    line.setAttribute("stroke-linecap", "round");
    moveArrowsEl.appendChild(line);
  });

  if (checkKingSquare && checkers.length) {
    checkers.forEach((checkerSquare) => {
      const fromEl = boardEl.querySelector(`[data-square='${checkerSquare}']`);
      const toEl = boardEl.querySelector(`[data-square='${checkKingSquare}']`);
      if (!fromEl || !toEl) return;
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const boardRect = boardEl.getBoundingClientRect();
      const x1 = fromRect.left + fromRect.width / 2 - boardRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - boardRect.top;
      const x2 = toRect.left + toRect.width / 2 - boardRect.left;
      const y2 = toRect.top + toRect.height / 2 - boardRect.top;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", "rgba(248, 113, 113, 0.75)");
      line.setAttribute("stroke-width", "3");
      line.setAttribute("stroke-linecap", "round");
      line.classList.add("check-line");
      moveArrowsEl.appendChild(line);
    });
  }
}

function startTurnTimer() {
  if (!timerFillEl) return;
  clearTurnTimer();
  timerRemaining = timeSeconds * 1000;
  updateTimerBar();
  timerInterval = setInterval(() => {
    timerRemaining -= 100;
    if (timerRemaining <= 0) {
      timerRemaining = 0;
      updateTimerBar();
      clearTurnTimer();
      autoMoveOnTimeout();
      return;
    }
    updateTimerBar();
  }, 100);
}

function clearTurnTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = null;
}

function updateTimerBar() {
  if (timerBarEl) {
    timerBarEl.classList.toggle("hidden", !timeModeEnabled);
  }
  if (!timerFillEl) return;
  const total = timeSeconds * 1000;
  const pct = total ? Math.max(0, Math.min(1, timerRemaining / total)) : 0;
  timerFillEl.style.width = `${pct * 100}%`;
}

function updateTotalTimerBar() {
  if (totalTimerBarEl) {
    totalTimerBarEl.classList.toggle("hidden", !totalTimeEnabled);
  }
  if (!totalTimerFillEl) return;
  const side = getSideToMove() || "w";
  const remaining = totalTimeRemaining[side] ?? totalTimeSeconds;
  const pct = totalTimeSeconds ? Math.max(0, Math.min(1, remaining / totalTimeSeconds)) : 0;
  totalTimerFillEl.style.width = `${pct * 100}%`;
}

function startTotalTimer() {
  if (!totalTimeEnabled) return;
  if (totalTimerInterval) clearInterval(totalTimerInterval);
  totalTimerInterval = setInterval(() => {
    const side = getSideToMove();
    if (!side) return;
    totalTimeRemaining[side] = Math.max(0, (totalTimeRemaining[side] || 0) - 1);
    updateTotalTimerBar();
    if (totalTimeRemaining[side] === 0) {
      statusEl.textContent = "Time's up.";
      clearInterval(totalTimerInterval);
      totalTimerInterval = null;
    }
  }, 1000);
}

function autoMoveOnTimeout() {
  if (!timeModeEnabled || !isMyTurn()) return;
  statusEl.textContent = "Time's up. Your move.";
}

function cancelBestMoveHints() {
  if (analysisTimeout) {
    clearTimeout(analysisTimeout);
    analysisTimeout = null;
  }
  analysisToken += 1;
  bestMovesByPiece = new Map();
  renderMoveArrows();
}

function getSideToMove() {
  return currentFen?.split(" ")[1];
}

function isMyTurn() {
  const side = getSideToMove();
  if (!side) return false;
  return side === mySide;
}

function setEloDelta(delta, cssClass) {
  eloDelta = delta;
  eloDeltaClass = cssClass || "";
  updatePlayerPanels();
  const users = loadUsers();
  const current = getCurrentUser(users);
  if (userEloEl) {
    const deltaText = eloDelta ? ` (${eloDelta > 0 ? "+" : ""}${eloDelta})` : "";
    userEloEl.textContent = `User Elo: ${current.elo}${deltaText}`;
    userEloEl.classList.remove("elo-delta-good", "elo-delta-great", "elo-delta-bad");
    if (eloDelta && eloDeltaClass) {
      userEloEl.classList.add(eloDeltaClass);
    }
  }
  if (currentEloEl) {
    currentEloEl.value = String(current.elo);
  }
}

async function evaluatePlayerMoveQuality(fenSnapshot, move) {
  if (!fenSnapshot || !move) return;
  setEloDelta(null, "");
  const token = ++analysisToken;
  const best = await analyzeWithEngine(fenSnapshot, null, token, 350);
  const chosen = await analyzeWithEngine(fenSnapshot, [move], token, 350);
  if (!best || !chosen) return;
  if (best.score == null || chosen.score == null) return;
  const diff = best.score - chosen.score;
  let delta = 0;
  let cls = "";
  if (diff <= 20) {
    delta = 10;
    cls = "elo-delta-great";
  } else if (diff <= 80) {
    delta = 1;
    cls = "elo-delta-good";
  } else if (diff >= 200) {
    delta = -1;
    cls = "elo-delta-bad";
  }
  if (delta > 0) {
    const users = loadUsers();
    const current = getCurrentUser(users);
    current.elo = Math.min(Math.max(current.elo + delta, 100), 3000);
    users[current.id] = current;
    saveUsers(users);
    setCurrentUser(current.id);
    setEloDelta(delta, cls);
    renderUsers(users);
  } else if (delta < 0) {
    const users = loadUsers();
    const current = getCurrentUser(users);
    current.elo = Math.min(Math.max(current.elo + delta, 100), 3000);
    users[current.id] = current;
    saveUsers(users);
    setCurrentUser(current.id);
    setEloDelta(delta, cls);
    renderUsers(users);
  }
}

async function analyzeWithEngine(fenSnapshot, searchMoves, token, moveTimeMs) {
  if (!analysisEngine) {
    await initAnalysisEngine();
  }
  if (!analysisReady) {
    await new Promise((resolve) => {
      const check = () => {
        if (analysisReady) {
          resolve();
          return;
        }
        setTimeout(check, 50);
      };
      check();
    });
  }
  if (analysisToken !== token || !analysisEngine) return null;
  if (searchMoves && !searchMoves.length) return null;
  if (analysisBusy) {
    await new Promise((resolve) => {
      const check = () => {
        if (!analysisBusy) {
          resolve();
          return;
        }
        setTimeout(check, 10);
      };
      check();
    });
  }
  if (analysisToken !== token || !analysisEngine) return null;
  analysisBusy = true;
  return new Promise((resolve) => {
    analysisPendingResolve = resolve;
    analysisPendingScore = null;
    analysisEngine.postMessage(`position fen ${fenSnapshot}`);
    if (searchMoves && searchMoves.length) {
      analysisEngine.postMessage(`go movetime ${moveTimeMs} searchmoves ${searchMoves.join(" ")}`);
    } else {
      analysisEngine.postMessage(`go movetime ${moveTimeMs}`);
    }
  });
}

async function evaluateBestMoveForPiece(fenSnapshot, moves, token, moveTimeMs) {
  const result = await analyzeWithEngine(fenSnapshot, moves, token, moveTimeMs);
  return result?.bestMove ?? null;
}

function scheduleBestMoveHints() {
  if (!timeModeEnabled || !isMyTurn()) return;
  if (analysisTimeout) clearTimeout(analysisTimeout);
  bestMovesByPiece = new Map();
  renderMoveArrows();
  const token = ++analysisToken;
  const fenSnapshot = currentFen;
  const movesSnapshot = [...legalMoves];
  const delayMs = Math.max(300, Math.floor(timeSeconds * 500));
  analysisTimeout = setTimeout(async () => {
    if (analysisToken !== token || !timeModeEnabled || !isMyTurn()) return;
    const byPiece = new Map();
    movesSnapshot.forEach((move) => {
      const from = move.slice(0, 2);
      const piece = boardMap.get(from);
      if (!piece || piece.color !== mySide) return;
      if (!byPiece.has(from)) byPiece.set(from, []);
      byPiece.get(from).push(move);
    });
    const budgetMs = Math.max(400, Math.floor(timeSeconds * 500));
    const perPieceMs = Math.max(160, Math.floor(budgetMs / Math.max(1, byPiece.size)));
    const startAt = Date.now();
    for (const [from, moves] of byPiece.entries()) {
      if (analysisToken !== token || !timeModeEnabled || !isMyTurn()) return;
      const elapsed = Date.now() - startAt;
      if (elapsed > budgetMs) break;
      const best = await evaluateBestMoveForPiece(fenSnapshot, moves, token, perPieceMs);
      if (best) {
        bestMovesByPiece.set(from, best);
        renderMoveArrows();
      }
    }
  }, delayMs);
}

function setMySide(side) {
  mySide = side;
  if (side === "b") {
    boardEl.classList.add("flipped");
  } else {
    boardEl.classList.remove("flipped");
  }
}

function syncFen(fen) {
  if (!fen) return;
  currentFen = fen;
  renderBoardFromFen();
  updateCheckState();
  requestLegalMoves();
}

function connectToRoom(roomId) {
  if (!roomId) return;
  if (pvpSocket && pvpRoomId === roomId) return;
  if (pvpSocket) disconnectPvp();
  pvpRoomId = roomId;
  pvpClientId = getClientId();
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  pvpSocket = new WebSocket(`${protocol}://${location.host}`);
  pvpSocket.addEventListener("open", () => {
    const users = loadUsers();
    const current = getCurrentUser(users);
    pvpSocket.send(
      JSON.stringify({
        type: "join",
        roomId,
        clientId: pvpClientId,
        name: current.name,
        elo: current.elo,
        fen: currentFen,
      })
    );
  });
  pvpSocket.addEventListener("message", (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }
    if (msg.type === "state") {
      pvpPlayers = msg.players || pvpPlayers;
      if (msg.side) {
        pvpSide = msg.side;
        setMySide(pvpSide);
      }
      if (msg.fen) {
        syncFen(msg.fen);
      }
      updatePlayerPanels();
      return;
    }
    if (msg.type === "presence") {
      pvpPlayers = msg.players || pvpPlayers;
      updatePlayerPanels();
      return;
    }
    if (msg.type === "move") {
      if (msg.fen) {
        syncFen(msg.fen);
      } else if (msg.move) {
        applyMove(msg.move);
        selectedSquare = null;
        clearHighlights();
      }
    }
  });
}

function sendPvpMove(move) {
  if (!pvpSocket || pvpSocket.readyState !== 1 || !pvpRoomId) return;
  pvpSocket.send(
    JSON.stringify({
      type: "move",
      roomId: pvpRoomId,
      clientId: pvpClientId,
      move,
    })
  );
}

function disconnectPvp() {
  if (pvpSocket) {
    pvpSocket.close();
  }
  pvpSocket = null;
  pvpRoomId = null;
  pvpSide = null;
  pvpPlayers = {};
}

function openHandicapOffer() {
  cleanupDragState();
  if (handicapSuggestionEl) {
    handicapSuggestionEl.textContent = "No pawns + right rook";
  }
  if (handicapHelpEl) {
    handicapHelpEl.textContent = "Default minichess handicap";
  }
  handicapModalEl.classList.remove("hidden");
  modalOpen = true;
  editHandicapActive = true;
  if (pieceModalEl) {
    pieceModalEl.classList.add("hidden");
  }
  if (handicapLinkRowEl) {
    handicapLinkRowEl.classList.add("hidden");
  }
  applySuggestionEl.onclick = () => {
    applyHandicapRecommendation();
    requestDump();
  };
  startCustomEl.onclick = () => {
    handicapModalEl.classList.add("hidden");
    modalOpen = false;
    editHandicapActive = false;
    boardEl.querySelectorAll(".square-removed").forEach((el) => el.classList.remove("square-removed"));
  };
  if (startPvpModalEl) {
    startPvpModalEl.onclick = async () => {
      const res = await fetch("/api/create-room", { method: "POST" });
      if (!res.ok) return;
      const data = await res.json();
      const link = `${location.origin}?room=${data.roomId}`;
      if (handicapLinkEl) {
        handicapLinkEl.value = link;
      }
      if (handicapLinkRowEl) {
        handicapLinkRowEl.classList.remove("hidden");
      }
      if (roomLinkEl) {
        roomLinkEl.value = link;
      }
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(link);
          statusEl.textContent = "PVP link copied.";
        } catch {
          statusEl.textContent = "PVP link ready.";
        }
      } else {
        statusEl.textContent = "PVP link ready.";
      }
      gameModeEl.value = "pvp";
      if (pvpSettingsEl) pvpSettingsEl.classList.remove("hidden");
      connectToRoom(data.roomId);
      updatePlayerPanels();
      handicapModalEl.classList.add("hidden");
      modalOpen = false;
      editHandicapActive = false;
      boardEl.querySelectorAll(".square-removed").forEach((el) => el.classList.remove("square-removed"));
    };
  }
}

function showCheckmate(winner) {
  checkmateTextEl.textContent = `Checkmate — ${winner} wins`;
  checkmateModalEl.classList.remove("hidden");
}

function hideCheckmate() {
  checkmateModalEl.classList.add("hidden");
}

function showTie() {
  if (tieTextEl) {
    tieTextEl.textContent = "Tie — Stalemate";
  }
  if (tieModalEl) {
    tieModalEl.classList.remove("hidden");
  }
}

function hideTie() {
  if (tieModalEl) {
    tieModalEl.classList.add("hidden");
  }
}

function applyHandicapRecommendation() {
  const users = loadUsers();
  const current = getCurrentUser(users);
  const elo = current?.elo ?? 500;
  const aiElo = 3000;
  const gap = Math.max(0, aiElo - elo);
  const board = fenToBoard(currentFen?.split(" ")[0] || "");
  if (!board.length) return;
  const removals = [];
  const blackKing = findPiece(board, "k");
  const pawns = [];
  for (let r = 0; r < board.length; r += 1) {
    for (let f = 0; f < board[r].length; f += 1) {
      const piece = board[r][f];
      if (piece === "p") {
        pawns.push({ r, f, piece });
      }
    }
  }
  const farthestPawn = () => {
    if (!pawns.length) return null;
    if (!blackKing) return pawns[0];
    const distance = (entry) => Math.abs(entry.f - blackKing.f) + Math.abs(entry.r - blackKing.r);
    return [...pawns].sort((a, b) => distance(b) - distance(a))[0];
  };
  if (gap >= 1200) {
    removals.push(findPiece(board, "q"));
  } else if (gap >= 1000) {
    removals.push(findPiece(board, "r"));
  } else if (gap >= 600) {
    removals.push(findPiece(board, "b"));
  }
  if (gap >= 250) {
    removals.push(farthestPawn());
  }
  removals
    .filter(Boolean)
    .forEach(({ r, f, piece }) => {
      const square = coordsToSquare(f, currentVariant.ranks - r);
      removedPieces.set(square, piece);
      board[r][f] = null;
    });
  currentFen = `${boardToFen(board)} ${currentFen.split(" ").slice(1).join(" ")}`;
  engine.postMessage(`position fen ${currentFen}`);
  requestDump();
  renderHandicapIcons();
}

function renderHandicapIcons() {
  if (!whiteHandicapEl || !blackHandicapEl) return;
  whiteHandicapEl.innerHTML = "";
  blackHandicapEl.innerHTML = "";
  removedPieces.forEach((pieceChar) => {
    const isWhite = pieceChar === pieceChar.toUpperCase();
    const type = pieceChar.toLowerCase();
    const icon = document.createElement("img");
    icon.className = "piece-icon";
    icon.src = pieceImageUrl({ color: isWhite ? "w" : "b", type });
    if (isWhite) {
      whiteHandicapEl.appendChild(icon);
    } else {
      blackHandicapEl.appendChild(icon);
    }
  });
}

function findPiece(board, pieceChar) {
  for (let r = 0; r < board.length; r += 1) {
    for (let f = 0; f < board[r].length; f += 1) {
      if (board[r][f] === pieceChar) {
        return { r, f, piece: pieceChar };
      }
    }
  }
  return null;
}

function coordsToSquare(file, rank) {
  const fileChar = String.fromCharCode(97 + file);
  return `${fileChar}${rank}`;
}

function resetGame(showModal = true) {
  cleanupDragState();
  selectedSquare = null;
  clearHighlights();
  removedPieces = new Map();
  moveHistory = [];
  customPieces = new Map();
  boardEl.querySelectorAll(".square-removed").forEach((el) => el.classList.remove("square-removed"));
  pendingEngineMove = false;
  engineBusy = false;
  checkers = [];
  checkKingSquare = null;
  hideCheckmate();
  hideTie();
  mySide = "w";
  boardEl.classList.remove("flipped");
  clearTurnTimer();
  updateTimerBar();
  if (totalTimerInterval) clearInterval(totalTimerInterval);
  totalTimeRemaining = { w: totalTimeSeconds, b: totalTimeSeconds };
  updateTotalTimerBar();
  cancelBestMoveHints();
  currentFen = getStartFen(currentVariant.id);
  renderBoardFromFen();
  if (engineReady) {
    engine.postMessage("ucinewgame");
    engine.postMessage("position startpos");
    engine.postMessage("isready");
    requestDump();
  }
  statusEl.textContent = "Ready.";
  if (showModal) {
    openHandicapOffer();
  }
}

function toggleRemovePiece(square) {
  const squareEl = boardEl.querySelector(`[data-square='${square}']`);
  if (!squareEl) return;
  moveHistory.push({ fen: currentFen, removed: cloneRemovedPieces() });
  if (removedPieces.has(square)) {
    const pieceChar = removedPieces.get(square);
    removedPieces.delete(square);
    squareEl.classList.remove("square-removed");
    currentFen = updateFenAtSquare(currentFen, square, pieceChar);
  } else {
    const piece = boardMap.get(square);
    if (!piece) return;
    const pieceChar = piece.color === "w" ? piece.type.toUpperCase() : piece.type;
    removedPieces.set(square, pieceChar);
    squareEl.classList.add("square-removed");
    currentFen = updateFenAtSquare(currentFen, square, null);
  }
  engine.postMessage(`position fen ${currentFen}`);
  requestDump();
}

function openPiecePicker(square) {
  if (!pieceModalEl || !pieceGridEl) return;
  pendingPieceSquare = square;
  pieceGridEl.innerHTML = "";
  modalOpen = true;
  const renderEntries = () => {
    pieceGridEl.innerHTML = "";
    const entries = [
      { label: "Empty", piece: null, className: "empty" },
      { label: "K", piece: piecePickerColor === "w" ? "K" : "k" },
      { label: "Q", piece: piecePickerColor === "w" ? "Q" : "q" },
      { label: "R", piece: piecePickerColor === "w" ? "R" : "r" },
      { label: "B", piece: piecePickerColor === "w" ? "B" : "b" },
      { label: "N", piece: piecePickerColor === "w" ? "N" : "n" },
      { label: "P", piece: piecePickerColor === "w" ? "P" : "p" },
    ];
    entries.forEach((entry) => {
    const button = document.createElement("button");
    button.className = `piece-choice ${entry.className || ""}`.trim();
    if (entry.piece) {
      const color = entry.piece === entry.piece.toUpperCase() ? "w" : "b";
      const type = entry.piece.toLowerCase();
      const img = document.createElement("img");
      img.src = pieceImageUrl({ color, type });
      img.alt = entry.label;
      button.appendChild(img);
    } else {
      button.textContent = "Empty";
    }
    button.addEventListener("click", () => {
      applyPieceChoice(entry.piece);
    });
    pieceGridEl.appendChild(button);
    });
  };
  renderEntries();
  if (pieceWhiteEl && pieceBlackEl) {
    pieceWhiteEl.classList.toggle("primary", piecePickerColor === "w");
    pieceBlackEl.classList.toggle("primary", piecePickerColor === "b");
    pieceWhiteEl.onclick = () => {
      piecePickerColor = "w";
      renderEntries();
      pieceWhiteEl.classList.add("primary");
      pieceBlackEl.classList.remove("primary");
    };
    pieceBlackEl.onclick = () => {
      piecePickerColor = "b";
      renderEntries();
      pieceBlackEl.classList.add("primary");
      pieceWhiteEl.classList.remove("primary");
    };
  }
  pieceModalEl.classList.remove("hidden");
}

function applyPieceChoice(pieceChar) {
  if (!pendingPieceSquare) return;
  const square = pendingPieceSquare;
  pendingPieceSquare = null;
  if (pieceModalEl) pieceModalEl.classList.add("hidden");
  modalOpen = false;
  moveHistory.push({ fen: currentFen, removed: cloneRemovedPieces() });
  const existing = boardMap.get(square);
  if (!pieceChar) {
    if (!existing) return;
    removedPieces.set(square, existing.color === "w" ? existing.type.toUpperCase() : existing.type);
    currentFen = updateFenAtSquare(currentFen, square, null);
  } else {
    removedPieces.delete(square);
    currentFen = updateFenAtSquare(currentFen, square, pieceChar);
  }
  engine.postMessage(`position fen ${currentFen}`);
  requestDump();
}

function isPromotionMove(from, to) {
  const piece = boardMap.get(from);
  if (!piece || piece.type !== "p") return false;
  const [, toRank] = squareToCoords(to);
  return (piece.color === "w" && toRank === currentVariant.ranks) || (piece.color === "b" && toRank === 1);
}

function openPromotionPicker() {
  if (!promotionModalEl || !promotionGridEl) return;
  promotionGridEl.innerHTML = "";
  const entries = [
    { label: "q", type: "q" },
    { label: "r", type: "r" },
    { label: "b", type: "b" },
    { label: "n", type: "n" },
  ];
  const color = pendingPromotion ? (boardMap.get(pendingPromotion.from)?.color || "w") : "w";
  entries.forEach((entry) => {
    const button = document.createElement("button");
    button.className = "piece-choice";
    const img = document.createElement("img");
    img.src = pieceImageUrl({ color, type: entry.type });
    img.alt = entry.label;
    button.appendChild(img);
    button.addEventListener("click", () => {
      applyPromotion(entry.type);
    });
    promotionGridEl.appendChild(button);
  });
  promotionModalEl.classList.remove("hidden");
  modalOpen = true;
}

function applyPromotion(type) {
  if (!pendingPromotion) return;
  const moveStr = `${pendingPromotion.from}${pendingPromotion.to}${type}`;
  promotionModalEl.classList.add("hidden");
  modalOpen = false;
  const capturedCustom = customPieces.get(pendingPromotion.to);
  if (capturedCustom) {
    pendingCustomCapture = {
      from: pendingPromotion.from,
      to: pendingPromotion.to,
      captured: capturedCustom,
      capturer: boardMap.get(pendingPromotion.from),
    };
  }
  if (customPieces.has(pendingPromotion.from)) {
    pendingCustomMove = { from: pendingPromotion.from, to: pendingPromotion.to, custom: customPieces.get(pendingPromotion.from) };
  }
  if (gameModeEl.value === "pve" && getSideToMove() === mySide) {
    void evaluatePlayerMoveQuality(currentFen, moveStr);
  }
  applyMove(moveStr);
  pendingPromotion = null;
}

function isCustomMoveAllowed(from, to, custom) {
  const [fx, fy] = squareToCoords(from);
  const [tx, ty] = squareToCoords(to);
  const dx = tx - fx;
  const dy = ty - fy;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  if (adx === 0 && ady === 0) return false;
  const piece = boardMap.get(from);
  if (!piece) return false;
  if (adx === ady) {
    return adx <= custom.maxDiag;
  }
  if (dx === 0) {
    const forward = piece.color === "w" ? dy > 0 : dy < 0;
    const steps = Math.abs(dy);
    return forward ? steps <= custom.maxForward : steps <= custom.maxBackward;
  }
  return false;
}

function placeCustomPiece(square, custom) {
  const baseChar = custom.basePiece;
  currentFen = updateFenAtSquare(currentFen, square, baseChar);
  customPieces.set(square, custom);
  engine.postMessage(`position fen ${currentFen}`);
  requestDump();
}

function applyCustomCaptureEffects(payload) {
  const { to, captured, capturer } = payload;
  customPieces.delete(to);
  if (!captured || !capturer) return;
  if (captured.captureEffect === "capturerLoses") {
    showCheckmate(capturer.color === "w" ? "Black" : "White");
    return;
  }
  if (captured.captureEffect === "ownerLoses") {
    showCheckmate(capturer.color === "w" ? "White" : "Black");
    return;
  }
  if (captured.captureEffect === "destroyCapturer") {
    currentFen = updateFenAtSquare(currentFen, to, null);
    engine.postMessage(`position fen ${currentFen}`);
    requestDump();
    return;
  }
  if (captured.captureEffect === "explodeAround") {
    const [tx, ty] = squareToCoords(to);
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        if (dx === 0 && dy === 0) continue;
        const nx = tx + dx;
        const ny = ty + dy;
        if (nx < 0 || nx >= currentVariant.files) continue;
        if (ny < 1 || ny > currentVariant.ranks) continue;
        const sq = coordsToSquare(nx, ny);
        currentFen = updateFenAtSquare(currentFen, sq, null);
        customPieces.delete(sq);
      }
    }
    engine.postMessage(`position fen ${currentFen}`);
    requestDump();
    return;
  }
  if (captured.captureEffect === "teleportCapturer") {
    teleportMode = {
      from: to,
      pieceChar: capturer.color === "w" ? capturer.type.toUpperCase() : capturer.type,
      custom: customPieces.get(to) || null,
    };
    statusEl.textContent = "Tap a square to teleport.";
  }
}

function cloneRemovedPieces() {
  return new Map(removedPieces);
}

function cloneCustomPieces() {
  return new Map(customPieces);
}

function undoMove() {
  if (!moveHistory.length) return;
  if (engineBusy) {
    engine.postMessage("stop");
    engineBusy = false;
  }
  pendingEngineMove = false;
  cancelBestMoveHints();
  const restore = () => {
    const prev = moveHistory.pop();
    if (!prev) return;
    currentFen = prev.fen;
    removedPieces = new Map(prev.removed || []);
    customPieces = new Map(prev.custom || []);
    boardEl.querySelectorAll(".square-removed").forEach((el) => el.classList.remove("square-removed"));
  };
  restore();
  const sideToMove = currentFen?.split(" ")[1];
  if (gameModeEl.value === "pve" && sideToMove === "b" && moveHistory.length) {
    restore();
  }
  if (engineReady) {
    engine.postMessage(`position fen ${currentFen}`);
    requestDump();
  }
}

function updateFenAtSquare(fen, square, pieceChar) {
  if (!fen) return fen;
  const [placement, rest] = fen.split(" ");
  const board = fenToBoard(placement);
  const file = square.charCodeAt(0) - 97;
  const rank = Number.parseInt(square[1], 10);
  const rowIndex = currentVariant.ranks - rank;
  if (!board[rowIndex]) return fen;
  board[rowIndex][file] = pieceChar;
  const nextPlacement = boardToFen(board);
  return `${nextPlacement} ${rest}`;
}

function fenToBoard(placement) {
  const board = [];
  let row = [];
  for (const char of placement) {
    if (char === "/") {
      board.push(row);
      row = [];
      continue;
    }
    if (/\d/.test(char)) {
      const count = Number.parseInt(char, 10);
      for (let i = 0; i < count; i += 1) {
        row.push(null);
      }
      continue;
    }
    row.push(char);
  }
  board.push(row);
  while (board.length < currentVariant.ranks) {
    board.push(new Array(currentVariant.files).fill(null));
  }
  return board.map((r) => {
    const filled = r.slice(0, currentVariant.files);
    while (filled.length < currentVariant.files) filled.push(null);
    return filled;
  });
}

function boardToFen(board) {
  return board
    .map((row) => {
      let out = "";
      let empty = 0;
      row.forEach((cell) => {
        if (!cell) {
          empty += 1;
        } else {
          if (empty) {
            out += empty;
            empty = 0;
          }
          out += cell;
        }
      });
      if (empty) out += empty;
      return out;
    })
    .join("/");
}

function updateCheckState() {
  const parts = currentFen?.split(" ");
  if (!parts) return;
  const sideToMove = parts[1];
  if (turnIndicatorEl) {
    turnIndicatorEl.textContent = `Turn: ${sideToMove === "w" ? "White" : "Black"}`;
  }
  if (sideToMove !== lastTurnSide) {
    lastTurnSide = sideToMove;
    if (timeModeEnabled && isMyTurn()) {
      startTurnTimer();
    } else {
      clearTurnTimer();
      updateTimerBar();
    }
    if (timeModeEnabled && isMyTurn()) {
      scheduleBestMoveHints();
    } else {
      cancelBestMoveHints();
    }
    if (totalTimeEnabled) {
      startTotalTimer();
      updateTotalTimerBar();
    }
  }
  checkKingSquare = findKingSquare(sideToMove === "w" ? "K" : "k");
  if (checkers.length && !wasInCheck) {
    playChessSound("check");
  }
  wasInCheck = checkers.length > 0;
  renderMoveArrows();
  if (checkers.length && legalMoves.length === 0) {
    const winner = sideToMove === "w" ? "Black" : "White";
    showCheckmate(winner);
    return;
  }
  if (!checkers.length && legalMoves.length === 0) {
    showTie();
    return;
  }
  hideTie();
}

function findKingSquare(kingChar) {
  const placement = currentFen?.split(" ")[0];
  if (!placement) return null;
  const board = fenToBoard(placement);
  for (let r = 0; r < board.length; r += 1) {
    for (let f = 0; f < board[r].length; f += 1) {
      if (board[r][f] === kingChar) {
        return coordsToSquare(f, currentVariant.ranks - r);
      }
    }
  }
  return null;
}

function getSquareFromPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  const squareEl = el.closest?.("[data-square]");
  return squareEl ? squareEl.dataset.square : null;
}

function init() {
  setDepth(loadDepth());
  if (timeSecondsEl) {
    const next = Number.parseInt(timeSecondsEl.value || "10", 10);
    timeSeconds = Math.min(Math.max(next, 3), 60);
    timeSecondsEl.value = String(timeSeconds);
  }
  if (totalTimeMinutesEl) {
    const next = Number.parseInt(totalTimeMinutesEl.value || "10", 10);
    const minutes = Math.min(Math.max(next, 1), 60);
    totalTimeMinutesEl.value = String(minutes);
    totalTimeSeconds = minutes * 60;
    totalTimeRemaining = { w: totalTimeSeconds, b: totalTimeSeconds };
  }
  const users = loadUsers();
  renderUsers(users);
  const confirmed = localStorage.getItem(STORAGE_KEYS.userConfirmed) === "true";
  if (!confirmed) {
    showUserModal();
  }
  loadVariant();
  void initEngine().catch((error) => {
    console.error(error);
    statusEl.textContent = "Engine failed to load. You can still view/start board.";
  });
  window.addEventListener("resize", updateBoardSize);
  toggleSettingsEl.addEventListener("click", () => settingsContentEl.classList.toggle("hidden"));
  toggleSettingsEl.addEventListener("click", cleanupDragState);
  gameModeEl.addEventListener("change", () => {
    if (!pvpSettingsEl) return;
    pvpSettingsEl.classList.toggle("hidden", gameModeEl.value !== "pvp");
    if (gameModeEl.value !== "pvp") {
      disconnectPvp();
      setMySide("w");
    }
    updatePlayerPanels();
  });
  depthRangeEl.addEventListener("input", () => setDepth(Number.parseInt(depthRangeEl.value, 10)));
  depthValueEl.addEventListener("change", () => setDepth(Number.parseInt(depthValueEl.value, 10)));
  variantSelectEl.addEventListener("change", () => {
    setVariant(variantSelectEl.value);
  });
  userSelectEl.addEventListener("change", () => {
    setCurrentUser(userSelectEl.value);
    localStorage.setItem(STORAGE_KEYS.userConfirmed, "true");
    const current = getCurrentUser(loadUsers());
    userEloEl.textContent = `User Elo: ${current.elo}`;
    if (currentEloEl) currentEloEl.value = String(current.elo);
    updatePlayerPanels();
  });
  addUserEl.addEventListener("click", () => {
    const name = (newUserNameEl.value || "").trim();
    if (!name) return;
    const elo = Number.parseInt(newUserEloEl.value || "500", 10);
    const usersNext = loadUsers();
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    usersNext[id] = { id, name, elo: Math.min(Math.max(elo, 100), 3000) };
    saveUsers(usersNext);
    setCurrentUser(id);
    localStorage.setItem(STORAGE_KEYS.userConfirmed, "true");
    renderUsers(usersNext);
    newUserNameEl.value = "";
    newUserEloEl.value = "";
  });
  if (saveEloEl) {
    saveEloEl.addEventListener("click", () => {
      const value = Number.parseInt(currentEloEl?.value || "500", 10);
      if (!Number.isFinite(value)) return;
      const usersNext = loadUsers();
      const current = getCurrentUser(usersNext);
      current.elo = Math.min(Math.max(value, 100), 3000);
      usersNext[current.id] = current;
      saveUsers(usersNext);
      setCurrentUser(current.id);
      renderUsers(usersNext);
    });
  }
  undoMoveEl.addEventListener("click", undoMove);
  startGameEl.addEventListener("click", () => resetGame(true));
  showAllMovesEl.addEventListener("change", () => {
    showAllMoves = showAllMovesEl.checked;
    renderMoveArrows();
  });
  if (showTurnArrowsEl) {
    showTurnArrowsEl.addEventListener("change", () => {
      showTurnArrows = showTurnArrowsEl.checked;
      renderMoveArrows();
    });
  }
  if (timeModeEl) {
    timeModeEl.addEventListener("change", () => {
      timeModeEnabled = timeModeEl.checked;
      if (timeModeEnabled && isMyTurn()) {
        startTurnTimer();
        scheduleBestMoveHints();
      } else {
        clearTurnTimer();
        updateTimerBar();
        cancelBestMoveHints();
      }
      renderMoveArrows();
    });
  }
  if (timeSecondsEl) {
    timeSecondsEl.addEventListener("change", () => {
      const next = Number.parseInt(timeSecondsEl.value || "10", 10);
      timeSeconds = Math.min(Math.max(next, 3), 60);
      timeSecondsEl.value = String(timeSeconds);
      if (timeModeEnabled && isMyTurn()) {
        startTurnTimer();
        scheduleBestMoveHints();
      } else {
        updateTimerBar();
      }
    });
  }
  if (totalTimeModeEl) {
    totalTimeModeEl.addEventListener("change", () => {
      totalTimeEnabled = totalTimeModeEl.checked;
      if (totalTimeEnabled) {
        startTotalTimer();
      } else if (totalTimerInterval) {
        clearInterval(totalTimerInterval);
        totalTimerInterval = null;
      }
      updateTotalTimerBar();
    });
  }
  if (totalTimeMinutesEl) {
    totalTimeMinutesEl.addEventListener("change", () => {
      const next = Number.parseInt(totalTimeMinutesEl.value || "10", 10);
      const minutes = Math.min(Math.max(next, 1), 60);
      totalTimeMinutesEl.value = String(minutes);
      totalTimeSeconds = minutes * 60;
      totalTimeRemaining = { w: totalTimeSeconds, b: totalTimeSeconds };
      updateTotalTimerBar();
    });
  }
  checkmateNewGameEl.addEventListener("click", () => resetGame(true));
  if (tieNewGameEl) {
    tieNewGameEl.addEventListener("click", () => resetGame(true));
  }
  if (pieceCancelEl) {
    pieceCancelEl.addEventListener("click", () => {
      pendingPieceSquare = null;
      if (pieceModalEl) pieceModalEl.classList.add("hidden");
      modalOpen = false;
    });
  }
  if (promotionCancelEl) {
    promotionCancelEl.addEventListener("click", () => {
      pendingPromotion = null;
      if (promotionModalEl) promotionModalEl.classList.add("hidden");
      modalOpen = false;
    });
  }
  if (openPieceMakerEl && pieceMakerModalEl) {
    openPieceMakerEl.addEventListener("click", () => {
      pieceMakerModalEl.classList.remove("hidden");
      modalOpen = true;
      if (pieceMakerGridEl) {
        pieceMakerGridEl.innerHTML = "";
        ["q", "r", "b", "n"].forEach((type) => {
          const button = document.createElement("button");
          button.className = "piece-choice";
          const img = document.createElement("img");
          img.src = pieceImageUrl({ color: "w", type });
          img.alt = type;
          button.appendChild(img);
          button.addEventListener("click", () => {
            pieceMakerGridEl.querySelectorAll(".piece-choice").forEach((el) => el.classList.remove("selected"));
            button.classList.add("selected");
            button.dataset.type = type;
          });
          if (type === "q") {
            button.classList.add("selected");
            button.dataset.type = type;
          }
          pieceMakerGridEl.appendChild(button);
        });
      }
      if (pieceIconGridEl) {
        pieceIconGridEl.innerHTML = "";
        const icons = [
          { id: "dragon", icon: "🐉" },
          { id: "bear", icon: "🐻" },
          { id: "portal", icon: "🌀" },
          { id: "airplane", icon: "✈️" },
          { id: "wall", icon: "🧱" },
        ];
        icons.forEach((entry) => {
          const button = document.createElement("button");
          button.className = "piece-choice";
          button.textContent = entry.icon;
          button.dataset.icon = entry.icon;
          button.addEventListener("click", () => {
            pieceIconGridEl.querySelectorAll(".piece-choice").forEach((el) => el.classList.remove("selected"));
            button.classList.add("selected");
          });
          if (entry.id === "dragon") {
            button.classList.add("selected");
          }
          pieceIconGridEl.appendChild(button);
        });
      }
    });
  }
  if (pieceMakerSaveEl) {
    pieceMakerSaveEl.addEventListener("click", () => {
      const typeButton = pieceMakerGridEl?.querySelector(".piece-choice.selected");
      const type = typeButton?.dataset.type || "q";
      const iconButton = pieceIconGridEl?.querySelector(".piece-choice.selected");
      const icon = iconButton?.dataset.icon || "🐉";
      pendingCustomPiece = {
        basePiece: type,
        maxDiag: Number.parseInt(pieceMaxDiagEl?.value || "0", 10),
        maxForward: Number.parseInt(pieceMaxForwardEl?.value || "0", 10),
        maxBackward: Number.parseInt(pieceMaxBackwardEl?.value || "0", 10),
        captureEffect: pieceCaptureEffectEl?.value || "none",
        icon,
      };
      customPlaceMode = true;
      statusEl.textContent = "Tap a square to place your piece.";
    });
  }
  if (pieceMakerCancelEl) {
    pieceMakerCancelEl.addEventListener("click", () => {
      if (pieceMakerModalEl) pieceMakerModalEl.classList.add("hidden");
      modalOpen = false;
      customPlaceMode = false;
      pendingCustomPiece = null;
    });
  }
  if (openFeedbackEl && feedbackModalEl) {
    openFeedbackEl.addEventListener("click", () => {
      feedbackModalEl.classList.remove("hidden");
      modalOpen = true;
      if (feedbackRatingValueEl && feedbackRatingEl) {
        feedbackRatingValueEl.textContent = feedbackRatingEl.value;
      }
    });
  }
  if (feedbackRatingEl && feedbackRatingValueEl) {
    feedbackRatingEl.addEventListener("input", () => {
      feedbackRatingValueEl.textContent = feedbackRatingEl.value;
    });
  }
  if (feedbackSubmitEl) {
    feedbackSubmitEl.addEventListener("click", () => {
      const payload = {
        rating: Number.parseInt(feedbackRatingEl?.value || "0", 10),
        text: (feedbackTextEl?.value || "").trim(),
        createdAt: new Date().toISOString(),
      };
      const stored = JSON.parse(localStorage.getItem("chess.feedback") || "[]");
      stored.push(payload);
      localStorage.setItem("chess.feedback", JSON.stringify(stored));
      if (feedbackModalEl) feedbackModalEl.classList.add("hidden");
      if (feedbackTextEl) feedbackTextEl.value = "";
      modalOpen = false;
      statusEl.textContent = "Thanks for the feedback!";
    });
  }
  if (feedbackCancelEl) {
    feedbackCancelEl.addEventListener("click", () => {
      if (feedbackModalEl) feedbackModalEl.classList.add("hidden");
      modalOpen = false;
    });
  }
  if (joinSaveEl) {
    joinSaveEl.addEventListener("click", () => {
      createUserFromModal();
    });
  }
  window.addEventListener("blur", cleanupDragState);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cleanupDragState();
  });
  flipBoardEl.addEventListener("click", () => {
    if (gameModeEl.value === "pvp") {
      boardEl.classList.toggle("flipped");
      return;
    }
    mySide = mySide === "w" ? "b" : "w";
    boardEl.classList.toggle("flipped");
  });
  if (createRoomEl && roomLinkEl) {
    createRoomEl.addEventListener("click", async () => {
      const res = await fetch("/api/create-room", { method: "POST" });
      if (!res.ok) return;
      const data = await res.json();
      roomLinkEl.value = `${location.origin}?room=${data.roomId}`;
      gameModeEl.value = "pvp";
      if (pvpSettingsEl) pvpSettingsEl.classList.remove("hidden");
      connectToRoom(data.roomId);
      updatePlayerPanels();
    });
  }
  if (joinRoomEl) {
    joinRoomEl.addEventListener("click", () => {
      const roomId = (joinCodeEl?.value || "").trim();
      if (!roomId) return;
      gameModeEl.value = "pvp";
      if (pvpSettingsEl) pvpSettingsEl.classList.remove("hidden");
      connectToRoom(roomId);
      updatePlayerPanels();
    });
  }
  const urlRoom = new URLSearchParams(location.search).get("room");
  if (urlRoom) {
    gameModeEl.value = "pvp";
    if (pvpSettingsEl) pvpSettingsEl.classList.remove("hidden");
    connectToRoom(urlRoom);
    updatePlayerPanels();
  }
  updateTimerBar();
  fullscreenToggleEl.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  });
}

init();
