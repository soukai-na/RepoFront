import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { service_michoc } from 'src/app/model/service-michoc';
import { Subscriber } from 'src/app/model/subscriber';
import { MaterielService } from 'src/app/service/materiel.service';
import { ServiceMichocService } from 'src/app/service/service-michoc.service';
import { SubscriberService } from 'src/app/service/subscriber.service';


@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subscribers!: Subscriber[];
  subscriber!: Subscriber;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  displayInfo: boolean = false;
  services: any;
  service: any;
  abonnements: any;
  abonnement: any;
  detail:boolean=false;
  materiels:any;
  materiel:any;



  constructor(private subscriberService: SubscriberService, 
    private serviceMichocService: ServiceMichocService, 
    private materielService:MaterielService,
    private messageService: MessageService, 
    private confirmService: ConfirmationService) {
  }




  getAll() {
    this.subscriberService.getAll().subscribe(

      (resultat: any) => {
        this.subscribers = resultat;
        console.log(resultat);
      },
      error => {
        console.log(error);
      }
    )

  }

  displaySubscriber() {
    if (this.subscriber == null || this.subscriber.id_subscriber == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un subscriebr s'il vous plait!" });
      return;
    } else {
      this.subscriberService.getSubscriberById(this.subscriber.id_subscriber).subscribe(
        (resultt: any) => {
          this.subscriber = resultt;
          console.log(resultt);
          this.displayInfo = true;
        },
        error => {
          console.log(error);
        }
      )
    }
  }


  getServices() {
    this.subscriberService.getServices().subscribe(
      (result: any) => {
        this.services = result;
        console.log(result);
        console.log(result.id_service);
      },
      error => {
        console.log(error);
      }

    )
  }

  getAbonnements() {
    this.subscriberService.getAbonnements().subscribe(
      (data: any) => {
        this.abonnements = data;
        console.log(data);
        console.log(data.id_abonnement);
      },
      error => {
        console.log(error);
      }
    )
  }

  getMateriel(){
   // this.subscriberService.getMateriels(this.materiels.id_materiel).subscribe
  }

  showSaveDialog(edit: boolean) {
    if (edit) {
      if (this.subscriber != null && this.subscriber.id_subscriber != null) {
        this.subscriber = this.subscriber;
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
    this.subscriberService.saveSubscriber(this.service, this.subscriber).subscribe(
      (resultat: any) => {
        let subscriber = resultat as Subscriber;
        this.validerSubscriber(subscriber);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'subscriber inséré' });
        this.displaySaveDialog = false;
        console.log(this.service);
        console.log(this.subscriber);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveAbonnement() {
    this.subscriberService.saveAbonnement(this.subscriber.id_subscriber, this.abonnement, this.subscriber).subscribe(
      (donnees: any) => {
        let subscriber = donnees as Subscriber;
        this.validerSubscriber(subscriber);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'abonnment inséré' });
        this.displayInfo = false;
      }
    )
  }
  show() {
    
      this.subscriberService.getSubscriberById(this.subscriber.id_subscriber).subscribe(
        (resultt: any) => {
          this.subscriber = resultt;
          console.log(resultt);
          this.detail = true;
        },
        error => {
          console.log(error);
        }
      )
    
  }
  deleteSubscribers() {
    if (this.subscriber == null || this.subscriber.id_subscriber == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un subscriebr s'il vous plait!" });
      return;
    }
    this.confirmService.confirm({
      message: "Est-ce que vous voulez supprimez ce subscriber?",
      accept: () => {
        this.subscriberService.deleteSubscribers(this.subscriber.id_subscriber, this.subscriber.service.id_service).subscribe(
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
    this.getServices();
    this.getAbonnements();

    this.cols = [
      { field: "nom_subscriber", header: "Nom" },
      { field: "prenom_subscriber", header: "Prénom" },
      { field: "num_sim", header: "Numéro SIM" },
      { field: "fonction", header: "Fonction" }
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
      },
      {
        label: "Abonnement",
        icon: 'pi pi-fw pi-reply',
        command: () => this.displaySubscriber()
      }

    ]
  }

}
