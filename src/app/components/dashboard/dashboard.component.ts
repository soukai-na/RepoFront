import { Component, OnInit } from '@angular/core';
import { Abonnement } from 'src/app/model/abonnement';
import { materiel } from 'src/app/model/materiel';
import { service_michoc } from 'src/app/model/service-michoc';
import { Subscriber } from 'src/app/model/subscriber';
import { AbonnementService } from 'src/app/service/abonnement.service';
import { MaterielService } from 'src/app/service/materiel.service';
import { ServiceMichocService } from 'src/app/service/service-michoc.service';
import { SubscriberService } from 'src/app/service/subscriber.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  subscribers!:Subscriber[];
  services!:service_michoc[];
  materiels!:materiel[];
  abonnements!:Abonnement[];
  value!:number;
  constructor(private subscriberService:SubscriberService,
    private serviceService:ServiceMichocService,
    private materielService:MaterielService,
    private abonnementService:AbonnementService
    ) { 
  }

  getSubscribers() {
    this.subscriberService.getAll().subscribe(
     
      (resultat: any) => {
       this.subscribers = resultat;
      },
      error => {
        console.log(error);
      }
    )
  }
  getServices(){
    this.serviceService.getAll().subscribe(
     
      (resultat: any) => {
       this.services = resultat;
      },
      error => {
        console.log(error);
      }
    )
  }
  getMateriels(){
    this.materielService.getAll().subscribe(
     
      (resultat: any) => {
       this.materiels = resultat;
      },
      error => {
        console.log(error);
      }
    )
  }
  getAbonnements(){
    this.abonnementService.getAll().subscribe(
     
      (resultat: any) => {
       this.abonnements = resultat;
      },
      error => {
        console.log(error);
      }
    )
  }
  ngOnInit(){
    this.getSubscribers();
    this.getServices();
    this.getAbonnements();
    this.getMateriels();
  }

}
