interface IDocumentType {
    id: string;
    name: string;
}

export const DOCUMENTS_TYPE: IDocumentType[] = [
    { id: "dni", name: "DNI" },
    { id: "passport", name: "Pasaporte" },
    { id: "cc", name: "Cedula de ciudadania" },
    { id: "ce", name: "Cedula de extranjeria" },
    { id: "nit", name: "NIT" },
    { id: "ruc", name: "RUC" },
    { id: "ti", name: "Tarjeta de identidad" },
];
