/* eslint-disable @typescript-eslint/no-explicit-any */
import { knex } from "../app";
import { userTable } from "./TypeAlias/tableType_alias";

const tableName = "user";

// ユーザーIDを取得してセッションに保存するミドルウェア
/**
 * @param {string}userId
 * @return {Promise<void>}
 */
async function findById(userId: userTable["id"]) {
  const user = await where({ id: userId });
  if (user === null) {
    throw new Error(`${tableName} not found.`);
  }
  return { ...user };
}

// 謎、なんならここで定義してるもの全部使ってない説まである
/**
 * @param {string} condition
 * @return {Promise<void>}
 */
async function where(condition: { id: string }) {
  return await knex(tableName)
    .where(condition)
    .then((result: userTable[]) => {
      if (result.length === 0) {
        return null;
      }
      return result[0];
    });
}

// 認証済みかどうかを判定するメソッド
/**
 * @param {any} request
 * @return {boolean} ログインしていればtrue
 */
function getisAuth(request: any) {
  if (Boolean(request.session.userid)) {
    return true;
  } else {
    return false;
  }
}

// ログイン状態を調べるミドルウェア
const checkLogin = (request: Express.Request, response: any, next: any) => {
  if (!request.user) {
    return response.redirect("/");
  }

  return next();
};

// ユーザーの公開情報を取得するメソッド
/**
 * @param {string} userId
 */
async function getUserSocialInfo(userId: string) {
  const userSocialInfo: userTable[] = await knex("user")
    .select("id", "name", "icon_path", "self_introduction")
    .where("id", userId)
    .catch((error: Error) => {
      console.log(error);
    });
  if (userSocialInfo.length === 0) {
    return;
  } else {
    return userSocialInfo[0];
  }
}

export { findById, getisAuth, checkLogin, getUserSocialInfo };
