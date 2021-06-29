import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscriber } from 'src/app/model/subscriber';
import { SubscriberService } from 'src/app/service/subscriber.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subscribers: Subscriber[] = [];
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  subscriber: Subscriber={
    id_sub:null as any,
    nom_sub:null as any,
    prenom_sub:null as any,
    num_sim:null as any,
    fonction:null as any
  };



  constructor(private subscriberService: SubscriberService) { }

  getAll() {
    this.subscriberService.getAll().subscribe(
      (resultat: any) => {
        let subscribers: Subscriber[] = [];
        for (let i = 0; i < resultat.length; i++) {
          let subscriber = resultat[i] as Subscriber;
          this.subscribers.push(subscriber);
        }
        this.subscribers = subscribers;
      },
      error => {
        console.log(error);
      }
    )

  }
  showSaveDialog() {
    this.displaySaveDialog = true;
  }

  saveSubscriber() {
    this.subscriberService.saveSubscriber(this.subscriber).subscribe(
      (resultat: any) => {
           let subscriber = resultat as Subscriber;
           this.subscribers.push(subscriber);
      },
      error => {
        console.log(error);
      }
    );
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
        command: () => this.showSaveDialog()
      },
      {
        label: "Editer",
        icon: 'pi pi-fw pi-pencil'
      }

    ]
  }

}
