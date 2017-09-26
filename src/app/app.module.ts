import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SymbolComponent } from './symbol.component';
import { UserInterfaceComponent } from './user-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    SymbolComponent,
    UserInterfaceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
