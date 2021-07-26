import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonnementComponent } from './components/abonnement/abonnement.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FactureComponent } from './components/facture/facture.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { LoginComponent } from './components/login/login.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { MenuComponent } from './components/menu/menu.component';
import { ServiceMichocComponent } from './components/service-michoc/service-michoc.component';
import { SubscriberComponent } from './components/subscriber/subscriber/subscriber.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path: 'subscribers', component: SubscriberComponent },
  {path: 'user',component: UserComponent},
  { path: 'admin',component: AdminComponent},
  {path: 'login',component: LoginComponent},
  { path: 'menu', component: MenuComponent },
  { path: 'services', component: ServiceMichocComponent },
  { path: 'materiels', component: MaterielComponent },
  { path: 'abonnements', component: AbonnementComponent },
  { path: 'factures', component: FactureComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'historiques', component: HistoriqueComponent },
  { path: '', component: AccueilComponent,pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
