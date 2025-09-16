import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import {  TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    BottomNavComponent,
    TranslateModule.forRoot({ fallbackLang: 'fr' })

  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue:{subscriptSizing: 'dynamic'} }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}

