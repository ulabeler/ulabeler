// Discordで通知送る関係
import { Webhook } from "discord-webhook-node";
// Discordで通知送る
/**
 * @param {string} message - 通知メッセージ本文
 * @return {void}
 */
export function sendDiscord(message: string): void {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || null;
  if (discordWebhookUrl) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const discordWebhook: any = new Webhook(discordWebhookUrl);
    discordWebhook.send(message);
  }
}
