import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/service/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private token: TokenStorageService) { }
  items!: MenuItem[];
  info: any;

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
              command: () => this.logout()
          },
    ]
  }
];

this.info = {
  token: this.token.getToken(),
  username: this.token.getUsername(),
  authorities: this.token.getAuthorities()
};

}

logout() {
  this.token.signOut();
  window.location.reload();
}

}
