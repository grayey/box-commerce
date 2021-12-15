import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { ApiHandlerService } from 'src/services/api-handler.service';
import { CurrencyConverterService } from 'src/services/currency-converter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

const APP_ROUTES:Routes = [
  {
    path:'',
    component:AppComponent
  },
  {
    path:'currency',
    loadChildren: () => import('./currency-converter/currency-converter.module').then(m => m.CurrencyConverterModule)
  },
  {
    path:'unit',
    loadChildren: () => import('./unit-converter/unit-converter.module').then(m => m.UnitConverterModule)
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule, 
    RouterModule.forRoot(APP_ROUTES),
    MatSidenavModule,
  ],
  providers: [
    ApiHandlerService,
    CurrencyConverterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
