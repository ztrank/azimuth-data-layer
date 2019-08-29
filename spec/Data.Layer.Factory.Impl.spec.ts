import 'reflect-metadata';
import { Container, injectable } from 'inversify';
import { of, Observable } from 'rxjs';
import { DataLayerBind } from '../src/data-layer/Data.Layer.Bind';
import { DataLayerSymbols } from '../src/data-layer/symbols';
import { DataLayerFactory } from '../src/data-layer/types/Data.Layer.Factory';
import { HttpExceptions } from '../src/service-references/azimuth-exceptions';

interface MyDataLayerInterface {
    testProc(): Observable<any[][]>;
    procTest(id: number): Observable<any[][]>;
}

const appSettings = {
    DataLayer: {
        connection: 'connectionName',
        schemas: {
            test_interface: [
                'test_proc',
                'proc_test'
            ]
        }
    }
};

const connection = {
    execute: jest.fn()
};

const connectionFactory = {
    get: jest.fn().mockImplementation(name => {
        expect(name).toBe('connectionName');
        return of(connection);
    })
};

beforeEach(() => {
    connection.execute.mockReset();
});

@injectable()
class NotFoundException extends Error {}

@injectable()
class InternalServerException extends Error {}

function addExceptions(container: Container): Container {
    container.bind(HttpExceptions.InternalServerException).toConstructor(InternalServerException);
    container.bind(HttpExceptions.NotFoundException).toConstructor(NotFoundException);
    return container;
}

test('Execute No Params', (done) => {
    const container = new Container();
    container.bind('AppSettings').toConstantValue(appSettings);
    container.bind('ConnFact').toConstantValue(connectionFactory);
    DataLayerBind(container, 'AppSettings', 'ConnFact');
    connection.execute.mockImplementation((schema, proc, ...inputs: any[]) => {
        expect(schema).toBe('test_interface');
        expect(proc).toBe('test_proc');
        expect(inputs).toHaveLength(0);
        return of([[{results:'success'}]]);
    })

    const dataLayerFactory = addExceptions(container).get<DataLayerFactory<MyDataLayerInterface>>(DataLayerSymbols.DataLayerFactory);
    const dataLayer = dataLayerFactory('test_interface');
    expect(dataLayer).toBeDefined();
    expect(dataLayer.procTest).toBeDefined();
    expect(dataLayer.testProc).toBeDefined();
    expect(typeof dataLayer.procTest).toBe('function');
    expect(typeof dataLayer.testProc).toBe('function');
    
    dataLayer.testProc()
        .subscribe(res => {
            expect(res).toBeDefined();
            expect(res).toHaveLength(1);
            expect(res[0]).toHaveLength(1);
            expect(res[0][0].results).toBe('success');
            expect(connection.execute).toHaveBeenCalledTimes(1);
            done();
        });
});


test('Execute With Params', (done) => {
    const container = new Container();
    container.bind('AppSettings').toConstantValue(appSettings);
    container.bind('ConnFact').toConstantValue(connectionFactory);
    DataLayerBind(container, 'AppSettings', 'ConnFact');
    connection.execute.mockImplementation((schema, proc, ...inputs: any[]) => {
        expect(schema).toBe('test_interface');
        expect(proc).toBe('proc_test');
        expect(inputs).toHaveLength(1);
        expect(inputs[0]).toBe(12345);
        return of([[{results:'success'}]]);
    })

    const dataLayerFactory = addExceptions(container).get<DataLayerFactory<MyDataLayerInterface>>(DataLayerSymbols.DataLayerFactory);
    const dataLayer = dataLayerFactory('test_interface');
    expect(dataLayer).toBeDefined();
    expect(dataLayer.procTest).toBeDefined();
    expect(dataLayer.testProc).toBeDefined();
    expect(typeof dataLayer.procTest).toBe('function');
    expect(typeof dataLayer.testProc).toBe('function');
    
    dataLayer.procTest(12345)
        .subscribe(res => {
            expect(res).toBeDefined();
            expect(res).toHaveLength(1);
            expect(res[0]).toHaveLength(1);
            expect(res[0][0].results).toBe('success');
            expect(connection.execute).toHaveBeenCalledTimes(1);
            done();
        });
})