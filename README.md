# azimuth-data-layer

## Installation
COMING SOON!

## Use
1. Include the DataLayerFactory type: `type DataLayerFactory<T> = (schema: string) => T;`
2. Setup the app.config.json's DataLayer property
3. Call the `DataLayerBind` function in your application at startup
4. Inject the factory into your class 

### Binding
```typescript

appSetup(): void {
    const container = new Container();
    // ... Bind your connection factory and appSettings
    // Optinoally bind or provide a function to handle naming conversions as the 4th parameter, default is from snake_case to camelCase
    const dataLayerFactorySymbol = DataLayerFactoryBind(container, appSettingSymbol, connectionFactorySymbol);
    // If you are the application, provide this symbol to other plugin's Bind functions
    // If you are a plugin, in your bind function, require this symbol and bind your internal symbol to this as a service 
    // example: container.bind(sym).toService(dataLayerFactorySymbol);
}
```

### Injection
```typescript
import { injectable, inject } from 'inversify';
import { DataLayerFactory } from '../my/types/';
import { MyDataLayerInterface } from '../my/interfaces/';

@injectable()
export class Service {
    private myDataLayer: MyDataLayerInterface;

    public constructor(
        @inject(YourPluginsDataLayerFactorySymbol) dataLayerFactory: DataLayerFactory<MyDataLayerInterface>
    ) {
        this.myDataLayer = dataLayerFactory('schemaName');
    }

    public doSomething(): Observable<any> {
        return this.myDataLayer.myProcedure()
            .pipe(
                map((res: any[][]) => {
                    let transformed;
                    // do your transforms here
                    return transformed;
                })
            );
    }
}
```