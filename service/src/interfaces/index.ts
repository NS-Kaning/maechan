export interface IBusiness {
    business_name: string;
    business_address: string;
    manager: string;
}

export interface IUserProfile {
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

export interface IProvince {
    name : string;
    name_th : string;
}

export interface IAmphure {
    name : string;
    name_th : string;
}

export interface ITambon {
    name : string;
    name_th : string;
}