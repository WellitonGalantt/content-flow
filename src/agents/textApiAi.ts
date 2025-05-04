import dotenv from 'dotenv';
import { IChatCompletionResponse } from '../shared/types/appTypes';
dotenv.config();

//model: deepseek/deepseek-prover-v2:free
export const createContentScript = async (data: string): Promise<IChatCompletionResponse | null> => {
    const content = `Você é um roteirista profissional e especialista em marketing digital. Gere um roteiro completo e estratégico para vídeo de 8 a 12 minutos com base na descrição abaixo.

    Use técnicas de storytelling, marketing de conteúdo, gatilhos mentais, linguagem persuasiva e criativa. Estruture o roteiro em sessões, Cada sessão deve ser pensada como um corte curto com títulos chamativos e falas detalhadas. Em cada sessão, inclua exemplos práticos, falas impactantes e frases que gerem engajamento. 
    
    Quero que as falas sejam o mais realistas e humanas possíveis, Com linguagem natural, como se fosse uma conversa entre duas pessoas, não quero algo robotizado, use por exemplo pausas e entonações como: “Pensa comigo…”, “Você já parou pra pensar?”, “Mano, olha isso!”, “Agora vem o mais louco…”
    
    Retorne o resultado em formato obrigatório JSON puro, sem texto adicional., com os seguintes campos:
    
    - titulo_principal: título chamativo para o vídeo longo
    - roteiro: lista de sessões, onde cada sessão contém:
      - titulo_curto: título chamativo para corte/vídeo curto
      - descricao: resumo do que será abordado na sessão
      - falas: lista com falas impactantes, como se fosse o apresentador falando
      - exemplos: lista com exemplos práticos e aplicáveis
    - palavras_chave: lista de palavras-chave para SEO
    - publico_alvo: lista de perfis ideais de público
    - objetivo: resumo do propósito principal do vídeo
    - prompt_imagem_capa: prompt em inglês para gerar imagem de thumbnail

    IMPORTANTE : Nao esqueca de formatar corretamente o json para nao ocorrer nenhum erro, feche todos os couchetes, chaves e virgula, sempre verifique certinho.
    IMPORTANTE : Retorne apenas um JSON válido. Não inclua comentários, explicações ou texto antes ou depois do JSON. Comece com { e termine com }.
    
    Descrição do vídeo ${data}`;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
                'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: [
                    {
                        role: 'user',
                        content: content,
                    },
                ],
            }),
        });

        if (!response.ok) {
            console.error(new Error(`Erro na requisicao: ${response.status}`));
            return null;
        }

        const dataRes = (await response.json()) as IChatCompletionResponse;
        // console.log(`Responsta da API: ${JSON.stringify(dataRes, null, 2)}`);
        return dataRes;
    } catch (err: any) {
        console.error(new Error(`Erro na requisicao: ${err}`));
        return null;
    }
};
