// src/app/app.server.module.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,       // ton module racine existant
    ServerModule     // ajoute le support SSR côté serveur
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
