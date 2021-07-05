import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { materiel } from 'src/app/model/materiel';
import { MaterielService } from 'src/app/service/materiel.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  constructor(private materielService:MaterielService,  private messageService: MessageService, private confirmService: ConfirmationService) { }

  materiels!:materiel[];
  materiel!:materiel;
  cols: any[] = [];
  items: MenuItem[] = [];
  displaySaveDialog: boolean = false;

  getAll() {
    this.materielService.getAll().subscribe(
     
      (resultat: any) => {
       this.materiels = resultat;
      },
      error => {
        console.log(error);
      }
    )

  }

  showSaveDialog(edit: boolean) {
    if (edit) {
      if (this.materiel != null && this.materiel.id_materiel != null) {
        this.materiel= this.materiel;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un materiel s'il vous plait!" });
        return;
      }
    } else {
      this.materiel = new materiel();
    }
    this.displaySaveDialog = true;
  }
  saveMateriel() {
    this.materielService.saveMateriel(this.materiel).subscribe(
      (resultat: any) => {
        let materiel = resultat as materiel;
        this.validerMateriel(materiel);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'materiel inséré' });
        this.displaySaveDialog = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteMateriels() {
    if (this.materiel == null || this.materiel.id_materiel == null) {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "séléctionnez un materiel s'il vous plait!" });
      return;
    }
    this.confirmService.confirm({
      message: "Est-ce que vous voulez supprimez ce materiel?",
      accept: () => {
        this.materielService.deleteMateriels(this.materiel.id_materiel).subscribe(
          (resultat: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'materiel ' + resultat.id_materiel + ' supprimé' });
            return this.materielService.getAll();
          }
        )
      }
    })
  }

  deleteObjet(id_materiel: number) {
    let index = this.materiels.findIndex((e) => e.id_materiel == id_materiel);
    if (index != -1) {
      this.materiels.splice(index, 1);
    }
  }

  validerMateriel(materiel: materiel) {
    let index = this.materiels.findIndex((e) => e.id_materiel == materiel.id_materiel);
    if (index != -1) {
      this.materiels[index] = materiel;
    } else {
      this.materiels.push(materiel);
    }
  }


  

  ngOnInit()
  {
    this.getAll();
    this.cols=[
      { field: "serial_number", header: "Nombre serial" },
      { field: "nom", header: "Nom" },
      { field: "model", header: "Modle" },
      { field: "description", header: "Description" },
      { field: "type", header: "Type" }
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
        command: () => this.deleteMateriels()
      }

    ]
  }

}
