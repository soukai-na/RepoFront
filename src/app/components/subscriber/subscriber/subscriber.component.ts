import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscriber } from 'src/app/model/subscriber';
import { SubscriberService } from 'src/app/service/subscriber.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {
  constructor(private subscriberService: SubscriberService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  subscribers!: Subscriber[] ;
  subscriber!: Subscriber;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  

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
      if (this.subscriber != null && this.subscriber.id_sub != null) {
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
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteSubscribers() {
    if (this.subscriber == null || this.subscriber.id_sub == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un subscriebr s'il vous plait!" });
      return;
    }
    this.confirmService.confirm({
      message: "Est-ce que vous voulez supprimez ce subscriber?",
      accept: () => {
        this.subscriberService.deleteSubscribers(this.subscriber.id_sub).subscribe(
          (resultat: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'subscriber ' + resultat.id_sub + ' supprimé' });
            return this.subscriberService.getAll();
          }
        )
      }
    })
  }




  deleteObjet(id_sub: number) {
    let index = this.subscribers.findIndex((e) => e.id_sub == id_sub);
    if (index != -1) {
      this.subscribers.splice(index, 1);
    }
  }
  validerSubscriber(subscriber: Subscriber) {
    let index = this.subscribers.findIndex((e) => e.id_sub == subscriber.id_sub);
    if (index != -1) {
      this.subscribers[index] = subscriber;
    } else {
      this.subscribers.push(subscriber);
    }
  }

  ngOnInit() {
    this.getAll();
    this.cols = [
      { field: "nom_sub", header: "Nom" },
      { field: "prenom_sub", header: "Prénom" },
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
      }

    ]
  }

}
