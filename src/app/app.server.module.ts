// src/app/app.server.module.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ServerTranslateLoader } from './i18n/server-translate-loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: ServerTranslateLoader }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
