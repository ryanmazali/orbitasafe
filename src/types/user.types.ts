export interface UsuarioResposta {
    idUsu: number;
    nmUsu: string;
    emailUsu: string;
    tpUsu: string;
    dtCadastro: string;
}

export interface LoginPayload {
    emailUsu: string;
    senhaUsu: string;
}

export interface CadastroPayload {
    nmUsu: string;
    emailUsu: string;
    senhaUsu: string;
}

export interface ErroApi {
    erro: string;
}
