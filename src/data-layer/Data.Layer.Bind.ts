import { Container, interfaces } from 'inversify';
import { AppSettings } from './interfaces/App.Settings';
import { ConnectionFactory } from './interfaces/Connection.Factory';
import { DataLayerSymbols } from './symbols';
import { DataLayerFactory } from './implementations/Data.Layer.Factory.Impl';
import { ProcedureNameConverterImpl } from './implementations/Procedure.Name.Converter';

export function DataLayerBind(
    container: Container, 
    appSettings: string | symbol | interfaces.Newable<AppSettings> | interfaces.Abstract<AppSettings>,
    connectionFactory: string | symbol | interfaces.Newable<ConnectionFactory> | interfaces.Abstract<ConnectionFactory>,
    procedureNameConverter: string | symbol | Function = ProcedureNameConverterImpl
): symbol {
    container.bind(DataLayerSymbols.AppSettings).toService(appSettings);
    container.bind(DataLayerSymbols.ConnectionFactory).toService(connectionFactory);

    if(typeof procedureNameConverter === 'function') {
        container.bind(DataLayerSymbols.ProcedureNameConverter).toFunction(procedureNameConverter);
    } else {
        container.bind(DataLayerSymbols.ProcedureNameConverter).toService(procedureNameConverter);
    }
    
    container.bind(DataLayerSymbols.DataLayerFactory).toFactory(DataLayerFactory);

    return DataLayerSymbols.DataLayerFactory;
}