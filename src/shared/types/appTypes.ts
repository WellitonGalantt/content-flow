export interface IReturnDatas {
    sucess: boolean;
    statusCode: number;
    data: object;
    message: string;
    error: object;
}

export interface ICreateProjectData {
    title: string;
    date_submit: string;
    text: string;
}

export interface IUpdateProjectData {
    title?: string;
    date_submit?: string;
    updated_at?: string;
}

export interface IUpProjectData {
    title: string;
    date_submit: string;
    user_id: number;
}

export interface IChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface IRoteiro {
    titulo_principal: string;
    roteiro: Array<{
        titulo_curto: string;
        descricao: string;
        falas: string[];
        exemplos: string[];
    }>;
    palavras_chave: string[];
    publico_alvo: string[];
    objetivo: string;
    prompt_imagem_capa: string;
}

export interface IUpScriptData {
    user_text: string;
    ia_text: Object;
    project_id: number;
}

export interface ITagData {
    tag_name: string;
    color?: string;
}
