export{}
//Discordで通知送る関係
const { Webhook } = require('discord-webhook-node');
const discord_webhook = new Webhook(process.env.discord_webhook);
export function send_discord(message:string){
    discord_webhook.send(message);
}