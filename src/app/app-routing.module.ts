import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatosChangeRondaComponent } from './components/admin/candidatos-change-ronda/candidatos-change-ronda.component';
import { CandidatosComponent } from './components/admin/candidatos/candidatos.component';
import { TokenComponent } from './components/admin/token/token.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ChartsComponent } from './components/charts/charts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaisComponent } from './components/pais/pais.component';
import { Papeleta1Component } from './components/papeletas/papeleta1/papeleta1.component';
import { Papeleta2Component } from './components/papeletas/papeleta2/papeleta2.component';
import { Papeleta3Component } from './components/papeletas/papeleta3/papeleta3.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { VotoComponent } from './components/voto/voto.component';
import { VotoInformacionComponent } from './components/votos/voto-informacion/voto-informacion.component';
import { VotoPresidenteComponent } from './components/votos/voto-presidente/voto-presidente.component';
import { VotoSecretarioComponent } from './components/votos/voto-secretario/voto-secretario.component';
import { VotoVicePresidenteComponent } from './components/votos/voto-vice-presidente/voto-vice-presidente.component';
import { WelcomeUserComponent } from './components/welcome-user/welcome-user.component';
import { LogeadoGuard } from './models/logeado.guard';
import { NotLoginUserGuard } from './services/notLoginUser.guard';
import { LoginRolsGuard } from './services/loginRols.guard';
import { NotLoginAdminGuard } from './services/notLoginAdmin.guard';
import { NotLoginSAGuard } from './services/notLoginSA.guard';

const routes: Routes = [
    {path: '', component: LoginComponent, canActivate:[LoginRolsGuard]},
    {path: 'registro', component: RegistroComponent, canActivate:[LoginRolsGuard]},
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: 'admin', component: HomeComponent, canActivate: [NotLoginAdminGuard] ,children: [
      { path: '', component: WelcomeUserComponent },
      { path: 'graficas', component: ChartsComponent },
      { path: 'candidatos', component: CandidatosComponent },
      { path: 'candidatosRound', component: CandidatosChangeRondaComponent }
    ]},
    {path: 'user', component: UserHomeComponent, canActivate:[NotLoginUserGuard] ,children: [
      { path: '', component: VotoInformacionComponent },
      { path: 'votoP/:puesto/:ronda', component: VotoPresidenteComponent },
      { path: 'votoV/:puesto/:ronda', component: VotoVicePresidenteComponent },
      { path: 'votoS/:puesto/:ronda', component: VotoSecretarioComponent }
    ]},
    {path: 'home', component: HomeComponent,canActivate: [NotLoginSAGuard] ,children: [
      { path: '', component: WelcomeUserComponent },
      { path: 'voto', component: VotoComponent },
      { path: 'graficas', component: ChartsComponent },
      { path: 'papeleta1', component: Papeleta1Component},
      { path: 'papeleta2', component: Papeleta2Component },
      { path: 'papeleta3', component: Papeleta3Component },
      { path: 'votoInformacion', component: VotoInformacionComponent },
      { path: 'votoP/:puesto/:ronda', component: VotoPresidenteComponent },
      { path: 'votoV/:puesto/:ronda', component: VotoVicePresidenteComponent },
      { path: 'votoS/:puesto/:ronda', component: VotoSecretarioComponent },
      { path: 'users', component: UsersComponent },
      { path: 'pais', component: PaisComponent },
      { path: 'token', component: TokenComponent },
      { path: 'votoP/:puesto/:ronda', component: VotoPresidenteComponent },
      { path: 'votoV/:puesto/:ronda', component: VotoVicePresidenteComponent },
      { path: 'votoS/:puesto/:ronda', component: VotoSecretarioComponent },
      { path: 'candidatos', component: CandidatosComponent },
      { path: 'candidatosRound', component: CandidatosChangeRondaComponent },
    ]},
    {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
