import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriberComponent } from './components/subscriber/subscriber/subscriber.component';
import { TableModule } from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import { MenuComponent } from './components/menu/menu.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { HeaderComponent } from './components/header/header.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {InputNumberModule} from 'primeng/inputnumber';
import { AuthComponent } from './components/auth/auth.component';
import {PasswordModule} from 'primeng/password';
import { LogoutComponent } from './components/logout/logout.component';
import { ServiceMichocComponent } from './components/service-michoc/service-michoc.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { MaterielComponent } from './components/materiel/materiel.component';
import { AbonnementComponent } from './components/abonnement/abonnement.component';
import {DropdownModule} from 'primeng/dropdown';
import {AvatarModule} from 'primeng/avatar';
import { FactureComponent } from './components/facture/facture.component';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  declarations: [
    AppComponent,
    SubscriberComponent,
    MenuComponent,
    HeaderComponent,
    AuthComponent,
    LogoutComponent,
    ServiceMichocComponent,
    MaterielComponent,
    AbonnementComponent,
    FactureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    PanelModule,
    BrowserAnimationsModule,
    MenubarModule,
    DialogModule,
    PanelMenuModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
    PasswordModule,
    InputTextareaModule,
    DropdownModule,
    AvatarModule,
    CalendarModule,
    SelectButtonModule,
    InputMaskModule
    
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
