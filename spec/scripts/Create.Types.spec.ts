import 'reflect-metadata';
import { CreateTypes } from '../../scripts/Create.Types';
import { typeString } from '../../scripts/types';
import { typeIndexString } from '../../scripts/types.index';
import { of } from 'rxjs';
import { IFileUtil } from '@trankzachary/pipeline/dist/Utils/interfaces';

const _root = 'root';
const fileUtil = {
    saveFile: jest.fn().mockImplementation((content, root, src, dir, file) => {
        if(file === 'index.ts') {
            expect(content).toBe(typeIndexString);
        } else {
            expect(file).toBe('Data.Layer.Factory.ts');
            expect(content).toBe(typeString);
        }
        expect(root).toBe(_root);
        expect(src).toBe('src');
        expect(dir).toBe('data-layer');
        return of(undefined);
    })
}

test('Create Type', (done) => {
    const create = new CreateTypes(<IFileUtil><any>fileUtil, _root);
    create.run()
        .subscribe(() => {
            expect(fileUtil.saveFile).toHaveBeenCalledTimes(2);
            done();
        });
});