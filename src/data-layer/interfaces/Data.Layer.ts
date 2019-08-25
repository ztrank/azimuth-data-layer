import { DataLayerFunction } from '../types/Data.Layer.Function';

export interface DataLayer {
    [procedure: string]: DataLayerFunction;
}

