import * as yup from 'yup'
import { ICreateProjectData, IUpProjectData, IUpdateProjectData } from '../types/appTypes'

export const createProjectSchema: yup.ObjectSchema<ICreateProjectData> = yup.object().shape({
    title: yup.string().required('O tiulo é obrigatorio!'),
    date_submit: yup.string().required('Data de envio é obrigatorio!'),
    text: yup.string().required('Data é obrigatorio!')
})

export const updateProjectSchema: yup.ObjectSchema<IUpdateProjectData> = yup.object().shape({
    title: yup.string().required('O tiulo é obrigatorio!'),
    date_submit: yup.string().required('Data de envio é obrigatorio!')
})