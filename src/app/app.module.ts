import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordSearchGenerationModule } from 'src/Rules/WordSearchGeneration/WordSearchGenerationModule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WordSearchGenerationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
