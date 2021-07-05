import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { service_michoc } from 'src/app/model/service-michoc';
import { Subscriber } from 'src/app/model/subscriber';
import { ServiceMichocService } from 'src/app/service/service-michoc.service';
import { SubscriberService } from 'src/app/service/subscriber.service';


@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subscribers!: Subscriber[] ;
  subscriber!: Subscriber;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  services!:service_michoc[];
  selectedService:any;
  
  constructor(private subscriberService: SubscriberService,private serviceMichocService:ServiceMichocService, private messageService: MessageService, private confirmService: ConfirmationService)
   {

    this.services = [
      {id_service: 1, nom_service: 'rh', description:"service rh"},
      {id_service: 2, nom_service: 'Marketing', description:"service marketing"},
      {id_service: 3, nom_service: 'SI', description:"service si"}
  ];
   }




  getAll() {
    this.subscriberService.getAll().subscribe(
     
      (resultat: any) => {
       this.subscribers = resultat;
      },
      error => {
        console.log(error);
      }
    )

  }
 

  showSaveDialog(edit: boolean) {
    if (edit) {
      if (this.subscriber != null && this.subscriber.id_subscriber != null) {
        this.subscriber= this.subscriber;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un subscriebr s'il vous plait!" });
        return;
      }
    } else {
      this.subscriber = new Subscriber();
    }
    this.displaySaveDialog = true;
  }

  saveSubscriber() {
    this.subscriberService.saveSubscriber(this.subscriber).subscribe(
      (resultat: any) => {
        let subscriber = resultat as Subscriber;
        this.validerSubscriber(subscriber);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'subscriber inséré' });
        this.displaySaveDialog = false;
        console.log(this.selectedService.id_service);
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteSubscribers() {
    if (this.subscriber == null || this.subscriber.id_subscriber == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un subscriebr s'il vous plait!" });
      return;
    }
    this.confirmService.confirm({
      message: "Est-ce que vous voulez supprimez ce subscriber?",
      accept: () => {
        this.subscriberService.deleteSubscribers(this.subscriber.id_subscriber).subscribe(
          (resultat: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'subscriber ' + resultat.id_subscriber + ' supprimé' });
            return this.subscriberService.getAll();
          }
        )
      }
    })
  }




  deleteObjet(id_subscriber: number) {
    let index = this.subscribers.findIndex((e) => e.id_subscriber == id_subscriber);
    if (index != -1) {
      this.subscribers.splice(index, 1);
    }
  }
  validerSubscriber(subscriber: Subscriber) {
    let index = this.subscribers.findIndex((e) => e.id_subscriber == subscriber.id_subscriber);
    if (index != -1) {
      this.subscribers[index] = subscriber;
    } else {
      this.subscribers.push(subscriber);
    }
  }

  ngOnInit() {
    this.getAll();
    this.serviceMichocService.getAll();
    
    this.cols = [
      { field: "nom_subscriber", header: "Nom" },
      { field: "prenom_subscriber", header: "Prénom" },
      { field: "num_sim", header: "Numéro SIM" },
      { field: "fonction", header: "Fonction" },
      { field: "id_service", header: "Service" }
    ];
    this.items = [
      {
        label: "Nouveau",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false)
      },
      {
        label: "Editer",
        icon: 'pi pi-fw pi-pencil',
        command: () => this.showSaveDialog(true)
      },
      {
        label: "Eleminer",
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteSubscribers()
      }

    ]
  }

}
