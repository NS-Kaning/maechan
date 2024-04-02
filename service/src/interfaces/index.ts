export type Doctype{
    name : string;
}

export type IBusiness<T = unknown> = T & Doctype & {
    business_name: string;
    business_address: string;
    manager: string;
}

export type IUserProfile  =  Doctype & {
    fullname: string;
    birthdate: string;
    nationality: string;
    tel: string;
    email: string;
    race: string;
    address_no: string;
    address_moo: string;
    address_soi: string;
    address_road: string;
    address_province: string;
    address_amphur: string;
    address_district: string;
}

export type IProvince = Doctype & {
    name_th : string;
}

export type IAmphure = Doctype &{
    name_th : string;
}

export type ITambon = Doctype &{
    name_th : string;
}