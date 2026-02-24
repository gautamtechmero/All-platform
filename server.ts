import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Database from "better-sqlite3";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("automation.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    drive_folder_id TEXT,
    recursive_scan INTEGER DEFAULT 0,
    sheet_id TEXT,
    schedule_rule TEXT,
    upload_limit INTEGER DEFAULT 5,
    status TEXT DEFAULT 'Active'
  );

  CREATE TABLE IF NOT EXISTS channels (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    platform TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expiry_date INTEGER,
    status TEXT DEFAULT 'Connected'
  );

  CREATE TABLE IF NOT EXISTS group_channels (
    group_id TEXT,
    channel_id TEXT,
    PRIMARY KEY (group_id, channel_id),
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (channel_id) REFERENCES channels(id)
  );

  CREATE TABLE IF NOT EXISTS content_queue (
    id TEXT PRIMARY KEY,
    file_id TEXT UNIQUE,
    file_name TEXT NOT NULL,
    group_id TEXT,
    title TEXT,
    status TEXT DEFAULT 'Pending',
    scheduled_time INTEGER,
    created_at INTEGER,
    FOREIGN KEY (group_id) REFERENCES groups(id)
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    content_id TEXT,
    channel_id TEXT,
    status TEXT DEFAULT 'Pending',
    published_link TEXT,
    error_message TEXT,
    FOREIGN KEY (content_id) REFERENCES content_queue(id),
    FOREIGN KEY (channel_id) REFERENCES channels(id)
  );

  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER,
    group_id TEXT,
    platform TEXT,
    file_name TEXT,
    action TEXT,
    status TEXT,
    message TEXT
  );
`);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  app.use(express.json());

  // WebSocket connection handling
  wss.on("connection", (ws) => {
    console.log("Client connected via WebSocket");
    ws.send(JSON.stringify({ type: "SYSTEM_STATUS", data: { status: "Online" } }));
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // Dashboard Stats
  app.get("/api/stats", (req, res) => {
    const stats = {
      totalGroups: db.prepare("SELECT COUNT(*) as count FROM groups").get().count,
      totalChannels: db.prepare("SELECT COUNT(*) as count FROM channels").get().count,
      pendingFiles: db.prepare("SELECT COUNT(*) as count FROM content_queue WHERE status = 'Pending'").get().count,
      scheduledToday: 0, // Placeholder
      publishedToday: 0, // Placeholder
      failedJobs: db.prepare("SELECT COUNT(*) as count FROM jobs WHERE status = 'Failed'").get().count,
    };
    res.json(stats);
  });

  // Groups API
  app.get("/api/groups", (req, res) => {
    const groups = db.prepare("SELECT * FROM groups").all();
    res.json(groups);
  });

  app.post("/api/groups", (req, res) => {
    const { name, driveFolderId, recursiveScan, sheetId, scheduleRule, uploadLimit, channelIds } = req.body;
    const id = Math.random().toString(36).substring(7);
    
    const insertGroup = db.prepare(`
      INSERT INTO groups (id, name, drive_folder_id, recursive_scan, sheet_id, schedule_rule, upload_limit)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMapping = db.prepare(`
      INSERT INTO group_channels (group_id, channel_id) VALUES (?, ?)
    `);

    const transaction = db.transaction(() => {
      insertGroup.run(id, name, driveFolderId, recursiveScan ? 1 : 0, sheetId, scheduleRule, uploadLimit);
      if (channelIds && Array.isArray(channelIds)) {
        for (const channelId of channelIds) {
          insertMapping.run(id, channelId);
        }
      }
    });

    transaction();
    res.json({ id, success: true });
  });

  // Channels API
  app.get("/api/channels", (req, res) => {
    const channels = db.prepare("SELECT * FROM channels").all();
    res.json(channels);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
