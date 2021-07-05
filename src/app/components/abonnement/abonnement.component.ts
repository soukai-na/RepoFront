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

  constructor(private abonnementService: AbonnementService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  abonnements!: Abonnement[];
  abonnement!: Abonnement;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

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
    this.cols=[
      { field: "type", header: "Type" },    
      { field: "tarif", header: "Tarif" }, 
      { field: "type_forfait", header: "Type Forfait" }
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
