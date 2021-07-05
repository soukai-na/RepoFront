import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuComponent } from './components/menu/menu.component';
import { SubscriberComponent } from './components/subscriber/subscriber/subscriber.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'AllSubscribers', component: SubscriberComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
