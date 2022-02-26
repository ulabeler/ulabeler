// import express from "express";
// import { knex } from "../app";
// import crypto from "crypto";
// import { userTable, workTable, base_categoryTable } from "./TypeAlias/tableType_alias";

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

export { getMaxPage };
