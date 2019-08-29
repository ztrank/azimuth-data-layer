import { ContainerModule } from 'inversify';
import { DataLayerSymbols } from './symbols';
import { DataLayerFactory } from './implementations/Data.Layer.Factory.Impl';
import { ProcedureNameConverterImpl } from './implementations/Procedure.Name.Converter';
import { TYPES } from '../service-references/azimuth-types';

export const DataLayerModule = new ContainerModule(bind => {
    bind(DataLayerSymbols.ProcedureNameConverter).toFunction(ProcedureNameConverterImpl);
    bind(TYPES.DataLayerFactory).toFactory(DataLayerFactory);
});
