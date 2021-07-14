import { Component, OnInit } from '@angular/core';
import { Historique } from 'src/app/model/historique';
import { materiel } from 'src/app/model/materiel';
import { HistoriqueService } from 'src/app/service/historique.service';
import { MaterielService } from 'src/app/service/materiel.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  historiques!:Historique[];
  historique!:Historique;
  materiels!:materiel[];
  materiel!:materiel;
  
  cols: any[] = [];
  constructor(private historiqueService:HistoriqueService,private materielService:MaterielService) { }

  getAll() {
    this.historiqueService.getAll().subscribe(

      (resultat: any) => {
        this.historiques = resultat;
      },
      error => {
        console.log(error);
      }
    )

  }

  getMateriel() {
    this.materielService.getAll().subscribe(

      (resultat: any) => {
        this.materiels = resultat;
      },
      error => {
        console.log(error);
      }
    )

  }

  ngOnInit(){
    this.getAll();
    this.getMateriel();

    this.cols = [
      { field: "id_action", header: "Action" },
      { field: "date_action", header: "Date action" },
      { field: "motif", header: "Motif" }
      
    ];
  }

}
