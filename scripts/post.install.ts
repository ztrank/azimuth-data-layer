import 'reflect-metadata';
import { AppConfig } from './app.config.json';
import { Container } from 'inversify';
import { Bind, SetJsonDefaults } from '@trankzachary/pipeline';
import { CreateTypes } from './Create.Types.js';

const container = new Container();
Bind(container)
    .register(container, SetJsonDefaults, AppConfig, false, 'app.config.json')
    .register(container, CreateTypes)
    .run(container)
    .subscribe(() => {});