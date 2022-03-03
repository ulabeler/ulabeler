// Discordで通知送る関係
import { Webhook } from "discord-webhook-node";
import fetch from "node-fetch";
import { discordMessageDetail, discordPayload } from "./TypeAlias/miscAlias";
const discordMentionTo = process.env.discord_mention || "";
// Discordで通知送る
/**
 * @param {string} message - 通知メッセージ本文
 * @return {void}
 */
export function sendDiscord(message: string): void {
  const discordWebhookUrl = process.env.discord_webhook || null;
  if (discordWebhookUrl) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const discordWebhook: any = new Webhook(discordWebhookUrl);
    discordWebhook.send(message);
  }
}

const env = process.env.U_DB_ENVIRONMENT || "development";

const hostName = () => {
  if (env === "development") {
    return "http://localhost:3001";
  } else if (env === "staging") {
    return "https://devulabeler.na2na.website";
  } else {
    return "https://ulabeler.na2na.website";
  }
};

// Discordで通知送る
/**
 * @param {any} payload - 通知メッセージ本文
 * @return {void}
 */
export function sendDiscordV2(payload: discordPayload) {
  const discordWebhookUrl = process.env.discord_webhook || null;
  if (discordWebhookUrl) {
    fetch(discordWebhookUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }).catch((err) => {
      console.log(err);
    });
  }
}

// Discordで送るメッセージを作成する
/**
 * @param {string} environment
 * @param {boolean} isError
 * @param {string} detail Not Required
 * @return {discordPayload}
 */
export function setDiscordPayload(
  environment: string,
  isError: boolean,
  detail?: discordMessageDetail
) {
  // environmentの最初一文字を大文字に
  const viewEnvironmentString =
    environment.charAt(0).toUpperCase() +
    environment.slice(1) +
    `(${hostName()})`;
  const TypeR = isError ? "💥Error" : "<:info:948981362868760637>Information";
  const Type = isError ? "💥Error" : "<:info:948981362868760637>Information";
  const payload: discordPayload = {
    avatar_url: "https://devulabeler.na2na.website/favicon.ico",
    embeds: [
      {
        // 日本時間にする
        timestamp: new Date().toISOString(),
        color: 12728755,
        footer: {
          text: "© Ulabeler",
          icon_url: "https://devulabeler.na2na.website/favicon.ico",
        },
        fields: [
          {
            name: "Environment",
            value: viewEnvironmentString,
            inline: false,
          },
          {
            name: "Type",
            value: Type,
            inline: true,
          },
        ],
      },
    ],
  };

  if (environment === "production" || environment === "staging") {
    payload.content = `<@${discordMentionTo}>`;
  }

  if (isError) {
    if (detail?.statusCode == 404) {
      payload.embeds[0].title = TypeR;
      payload.embeds[0].description = "エラーか攻撃っぽい？";
      payload.embeds[0].fields?.push({
        name: "Status Code",
        value: detail.statusCode.toString(),
        inline: true,
      });
      payload.embeds[0].fields?.push({
        name: "Request Method",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value: detail.method!,
        inline: true,
      });
    } else if (detail?.statusCode == 500) {
      (payload.embeds[0].title = TypeR),
        (payload.embeds[0].description = "500エラーっぽい？");
      payload.embeds[0].fields?.push({
        name: "Status Code",
        value: detail.statusCode.toString(),
        inline: true,
      });
      payload.embeds[0].fields?.push({
        name: "Message",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value: detail.message!,
        inline: false,
      });
    }
  } else {
    // お知らせ用
    payload.embeds[0].title = TypeR;
    payload.embeds[0].fields?.push({
      name: "Message",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: detail!.message!,
      inline: false,
    });
  }

  if (detail?.requestURI) {
    payload.embeds[0].fields?.push({
      name: "Request URI",
      value: detail.requestURI,
      inline: false,
    });
  }
  if (detail?.errorMessage) {
    payload.embeds[0].fields?.push({
      name: "Message",
      value: detail.errorMessage,
      inline: false,
    });
  }
  return payload;
}
