"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_discord = void 0;
//Discordで通知送る関係
const { Webhook } = require('discord-webhook-node');
const discord_webhook = new Webhook(process.env.discord_webhook);
function send_discord(message) {
    discord_webhook.send(message);
}
exports.send_discord = send_discord;
