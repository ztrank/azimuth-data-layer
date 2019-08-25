import { Observable } from 'rxjs';
import { ProcedureResult } from './Procedure.Result';

export type DataLayerFunction = (...args: any[]) => Observable<ProcedureResult>;