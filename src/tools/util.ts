/* eslint-disable camelcase */
// import express from "express";
import { knex } from "../app";
// import crypto from "crypto";
import {
  userTable,
  workTable,
  base_categoryTable,
  favorited_work_numberTable,
  cartTable,
  favorited_workTable,
  base_settingsTable,
} from "./TypeAlias/tableType_alias";
import { myFavoriteWorkList } from "./TypeAlias/miscAlias";

// お気に入り作者リストで使うページネーション用MaxPageを返すやつ
/**
 * @param {string} viewType myFavCreatorList-ListかmyFavCreatorList-tile
 * @param {number} ListLength 対象の作者数
 * @param {number} maxViewOnPage 1ページ当たりの表示数
 * @return {number} maxPage ページネーションで表示される最大ページ数
 */
function getMaxPage(
  viewType: string,
  ListLength: number,
  maxViewOnPage: number
): number {
  if (viewType == "myFavCreatorList-List") {
    // よく考えたらこれタイルでもリストでも一緒では
    const maxPage =
      ListLength % maxViewOnPage === 0
        ? ListLength / maxViewOnPage
        : Math.floor(ListLength / maxViewOnPage) + 1;
    return maxPage;
  } else {
    // よく考えたらこれタイルでもリストでも一緒では
    const maxPage =
      ListLength % maxViewOnPage === 0
        ? ListLength / maxViewOnPage
        : Math.floor(ListLength / maxViewOnPage) + 1;
    return maxPage;
  }
}

// 全ての公開作品から、ランダムに指定件数のidを取得して配列に格納して返すメソッド
// eslint-disable-next-line valid-jsdoc
/**
 * @param {number} limit 取得件数
 * @param {userTable | null} user ユーザー情報
 * @return {myFavoriteWorkList[]} idList 取得したidの配列
 */
async function getRandomIdList(
  limit: number,
  user: userTable | null
): Promise<myFavoriteWorkList[]> {
  const topPageWorkList: myFavoriteWorkList[] = [];
  const workList: workTable[] = await knex("work")
    .where("flag_public", 1)
    .orderByRaw("RAND()")
    .limit(limit)
    .then((work: workTable[]) => {
      return work;
    });
  for (let i = 0; i < workList.length; i++) {
    topPageWorkList.push(workList[i]);
  }

  for (let i = 0; i < topPageWorkList.length; i++) {
    // 素体名
    const baseCategoryId: workTable["base_category_id"] =
      topPageWorkList[i].base_category_id;
    const baseCategoryName: string = await knex("base_category")
      .where("id", baseCategoryId)
      // eslint-disable-next-line camelcase
      .then((baseCategory: base_categoryTable[]) => {
        return baseCategory[0].name_subcategory;
      });
    topPageWorkList[i].baseCategoryName = baseCategoryName;
  }

  for (let i = 0; i < topPageWorkList.length; i++) {
    // いいね数
    const favoritedWorkNumber: number = await knex("favorited_work_number")
      .where("favorited_to_id", topPageWorkList[i].id)
      // eslint-disable-next-line camelcase
      .then((favoritedWorkNumber: favorited_work_numberTable[]) => {
        return favoritedWorkNumber[0].number;
      });
    topPageWorkList[i].favoritedWorkNumber = favoritedWorkNumber;
  }

  if (user) {
    for (let i = 0; i < topPageWorkList.length; i++) {
      // いいね数
      const isFavorited: boolean = await knex("favorited_work")
        .where("favorite_from", user.id)
        .andWhere("favorite_to", topPageWorkList[i].id)
        // eslint-disable-next-line camelcase
        .then((favoritedWorkNumber: favorited_workTable[]) => {
          if (favoritedWorkNumber.length === 0) {
            return false;
          } else {
            return true;
          }
        });
      topPageWorkList[i].isFavorited = isFavorited;
    }
  }

  for (let i = 0; i < topPageWorkList.length; i++) {
    // 作者情報の取得
    const userInfo: userTable[] = await knex("user")
      .where("id", topPageWorkList[i].created_by_user_id)
      // eslint-disable-next-line camelcase
      .then((user: userTable[]) => {
        return [
          {
            name: user[0].name,
            icon_path: user[0].icon_path,
          },
        ];
      });
    topPageWorkList[i].creatorName = userInfo[0].name as string;
    topPageWorkList[i].creatorIconPath = userInfo[0].icon_path as string;
  }

  for (let i = 0; i < topPageWorkList.length; i++) {
    // 自分の作品かどうかの判定
    if (!user) {
      topPageWorkList[i].userFlagIsMine = false;
    } else {
      const userFlagIsMine: boolean =
        topPageWorkList[i].created_by_user_id === user.id;
      topPageWorkList[i].userFlagIsMine = userFlagIsMine;
    }
  }

  // topPageWorkList.hashtagのJSON文字列をパースして配列に格納
  for (let i = 0; i < topPageWorkList.length; i++) {
    const hashtag = topPageWorkList[i].hashtag;
    const hashtagArray: string = JSON.stringify(hashtag);
    topPageWorkList[i].hashtag = hashtagArray;
  }

  return topPageWorkList;
}

// カート追加用のメソッド
/**
 * @param {string} workId 作品id
 * @param {string} userId ユーザー情報
 * @param {number} quantity カートに入れる数
 */
async function addCart(workId: string, userId: string, quantity?: number) {
  const currentWorkInsCartData: cartTable = {
    workId: workId,
    userId: userId,
    quantity: quantity || 1,
  };

  const currentCart = await knex("cart")
    .where("workId", workId)
    .andWhere("userId", userId)
    .catch((err: Error) => {
      console.log(err);
    });

  if (currentCart.length === 0) {
    await knex("cart")
      .insert(currentWorkInsCartData)
      .catch((err: Error) => {
        console.log(err);
      });
    return true;
  } else {
    await knex("cart")
      .where("workId", workId)
      .andWhere("userId", userId)
      .update({
        quantity: currentCart[0].quantity + 1,
      })
      .catch((err: Error) => {
        console.log(err);
      });
    return true;
  }
}

// 素体のテクスチャパスを返すメソッド
/**
 * @param {int} objectId
 */
async function getObjectVanillaThumbnailPath(objectId: number) {
  const texture: base_settingsTable[] = await knex("base_settings")
    .select("thumbnail_path")
    .where("id", objectId)
    .catch((err: Error) => {
      console.log(err);
    });
  return texture[0].thumbnail_path;
}

export { getMaxPage, getRandomIdList, addCart, getObjectVanillaThumbnailPath };
