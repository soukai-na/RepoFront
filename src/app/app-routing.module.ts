import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriberComponent } from './components/subscriber/subscriber/subscriber.component';

const routes: Routes = [
  { path: 'AllSubscribers', component: SubscriberComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
