import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`{height:50vh}`]
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login().subscribe((resp) => {
      console.log(resp);
      if (resp.id) {
        this.router.navigate(['./heroes']);
      }
    });
  }
}
