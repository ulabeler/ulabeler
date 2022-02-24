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
