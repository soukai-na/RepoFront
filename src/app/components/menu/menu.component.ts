import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  

    items!: MenuItem[];
    constructor(
      private route: ActivatedRoute,
    ) {}
 
    

    ngOnInit() {
        this.items = [
          {label: 'Dashboard', icon: 'pi pi-fw pi-th-large', routerLink:['dashboard'] },
          {label: 'Service', icon: 'pi pi-fw pi-pencil'  , routerLink:['services']},
          {label: 'Subscribers', icon: 'pi pi-fw pi-user' , routerLink:['subscribers']},
          {label: 'Matériels', icon: 'pi pi-fw pi-folder-open'  , routerLink:['materiels'] },
          {label: 'Abonnements', icon: 'pi pi-fw pi-list' , routerLink:['abonnements'] },
          {label: 'Factures', icon: 'pi pi-fw pi-file' ,routerLink:['factures'] },
          {label: 'Historiques', icon: 'pi pi-fw pi-clock' ,routerLink:['historiques']  },      
        ];
    }
  }


