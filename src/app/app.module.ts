import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RowComponent } from './row-display.component';
import { SymbolComponent } from './symbol.component';
import { UserInterfaceComponent } from './user-interface.component';
import { SpinResultService } from './spin-result.service';
import { LoggerService } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    SymbolComponent,
    UserInterfaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SpinResultService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
