export{}
//Discordで通知送る関係
const { Webhook } = require('discord-webhook-node');
const discord_webhook = new Webhook("https://discord.com/api/webhooks/904898756435116035/k4k7gu19OP1CKx5hBVUx9F-g1I8MAkkEby7O_jutZ_6oz8JMFD4USjc3IlnvdqYz5Hxa");
export function send_discord(message:string){
    discord_webhook.send(message);
}