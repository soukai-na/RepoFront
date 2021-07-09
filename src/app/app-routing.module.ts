import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonnementComponent } from './components/abonnement/abonnement.component';
import { AuthComponent } from './components/auth/auth.component';
import { FactureComponent } from './components/facture/facture.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { MenuComponent } from './components/menu/menu.component';
import { ServiceMichocComponent } from './components/service-michoc/service-michoc.component';
import { SubscriberComponent } from './components/subscriber/subscriber/subscriber.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'subscribers', component: SubscriberComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'services', component: ServiceMichocComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'materiels', component: MaterielComponent },
  { path: 'abonnements', component: AbonnementComponent },
  { path: 'factures', component: FactureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
