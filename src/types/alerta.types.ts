export type NivelAlerta = "BAIXO" | "MEDIO" | "ALTO";
export type EstadoNotif = "LIDA" | "NAO_LIDA";

export interface Alerta {
    idAlerta: number;
    nivelAlerta: NivelAlerta;
    tpEvento: string;
    dsAlerta: string;
    dtAlerta: string;
    fkRegiaoIdReg: number;
    fkLeituraIdLeitura: number;
}

export interface Notificacao {
    idNotif: number;
    dsNotif: string;
    dtNotif: string;
    estadoNotif: EstadoNotif;
    fkUsuarioIdUsu: number;
    fkAlertaIdAlerta: number;
}
