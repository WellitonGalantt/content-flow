export interface IRegisterUser extends  ICreateUser{
    id?: number;
    confirm_password: string;
    telephone: ITelephoneUser;
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export interface ICreateTelephone extends ITelephoneUser {
    user_id: number
}

export interface ITelephoneUser {
    ddd: string;
    number: string;
    notfication: boolean;
}
