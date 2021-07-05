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
          {label: 'Dashboard', icon: 'pi pi-fw pi-th-large' },
          {label: 'Subscribers', icon: 'pi pi-fw pi-user' , routerLink:['AllSubscribers']},
          {label: 'Service', icon: 'pi pi-fw pi-pencil'  , routerLink:['AllServices'] },
          {label: 'Factures', icon: 'pi pi-fw pi-file'  },
          {label: 'Abonnements', icon: 'pi pi-fw pi-list' , routerLink:['AllAbonnements'] },
          {label: 'Matériels', icon: 'pi pi-fw pi-folder-open'  , routerLink:['AllMateriels'] },
          {label: 'Historiques', icon: 'pi pi-fw pi-clock'  },      
        ];
    }
  }


