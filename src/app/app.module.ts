import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { RiskMeterComponent } from './risk-meter/risk-meter.component';
import { TypesComponent } from './types/types.component';
import { SeveritiesComponent } from './severities/severities.component';
import { SourcesComponent } from './sources/sources.component';

@NgModule({
  declarations: [
    AppComponent,
    RiskMeterComponent,
    TypesComponent,
    SeveritiesComponent,
    SourcesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
