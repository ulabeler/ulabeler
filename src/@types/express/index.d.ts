declare namespace Express {
  // interface User {}
  export interface Request {
    user?: {
      id: string;
      name: string;
      password: string;
      mailaddress: string;
      icon_path: string | null;
      self_introduction: string | null;
      cardnumber: string | null;
      name_card: string | null;
      expiration: string | null;
      created_at: Date;
      deleted_at: Date | null;
    };
  }
}
