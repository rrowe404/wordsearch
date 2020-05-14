import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordSearchGenerationModule } from 'src/Rules/WordSearchGeneration/WordSearchGenerationModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UIModule } from 'src/UI/UIModule';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WordSearchGenerationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    UIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
