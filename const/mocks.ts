export interface IDocumentType {
    id: string;
    name: string;
}

export const DOCUMENTS_TYPE: IDocumentType[] = [
    { id: "cc", name: "Cedula de ciudadania" },
    { id: "ti", name: "Tarjeta de identidad" },
    { id: "ce", name: "Cedula de extranjeria" },
    { id: "passport", name: "Pasaporte" },
    { id: "dni", name: "DNI" },
    { id: "nit", name: "NIT" },
    { id: "ruc", name: "RUC" },
];
