import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration.component';
import { RowComponent } from './row-display.component';
import { SymbolComponent } from './symbol.component';
import { UserInterfaceComponent } from './user-interface.component';
import { GrcsComponent } from './grcs.component';
import { GrcsQuestionComponent } from './grcs-question.component';
import { InfoPopUpComponent } from './info-popup.component';
import { InfoPopUpMsgComponent } from './info-popup-msg.component';
import { StatsPopUpComponent } from './stats-popup.component';

import { SpinResultService } from './spin-result.service';
import { LoggerService } from './logger.service';
import { CustomRequestOptions } from './custom-request-options';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    RowComponent,
    SymbolComponent,
    UserInterfaceComponent,
    GrcsComponent,
    GrcsQuestionComponent,
    InfoPopUpComponent,
    InfoPopUpMsgComponent,
    StatsPopUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SpinResultService,
    LoggerService,
    { provide: RequestOptions, useClass: CustomRequestOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
