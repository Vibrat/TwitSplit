import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DumpContainerComponents } from "./container";
import { AppDataService } from "./app.data.service";

@NgModule({
  declarations: [
    AppComponent,
    ...DumpContainerComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ AppDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
