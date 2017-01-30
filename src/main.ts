import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (process.env.ANGULAR_WEBPACK_ENV === 'dist') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);