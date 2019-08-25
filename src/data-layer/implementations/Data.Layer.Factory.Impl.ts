import { interfaces } from 'inversify';
import { DataLayerSymbols } from '../symbols';
import { ConnectionFactory } from '../interfaces/Connection.Factory';
import { AppSettings } from '../interfaces/App.Settings';
import { mergeMap } from 'rxjs/operators';
import { DataLayer } from '../interfaces/Data.Layer';
import { ProcedureNameConverter } from '../types/Procedure.Name.Converter';

function convertName(name: string, converter: ProcedureNameConverter): string {
    if(typeof converter === 'function') {
        return converter(name);
    } else {
        return converter.convert(name);
    }
}

export function DataLayerFactory<T extends DataLayer>(context: interfaces.Context): interfaces.Factory<T> {
    const appSettings = context.container.get<AppSettings>(DataLayerSymbols.AppSettings);
    const connectionFactory = context.container.get<ConnectionFactory>(DataLayerSymbols.ConnectionFactory);
    const converter = context.container.get<ProcedureNameConverter>(DataLayerSymbols.ProcedureNameConverter);

    return (schema: string) => {
        return <T>appSettings.DataLayer.schemas[schema].reduce((dataLayer: DataLayer, procedure: string) => {
            dataLayer[convertName(procedure, converter)] = (...args: any[]) => {
                return connectionFactory.get(appSettings.DataLayer.connection)
                    .pipe(
                        mergeMap(connection => connection.execute(schema, procedure, ...args))
                    )
            };
            return dataLayer;
        }, {})
    }
}