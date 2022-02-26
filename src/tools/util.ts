// import express from "express";
import { knex } from "../app";
// import crypto from "crypto";
import { workTable } from "./TypeAlias/tableType_alias";
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
/**
 * @param {number} limit 取得件数
 * @return {myFavoriteWorkList[]} idList 取得したidの配列
 */
async function getRandomIdList(limit: number): Promise<myFavoriteWorkList[]> {
  const topPageWorkList: myFavoriteWorkList[] = [];
  const workList: workTable[] = await knex("work")
    .where("flag_public", true)
    .orderByRaw("RAND()")
    .limit(limit)
    .then((work: workTable[]) => {
      return work;
    });
  for (let i = 0; i < workList.length; i++) {
    topPageWorkList.push(workList[i]);
  }
  console.table(topPageWorkList);
  return topPageWorkList;
}

export { getMaxPage, getRandomIdList };
