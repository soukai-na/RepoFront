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
          {label: 'Dashboard', icon: 'pi pi-fw pi-th-large', id:'1' },
          {label: 'Subscribers', icon: 'pi pi-fw pi-user' , routerLink:'AllSubscribers',id:'2'},
          {label: 'Service', icon: 'pi pi-fw pi-pencil' , id:'3' },
          {label: 'Factures', icon: 'pi pi-fw pi-file' , id:'4' },
          {label: 'Abonnements', icon: 'pi pi-fw pi-list' , id:'5' },
          {label: 'Matériels', icon: 'pi pi-fw pi-folder-open' , id:'6' }
        ];
    }
  }


