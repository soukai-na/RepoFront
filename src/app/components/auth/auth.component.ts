import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  value: any;
  value2: any;
  username = 'admin'
  password = 'password'
  invalidLogin = false

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  checkLogin() {
    if (this.authService.authenticate(this.username, this.password)
    ) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }


}



