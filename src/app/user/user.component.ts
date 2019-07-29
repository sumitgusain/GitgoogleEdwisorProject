import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithttpService } from '../githttp.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  userName: any;
  repos: any;
  followers: any;
  gists: any;
  profile: any;
  star: any[];
  counts: number;

  constructor(public blogHttpService: GithttpService, public router: Router, public spinner: NgxSpinnerService, private toastr: ToastrService) {
    console.log("User View Working....");
    //this.toastr.success("LogIn Successful!!")
  }


  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.toastr.success("LOGIN SUCCESSFUL"), {
      timeOut: 1000
    };
    this.userName = this.blogHttpService.getUserNameFromLocalStorage();

    this.blogHttpService.profile(this.userName).subscribe(profile => {
      this.blogHttpService.setUserInfoInLocalStorage(profile);
      this.profile = profile;
    })

    this.blogHttpService.repos(this.userName).subscribe(repos => {
      this.repos = repos;
    })

    this.blogHttpService.followers(this.userName).subscribe(followers => {
      this.followers = followers;
    })

    this.blogHttpService.usergists(this.userName).subscribe(gists => {
      this.gists = gists;
    })
    this.blogHttpService.starred(this.userName).subscribe((star: any[]) => {
      this.counts = star.length;
      this.star = star;
    })
  }
  logout() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    localStorage.clear();
    Cookie.delete('authtoken');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
    this.toastr.success("LOGOUT SUCCESSFUL"), {
      timeOut: 1000
    };
  }
  ngOnDestroy() {
    console.log("User View Destroyed...")
  }
}
