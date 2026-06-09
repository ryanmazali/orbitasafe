/** Níveis de risco retornados pelo modelo de classificação de alagamento */
export type NivelAlerta = "BAIXO" | "MEDIO" | "ALTO";
export type EstadoNotif = "LIDA" | "NAO_LIDA";

/** Registro gerado após análise climática por região */
export interface Alerta {
    idAlerta: number;
    nivelAlerta: NivelAlerta;
    tpEvento: string;
    dsAlerta: string;
    dtAlerta: string;
    fkRegiaoIdReg: number;
    fkLeituraIdLeitura: number;
}

/** Notificação gerada para alertas de nível MÉDIO e ALTO */
export interface Notificacao {
    idNotif: number;
    dsNotif: string;
    dtNotif: string;
    estadoNotif: EstadoNotif;
    fkUsuarioIdUsu: number;
    fkAlertaIdAlerta: number;
}
