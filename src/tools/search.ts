/* eslint-disable no-invalid-this */
import { knex } from "../app";
import { parsedQuery } from "../tools/TypeAlias/miscAlias";
import { workTable, userTable } from "tools/TypeAlias/tableType_alias";
// それぞれのパターンに対応する作品検索処理
/**
 * @param {parsedQuery} parsedQuery  パース済み検索クエリ
 * @return {workTable[]} 作品検索結果
 */
async function searchWork(
  parsedQuery: parsedQuery
): Promise<workTable[] | boolean> {
  // searchQueryに@が含まれる要素がある場合、userTableからそのユーザーのidを取得
  if (parsedQuery.userId) {
    // ユーザーidが含まれている場合の処理
    if (parsedQuery.hashTags && parsedQuery.other.length === 0) {
      // userId + ハッシュタグ
      const resultWork: workTable[] = await knex("work")
        .where("created_by_user_id", parsedQuery.userId)
        .andWhere("flag_public", 1)
        // hashtagはjson型。一つでも一致したらその結果を返す
        .andWhere(function () {
          for (let i = 0; i < parsedQuery.hashTags.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
      if (resultWork.length === 0) {
        return false;
      }
      return resultWork;
    } else {
      // 全部入り
      const resultWork: workTable[] = await knex("work")
        .where("created_by_user_id", parsedQuery.userId)
        .andWhere("flag_public", 1)
        // hashtagはjson型。一つでも一致したらその結果を返す
        .andWhere(function () {
          for (let i = 0; i < parsedQuery.hashTags.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
          }
        })
        .andWhere(function () {
          for (let i = 0; i < parsedQuery.other.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.andWhere("name", "like", `%${parsedQuery.other[i]}%`);
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
      if (resultWork.length === 0) {
        return false;
      }
      return resultWork;
    }
  } else if (parsedQuery.hashTags.length !== 0) {
    // ユーザーidはないが、ハッシュタグがある場合の処理
    if (parsedQuery.other.length === 0) {
      const resultWork: workTable[] = await knex("work")
        // hashtagはjson型。一つでも一致したらその結果を返す
        .where(function () {
          for (let i = 0; i < parsedQuery.hashTags.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
          }
        })
        .andWhere("flag_public", 1)
        .catch((error: Error) => {
          console.error(error);
        });
      if (resultWork.length === 0) {
        return false;
      }
      return resultWork;
    } else {
      // ハッシュタグとその他がある場合の処理
      const resultWork: workTable[] = await knex("work")
        // hashtagはjson型。一つでも一致したらその結果を返す
        .where(function () {
          for (let i = 0; i < parsedQuery.hashTags.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
          }
        })
        .andWhere("flag_public", 1)
        .andWhere(function () {
          for (let i = 0; i < parsedQuery.other.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.andWhere("name", "like", `%${parsedQuery.other[i]}%`);
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
      if (resultWork.length === 0) {
        return false;
      }
      return resultWork;
    }
  } else if (parsedQuery.other.length !== 0) {
    // ユーザーidとハッシュタグがないが、その他がある場合の処理
    const resultWork: workTable[] = await knex("work")
      .where(function () {
        for (let i = 0; i < parsedQuery.other.length; i++) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.andWhere("name", "like", `%${parsedQuery.other[i]}%`);
        }
      })
      .andWhere("flag_public", 1);
    if (resultWork.length === 0) {
      return false;
    }
    return resultWork;
  } else {
    return false;
  }
}

/**
 * @param {parsedQuery} parsedQuery  パース済み検索クエリ
 * @return {userTable[]} 検索結果
 */
async function searchUser(
  parsedQuery: parsedQuery
): Promise<userTable | boolean> {
  if (parsedQuery.userId) {
    const resultUser: userTable[] = await knex("user")
      .where("id", parsedQuery.userId)
      .catch((error: Error) => {
        console.error(error);
      });
    if (resultUser.length === 0) {
      return false;
    }
    return resultUser[0];
  } else {
    return false;
  }
}

// async function searchWorkWithUserName(parsedQuery: parsedQuery)
// メモ
// otherが作品名であると仮定したとき
// otherが作者名であると仮定したとき
// otherが上記2つの混合であるとしたとき（or使うのがいいかも）
export { searchWork, searchUser };
