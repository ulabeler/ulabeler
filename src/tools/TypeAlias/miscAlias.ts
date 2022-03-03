/* eslint-disable camelcase */
import {
  userTable,
  workTable,
  purchase_historyTable,
  // cartTable,
} from "./tableType_alias";
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
    baseCategoryId?: number;
    workImagePath?: string;
    unitPrice?: number;
    quantity?: number;
    dummy?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;
  }[];
};

type searchWorkList = boolean | workTable[];
type singleUserSearchResult = boolean | userTable;

export type purchaseHistoryWorkList = {
  workName?: string;
  workImagePath?: string;
  unitPrice?: number;
  baseCategoryName?: string;
};

export type cartListWorkDetail = cartUtil & {
  workName?: string;
  baseCategoryName?: string;
  workImagePath?: string;
  unitPrice?: number;
  baseCategoryId?: number;
};

type cartUtil = {
  workId?: string;
  userId?: string;
  quantity?: number;
};

export type discordPayload = {
  username?: string;
  avatar_url?: string;
  content?: string; // メンション等に使う
  embeds: {
    title?: string;
    description?: string; // Discordで通知送る
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: { text: string; icon_url: string };
    image?: { url: string };
    thumbnail?: { url: string };
    author?: { name: string; url?: string; icon_url?: string };
    fields?: (
      | {
          name: string;
          value: string; // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inline?: boolean;
        }
      | { name: string; value: string; inline?: undefined }
    )[];
  }[];
};

export type discordMessageDetail = {
  requestURI?: string;
  errorMessage?: string;
  statusCode?: number;
  message?: string;
  errStack?: string;
  method?: string;
};
