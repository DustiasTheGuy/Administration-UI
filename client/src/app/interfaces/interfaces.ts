export interface GTconfig {
    seed: string;
    length: number;
    updateField: string;
    temperature?: number;
}

export interface iServer {
    serviceName: string;
    serviceNameShort: string;
    position: Position;
}

declare interface Position {
    x: number;
    y: number;
}