import * as yup from 'yup';
import { IRegisterUser, ITelephoneUser } from '../types/authTypes';

export const telephoneSchema: yup.ObjectSchema<ITelephoneUser> = yup.object().shape({
    ddd: yup.number().max(3, 'DDD so spode no maximo 3 didgitos').required('DDD é obrgatorio'),
    number: yup.number().max(9, ' Numero so pode no maximo 9 digitos!').required('Numro é obrgatorio'),
    notfication: yup.boolean().required('Opção de notficação é obrigatória!'),
});

export const registerSchema: yup.ObjectSchema<IRegisterUser> = yup.object().shape({
    id: yup.number().optional(),
    name: yup.string().max(120, 'Nome muito grande!').required('Nome é obrigatorio!'),
    email: yup.string().email('Digite um email valido!').required('Email é obrigatório!'),
    password: yup.string().required('Senha é obrigatoria!'),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Senhas não conferem!')
        .required('Por favor confirme sua senha!'),
    telephone: telephoneSchema,
});

export const loginSchema: yup.ObjectSchema<Omit<IRegisterUser, 'telephone'>> = yup.object().shape({
    id: yup.number().optional(),
    name: yup.string().max(120, 'Nome muito grande!').required('Nome é obrigatorio!'),
    email: yup.string().email('Digite um email valido!').required('Email é obrigatório!'),
    password: yup.string().required('Senha é obrigatoria!'),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Senhas não conferem!')
        .required('Por favor confirme sua senha!'),
});
