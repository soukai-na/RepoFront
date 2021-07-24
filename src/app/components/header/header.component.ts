import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  items!: MenuItem[];

  ngOnInit(){
    this.items = [
      {
        
        icon:'pi pi-fw pi-user',
        items:[
            {
                label:'Profile',
                icon:'pi pi-fw pi-user',
            },
            {
              label:'Logout',
              icon:'pi pi-fw pi-sign-out',
          },
    ]
  }
]

}
}
