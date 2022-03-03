#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/**
 * Module dependencies.
 */

import dotenv from "dotenv";
dotenv.config();
import app from "../app";
const debug = require("debug")("ulabeler:server");
import http from "http";

import {
  sendDiscordV2,
  setDiscordPayload,
} from "../tools/discord_send_message";
import { discordMessageDetail } from "tools/TypeAlias/miscAlias";

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

server.on("listening", () => {
  // 起動したら、ログをDiscordに飛ばす。
  const environment = process.env.U_DB_ENVIRONMENT || "development";
  const detail: discordMessageDetail = {
    message: "",
  };

  if (environment === "production" || environment === "staging") {
    detail.message = `listening on ${port}`;
  } else {
    detail.message = `listening on ${port}`;
  }
  const payload = setDiscordPayload(environment, false, detail);
  sendDiscordV2(payload);
});

// Normalize a port into a number, string, or false.
/**
 * @argument {string} val - port number
 * @return {number|string|boolean}
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.
/**
 * @param {any} error - error object
 */
function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  if (addr != null) {
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }
}
