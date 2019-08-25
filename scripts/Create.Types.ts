import { injectable, inject } from 'inversify';
import { Utils } from '@trankzachary/pipeline';
import { PipelineSymbols } from '@trankzachary/pipeline/dist/symbols';
import { Observable } from 'rxjs';
import { typeString } from './types';
import { mergeMap } from 'rxjs/operators';
import { typeIndexString } from './types.index';

@injectable()
export class CreateTypes {
    public constructor(
        @inject(PipelineSymbols.FileUtil) private fileUtil: Utils.interfaces.IFileUtil,
        @inject(PipelineSymbols.ProjectRoot) private root: string
    ) {}

    public run(): Observable<void> {
        return this.fileUtil.saveFile(typeString, this.root, 'src', 'data-layer', 'Data.Layer.Factory.ts')
            .pipe(
                mergeMap(() => this.fileUtil.saveFile(typeIndexString, this.root, 'src', 'data-layer', 'index.ts'))
            )
    }
}