import { Container, interfaces, ContainerModule } from 'inversify';
import { AppSettings } from './interfaces/App.Settings';
import { DataLayerSymbols } from './symbols';
import { DataLayerFactory } from './implementations/Data.Layer.Factory.Impl';
import { ProcedureNameConverterImpl } from './implementations/Procedure.Name.Converter';
import { ConnectionFactory } from '../service-references';

export function DataLayerBind(
    container: Container, 
    appSettings: string | symbol | interfaces.Newable<AppSettings> | interfaces.Abstract<AppSettings>,
    connectionFactory: string | symbol | interfaces.Newable<ConnectionFactory> | interfaces.Abstract<ConnectionFactory>,
    procedureNameConverter: string | symbol | Function = ProcedureNameConverterImpl
): symbol {
    const containerModule = new ContainerModule(bind => {
        bind(DataLayerSymbols.AppSettings).toService(appSettings);
        bind(DataLayerSymbols.ConnectionFactory).toService(connectionFactory);

        if(typeof procedureNameConverter === 'function') {
            bind(DataLayerSymbols.ProcedureNameConverter).toFunction(procedureNameConverter);
        } else {
            bind(DataLayerSymbols.ProcedureNameConverter).toService(procedureNameConverter);
        }
        
        bind(DataLayerSymbols.DataLayerFactory).toFactory(DataLayerFactory);
    })
    
    container.load(containerModule);
    return DataLayerSymbols.DataLayerFactory;
}