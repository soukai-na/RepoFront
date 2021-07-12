import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Facture } from 'src/app/model/facture';
import { FactureService } from 'src/app/service/facture.service';
import { ServiceMichocService } from 'src/app/service/service-michoc.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  factures!:Facture[];
  facture!:Facture;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;
  subscribers:any;
  subscriber:any;

  constructor(private factureService:FactureService,private serviceMichocService:ServiceMichocService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  getAll() {
    this.factureService.getAll().subscribe(
     
      (resultat: any) => {
       this.factures = resultat;
       console.log(resultat);
      },
      error => {
        console.log(error);
      }
    )

  }

  getSubscribers(){
    this.factureService.getSubscribers().subscribe(
      (result:any)=>{
        this.subscribers=result;
        console.log(result);
        console.log(result.id_subscriber);
      },
      error => {
        console.log(error);
      }

    )
  }

  showSaveDialog(edit: boolean) {
    if (edit) {
      if (this.facture != null && this.facture.id_facture != null) {
        this.facture= this.facture;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez une facture s'il vous plait!" });
        return;
      }
    } else {
      this.facture = new Facture();
    }
    this.displaySaveDialog = true;
  }


  saveFacture() {
    this.factureService.saveFacture(this.subscriber,this.facture).subscribe(
      (resultat: any) => {
        let facture = resultat as Facture;
        this.validerFacture(facture);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'facture inséré' });
        this.displaySaveDialog = false;
        console.log(this.subscriber);
        console.log(this.facture);
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteFactures() {
    if (this.facture == null || this.facture.id_facture == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez une facture s'il vous plait!" });
      return;
    }
    this.confirmService.confirm({
      message: "Est-ce que vous voulez supprimez cette facture?",
      accept: () => {
        this.factureService.deleteFactures(this.facture.id_facture).subscribe(
          (resultat: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'facture ' + resultat.id_facture + ' supprimé' });
            return this.factureService.getAll();
          }
        )
      }
    })
  }

  deleteObjet(id_facture: number) {
    let index = this.factures.findIndex((e) => e.id_facture == id_facture);
    if (index != -1) {
      this.factures.splice(index, 1);
    }
  }
  validerFacture(facture: Facture) {
    let index = this.factures.findIndex((e) => e.id_facture == facture.id_facture);
    if (index != -1) {
      this.factures[index] = facture;
    } else {
      this.factures.push(facture);
    }
  }



  ngOnInit(){
    this.getAll();
    this.getSubscribers();
    this.cols = [
      { field: "num_facture", header: "Num Facture" },
      { field: "date_facture", header: "Date Facture" },
      { field: "montant", header: "Montant" }
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
        command: () => this.deleteFactures()
      }

    ]


  }


}
