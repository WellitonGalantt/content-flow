export interface IRegisterUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    telephone: ITelephoneUser;
}

export interface ITelephoneUser {
    ddd: string;
    number: string;
    notfication: boolean;
}
