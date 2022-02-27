/* eslint-disable camelcase */
import { userTable, workTable, purchase_historyTable } from "./tableType_alias";
export type sideMenu = {
  title: string;
  url: string;
};

export type parsedQuery = {
  userId: string | null;
  hashTags: string[];
  other: string[];
  rawQuery: string[];
};

export type useWorkList = workTable & {
  isFavorited?: boolean;
  baseCategoryName?: string;
  favoritedWorkNumber?: number;
};

export type myFavoriteWorkList = workTable & {
  isFavorited?: boolean;
  favoritedWorkNumber?: number;
  baseCategoryName?: string;
  creatorIconPath?: string;
  creatorName?: string;
  favorited_at?: Date;
  userFlagIsMine?: boolean;
};

export type searchResult = {
  workList?: searchWorkList & {
    isFavorited?: boolean;
    favoritedWorkNumber?: number;
    baseCategoryName?: string;
    creatorIconPath?: string;
    creatorName?: string;
    userFlagIsMine?: boolean;
  };
  singleUserSearchResult?: singleUserSearchResult;
};

export type purchaseHistoryView = purchase_historyTable & {
  itemsDetail: {
    workId?: string;
    workName?: string;
    baseCategoryName?: string;
    workImagePath?: string;
    workPrice?: number;
    unit_price?: number;
    quantity?: number;
  }[];
};

type searchWorkList = boolean | workTable[];
type singleUserSearchResult = boolean | userTable;
