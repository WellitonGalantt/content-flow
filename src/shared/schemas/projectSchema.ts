import * as yup from 'yup';
import { ICreateProjectData, ITagData, IUpProjectData, IUpdateProjectData } from '../types/appTypes';

export const createProjectSchema: yup.ObjectSchema<ICreateProjectData> = yup.object().shape({
    title: yup.string().required('O tiulo é obrigatorio!'),
    date_submit: yup.string().required('Data de envio é obrigatorio!'),
    text: yup.string().required('Data é obrigatorio!'),
});

export const updateProjectSchema: yup.ObjectSchema<Omit<IUpdateProjectData, 'updated_at'>> = yup.object().shape({
    title: yup.string().min(14, 'Titulo deve ter pelo menos 14 caracteres!').required('O tiulo é obrigatorio!'),
    date_submit: yup.string().required('Data de envio é obrigatorio!'),
});

export const createTagSchema: yup.ObjectSchema<ITagData> = yup.object().shape({
    tag_name: yup
        .string()
        .min(5, 'O nome da tag deve ter pelo menos 5 caracteres')
        .max(12, 'O nome da tag deve ter no maximo 12 caracteres')
        .required('Nome da tag é obrigatorio'),
    color: yup.string().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Cor inválida. Use formato #RRGGBB ou #RGB'),
});
