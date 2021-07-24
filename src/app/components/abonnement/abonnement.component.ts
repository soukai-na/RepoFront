import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Abonnement } from 'src/app/model/abonnement';
import { AbonnementService } from 'src/app/service/abonnement.service';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent implements OnInit {

  constructor(private abonnementService: AbonnementService, private messageService: MessageService, private confirmService: ConfirmationService) 
  {
    this.Tarifs=[
      {id:1,name:"Forfait optimis plafonné"},
      {id:2,name:"Forfait optimis 30H + 15Go"},
      {id:3,name:"Forfait intra-entreprise"},
      {id:4,name:"Abonnement internet mobile"}
    ];
    this.Types_forfait=[
      {id:1,name:"30H"},
      {id:2,name:"30H +15Go"},
      {id:3,name:"Forfait 5H + 5Go"},
      {id:4,name:"modem"}
    ];
    this.Soldes=[
      {id:1,name:"GSM"},
      {id:2,name:"DATA"}
    ];

   }

  abonnements!: Abonnement[];
  abonnement!: Abonnement;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

  selectedTarif!:string;
  Tarifs:any[]=[];
  selectedType!:string;
  Types_forfait:any[]=[];
  selectedSolde!:string;
  Soldes:any[]=[];

  /*
  Tarifs:string[]=["Forfait optimis plafonné","Forfait optimis 30H + 15Go","Forfait intra-entreprise","Abonnement internet mobile"];
  Types_forfait:string[]=["30 H","30H +15Go","Forfait 5H + 5Go","modem"];
  Soldes:string[]=["DATA","GSM"];
*/
  getAll() {
    this.abonnementService.getAll().subscribe(
     
      (resultat: any) => {
       this.abonnements = resultat;
      },
      error => {
        console.log(error);
      }
    )

  }


  showSaveDialog(edit: boolean) {
    if (edit) {
      if (this.abonnement != null && this.abonnement.id_abonnement != null) {
        this.abonnement= this.abonnement;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un abonnement s'il vous plait!" });
        return;
      }
    } else {
      this.abonnement = new Abonnement();
    }
    this.displaySaveDialog = true;
  }

  saveAbonnement() {
    this.abonnementService.saveAbonnement(this.abonnement).subscribe(
      (resultat: any) => {
        let abonnement = resultat as Abonnement;
        this.validerAbonnement(abonnement);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Abonnement inséré' });
        this.displaySaveDialog = false;
        console.log(resultat);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteAbonnements() {
    if (this.abonnement == null || this.abonnement.id_abonnement == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez une abonnement s'il vous plait!" });
      return;
    }
    this.confirmService.confirm({
      message: "Est-ce que vous voulez supprimez cette abonnement?",
      accept: () => {
        this.abonnementService.deleteAbonnements(this.abonnement.id_abonnement).subscribe(
          (resultat: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'abonnement ' + resultat.id_abonnement + ' supprimé' });
            return this.abonnementService.getAll();
          }
        )
      }
    })
  }

  deleteObjet(id_abonnement: number) {
    let index = this.abonnements.findIndex((e) => e.id_abonnement == id_abonnement);
    if (index != -1) {
      this.abonnements.splice(index, 1);
    }
  }

  validerAbonnement(abonnement: Abonnement) {
    let index = this.abonnements.findIndex((e) => e.id_abonnement == abonnement.id_abonnement);
    if (index != -1) {
      this.abonnements[index] = abonnement;
    } else {
      this.abonnements.push(abonnement);
    }
  }

  
  ngOnInit() {
    this.getAll();
    this.Tarifs;
    this.Types_forfait;
    this.Soldes;
    this.cols=[
      { field: "tarif", header: "Tarif" },    
      { field: "type_forfait", header: "Type forfait" }, 
      { field: "solde", header: "Solde" }
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
        command: () => this.deleteAbonnements()
      }

    ]
  }

}
