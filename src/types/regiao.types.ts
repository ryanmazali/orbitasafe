export interface Regiao {
    idReg: number;
    nmReg: string;
    dtCadastro?: string;
    fkUsuarioIdUsu: number;
    fkSubprefeituraIdSubpref: number;
}

export interface CriarRegiaoPayload {
    idReg: number;
    nmReg: string;
    fkUsuarioIdUsu: number;
    fkSubprefeituraIdSubpref: number;
    dtCadastro?: string;
}

export interface Subprefeitura {
    idSubpref: number;
    cdSubpref: number;
    nmSubpref: string;
    latitudeSubpref: number;
    longitudeSubpref: number;
    qtAlagamento: number;
}
