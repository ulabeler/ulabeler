import { workTable } from "./tableType_alias";
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
