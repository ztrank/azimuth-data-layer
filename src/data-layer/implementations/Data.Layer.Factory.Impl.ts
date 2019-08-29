import { interfaces } from 'inversify';
import { DataLayerSymbols } from '../symbols';
import { AppSettings } from '../interfaces/App.Settings';
import { mergeMap, catchError } from 'rxjs/operators';
import { DataLayer } from '../interfaces/Data.Layer';
import { ProcedureNameConverter } from '../types/Procedure.Name.Converter';
import { ConnectionFactory } from '../../service-references';
import { HttpExceptions, Exception } from '../../service-references/azimuth-exceptions';
import { throwError } from 'rxjs';
import { TYPES } from '../../service-references/azimuth-types';

function convertName(name: string, converter: ProcedureNameConverter): string {
    if(typeof converter === 'function') {
        return converter(name);
    } else {
        return converter.convert(name);
    }
}

export function DataLayerFactory<T extends DataLayer>(context: interfaces.Context): interfaces.Factory<T> {
    const appSettings = context.container.get<AppSettings>(TYPES.AppSettings);
    const connectionFactory = context.container.get<ConnectionFactory>(TYPES.ConnectionFactory);
    const converter = context.container.get<ProcedureNameConverter>(DataLayerSymbols.ProcedureNameConverter);
    const InternalServerError = context.container.get<interfaces.Newable<Exception>>(HttpExceptions.InternalServerException);
    return (schema: string) => {
        return <T>appSettings.DataLayer.schemas[schema].reduce((dataLayer: DataLayer, procedure: string) => {
            dataLayer[convertName(procedure, converter)] = (...args: any[]) => {
                return connectionFactory.get(appSettings.DataLayer.connection)
                    .pipe(
                        mergeMap(connection => connection.execute(schema, procedure, ...args)),
                        catchError(err => {
                            console.error(err);
                            return throwError(new InternalServerError(err));
                        })
                    )
            };
            return dataLayer;
        }, {})
    }
}