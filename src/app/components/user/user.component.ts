import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/auth/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board!: string;
  errorMessage!: string;
  info: any;
 
 
  constructor(private userService: UserService, private token: TokenStorageService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );

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
