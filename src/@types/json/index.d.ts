declare module "*/config.json" {
  interface CustomConfig {
    maxViewOnPage: number;
  }

  const value: CustomConfig;
  export = value;
}
