import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithttpService } from '../githttp.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: any;
  password: any;

  constructor(public HttpService: GithttpService, public router: Router, public spinner: NgxSpinnerService, private toastr: ToastrService) {
    console.log("Login view working...")
   }

  login() {
    const username = this.username;
    const password = this.password;
    if (!username) {
      this.toastr.warning('ENTER USERNAME')
    }
    else if (!password) {
      this.toastr.warning('ENTER PASSWORD')
    } else
      if (username && password) {
        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.HttpService.setAuth(username, password);
        const user = this.HttpService.getAuth();
        user.getProfile((err, response) => {
          if (err) {
            this.toastr.warning('INVALID DETAILS!');
          } else {
            this.router.navigate(['/user']);
          }
        });
      }
      
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    console.log("Login view destroyed...")
  }

}
