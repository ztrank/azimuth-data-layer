
export interface AppSettings {
    DataLayer: DataLayerSettings;
}

export interface DataLayerSettings {
    connection: string;
    schemas: SchemaSettings;
}

export interface SchemaSettings {
    [schema: string]: string[];
}