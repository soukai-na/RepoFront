import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { service_michoc } from 'src/app/model/service-michoc';
import { Subscriber } from 'src/app/model/subscriber';
import { ServiceMichocService } from 'src/app/service/service-michoc.service';

@Component({
  selector: 'app-service-michoc',
  templateUrl: './service-michoc.component.html',
  styleUrls: ['./service-michoc.component.css']
})
export class ServiceMichocComponent implements OnInit {
  subscriber!: Subscriber;

  constructor(private serviceMichocService: ServiceMichocService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  servicesMichoc!: service_michoc[];
  serviceMichoc!: service_michoc;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;


  getAll() {
    this.serviceMichocService.getAll().subscribe(
      (resultat: any) => {
        this.servicesMichoc = resultat;
      },
      error => {
        console.log(error);
      }
    )
  }


  showSaveDialog(edit: boolean) {
    if (edit) {
      if (this.serviceMichoc != null && this.serviceMichoc.id_service != null) {
        this.serviceMichoc = this.serviceMichoc;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un service s'il vous plait!" });
        return;
      }
    } else {
      this.serviceMichoc = new service_michoc();
    }
    this.displaySaveDialog = true;
  }



  saveService() {
    this.serviceMichocService.saveService(this.serviceMichoc).subscribe(
      (resultat: any) => {
        let serviceMichoc = resultat as service_michoc;
        this.validerService(serviceMichoc);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'service inséré' });
        this.displaySaveDialog = false;
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteServices() {
    if (this.serviceMichoc == null || this.serviceMichoc.id_service == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un service s'il vous plait!" });
      return;
    }
    this.confirmService.confirm({
      message: "Est-ce que vous voulez supprimez ce service?",
      accept: () => {
        this.serviceMichocService.deleteService(this.serviceMichoc.id_service).subscribe(
          (resultat: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'service ' + resultat.id_service + ' supprimé' });
            return this.serviceMichocService.getAll();
          }
        )
      }
    })
  }


  deleteObjet(id_service:number){
    let index= this.servicesMichoc.findIndex((e)=>e.id_service == id_service);
    if(index != -1){
      this.servicesMichoc.splice(index,1);
    }
  }

  validerService(serviceMichoc: service_michoc){
    let index = this.servicesMichoc.findIndex((e)=>e.id_service== serviceMichoc.id_service);
    if(index != -1){
      this.servicesMichoc[index]=serviceMichoc;
    }else{
      this.servicesMichoc.push(serviceMichoc);
    }
  }

  ngOnInit() {
    this.getAll();
    this.cols=[
      { field: "nom_service", header: "Nom Service" },
      { field: "description", header: "Description" }
    ];
    this.items=[
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
        command: () => this.deleteServices()
      }
    ]
  }
  

}
