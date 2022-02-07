// import express from "express";
// import { knex } from "../app";
// import crypto from "crypto";
// import { userTable, workTable, base_categoryTable } from "./TypeAlias/tableType_alias";

// // ベースカテゴリのidを渡すことで、引数として指定した配列にサブカテゴリ名を入れる
// /**
//  * @param {Array} List
//  * @return {Array} List
//  */
// export async function addSubCategoryName(List: workTable[]): Promise<workTable> {
//     const subCategoryNameList: string[] = [];
//     for (const work of
//         await knex("base_category")
//             .select("name_subcategory")
//             .whereIn("id", List.map((work) => work.base_category_id))) {
//         subCategoryNameList.push(work.sub_category_name);
//     }
//     for (let i = 0; i < List.length; i++) {
//         List[i].ext_name_subcategory = subCategoryNameList[i];
//     }
//     return List;
// }