export interface userTable {
    id: string;
    name: string;
    password: string;
    mailaddress: string;
    icon_path: string | null;
    self_introduction: string | null;
    cardnumber: string | null;
    name_card: string | null;
    expiration: string | null;
    created_at: string;
    deleted_at: string | null;
}

export interface mail_confirmationsTable {
    user_id: string;
    datetime_issue: string;
    mailaddress_new: string | null;
    token_confirmation: string;
}

export interface password_resetTable {
    id: string;
    datetime_issue: Date;
    temp_password: string;
}

export interface favorited_workTable {
    favorite_from: string;
    favorite_to: string;
    favorited_at: string;
}

export interface favorited_work_numberTable {
    favorited_to_id: string;
    number: number; //いいね数
}

export interface favorited_userTable {
    favorite_from: string;
    favorite_to: string;
    favorited_at: string;
}

export interface favorited_user_numberTable {
    favorited_to_id: string;
    number: number; //いいね数
}

export interface purchase_historyTable {
    id: string;
    user_id: string;
    items: JSON; //TODO:後で書く
    number_invoices: string;
    purchased_at: Date | null;
    payment_method: string;
}

export interface delivery_addressTable {
    user_id: string;
    updated_at: Date;
    zipcode: string;
    address: string;
    familyname: string;
    firstname: string;
    familyname_furigana: string;
    firstname_furigana: string;
}

export interface delivery_statusTable {
    purchase_record_id: string;
    datetime_schedule: Date | null;
    current_status: string | null;
    zipcode: string;
    address: string;
    familyname: string;
    firstname: string;
    familyname_furigana: string | null;
    firstname_furigana: string | null;
    datetime_results: Date | null;
    updated_at: Date | null;
}

export interface base_settingsTable {
    id: number;
    object_path: string;
    base_tex_path: string;
    thumbnail_path: string;
    unit_price: number;
    created_at: Date;
    deleted_at: Date | null;
}

export interface vendorTable {
    id: number;
    name: string;
}

export interface category_settingsTable {
    name: string;
    thumbnail_path: string | null;
    created_at: Date | null;
}

export interface base_categoryTable {
    id: number;
    vendor_id: number;
    name_category: string;
    name_subcategory: string;
}

export interface work_used_stampsTable {
    work_id: string;
    stamp_settings_id: number;
    num_used: number | null;
}

export interface stamp_settingsTable {
    id: number;
    name: string;
    img_path: string;
    unit_price: number;
}

export interface workTable {
    id: number;
    created_by_user_id: string;
    base_category_id: number;
    name: string;
    work_tex_path: string;
    thumbnail_path: string;
    flag_public: boolean;
    unit_price: number;
    hashtag: JSON | null;
    introduction: string | null;
    num_of_images: number;
    create_at: Date;
}

export interface inquiryTable {
    id: number;
    user_id: string;
    category: number;
    description: JSON;
    name: string;
    mail_address: string;
    status: string;
    reply: JSON | null;
    replyed_by_user_id: string | null;
    posted_at: Date;
    updated_at: Date;
}

export interface administratorTable {
    id: string;
    name: string | null;
}

export interface reportTable {
    id: number;
    reported_to_user_id: string;
    reported_from_user_id: string;
    category_id: number;
    reporterd_description: string;
    reported_at: Date;
}

export interface sample_imagesTable {
    id: number;
    sample_images_path: string;
    added_at: Date;
}