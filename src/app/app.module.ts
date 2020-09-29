import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeUserComponent } from './components/welcome-user/welcome-user.component';
import { VotoComponent } from './components/voto/voto.component';
import { Papeleta1Component } from './components/papeletas/papeleta1/papeleta1.component';
import { Papeleta2Component } from './components/papeletas/papeleta2/papeleta2.component';
import { Papeleta3Component } from './components/papeletas/papeleta3/papeleta3.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { ChartsComponent } from './components/charts/charts.component';
import { FormsModule } from '@angular/forms';
import { VotoInformacionComponent } from './components/votos/voto-informacion/voto-informacion.component';
import { VotoPresidenteComponent } from './components/votos/voto-presidente/voto-presidente.component';
import { VotoVicePresidenteComponent } from './components/votos/voto-vice-presidente/voto-vice-presidente.component';
import { VotoSecretarioComponent } from './components/votos/voto-secretario/voto-secretario.component';
import { CandidatosComponent } from './components/admin/candidatos/candidatos.component';
import { CandidatosXPaisComponent } from './components/admin/candidatos-xpais/candidatos-xpais.component';
import { CandidatosChangeRondaComponent } from './components/admin/candidatos-change-ronda/candidatos-change-ronda.component';
import { UsersComponent } from './components/admin/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenComponent } from './components/admin/token/token.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    WelcomeUserComponent,
    VotoComponent,
    Papeleta1Component,
    Papeleta2Component,
    Papeleta3Component,
    ChartsComponent,
    VotoInformacionComponent,
    VotoPresidenteComponent,
    VotoVicePresidenteComponent,
    VotoSecretarioComponent,
    CandidatosComponent,
    CandidatosXPaisComponent,
    CandidatosChangeRondaComponent,
    UsersComponent,
    TokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    ClrIconModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
