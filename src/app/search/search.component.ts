import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { GithttpService } from '../githttp.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
selector: 'app-search',
templateUrl: './search.component.html',
styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

public profile: object;
public repos: Object;
public follow: any;
public gists: any;
public datas: any[];

@Input() username: string;
name: any;
userDetails: any[];
data: Object;
counts: number;
constructor(private toastr: ToastrService, public bloghttp: SearchService, public blogHttpService: GithttpService,
public route: Router, public spinner: NgxSpinnerService) {
console.log("Search view working...");
this.spinner.show();
setTimeout(() => {
/** spinner ends after 5 seconds */
this.spinner.hide();
}, 1000);


}

searchvalue(username) {
this.spinner.show();
setTimeout(() => {
/** spinner ends after 5 seconds */
this.spinner.hide();
}, 1000);
this.bloghttp.setUserNameInLocalStorage(username);
this.bloghttp.updateProfile(username);
this.bloghttp.getProfileInfo().subscribe(profile => {
this.profile = profile;
});

this.bloghttp.getProfileRepos().subscribe((repos: any[]) => {

let html = "<div>";
  if (repos.length == 0) {
  html += `


  <li class="list-group-item" style="background-color: #343a40; color: white;">Repositories</li>
  <li class="list-group-item list-group-item-action">No Repositories Available</li>


  `;
  } else {
  this.repos = repos;
  }
  document.getElementById("reposss").innerHTML = html;
  });

  this.bloghttp.getFollowers().subscribe((follow: any[]) => {
  let html = "";
  if (follow.length == 0) {
  html += `


  <li class="list-group-item" style="background-color: #343a40; color: white;">Followers</li>
  <li class="list-group-item list-group-item-action">No Followers Available</li>


  `;
  } else {
  this.follow = follow;
  }
  document.getElementById("follow").innerHTML = html;
  })

  this.userDetails = [];
  this.bloghttp.getGist().subscribe(
  (data: any[]) => {
  //this.length=data.length;
  this.datas = data;
  this.counts = data.length;
  let html = "";
  if (data.length == 0) {
  html += `


  <li class="list-group-item" style="background-color: #343a40; color: white;">Gists</li>
  <li class="list-group-item list-group-item-action">No Gists Available</li>


  `;
  }
  else {
  this.data = data;
  }
  document.getElementById("box").innerHTML = html;
  })


  }
  logout() {
  this.spinner.show();
  setTimeout(() => {
  /** spinner ends after 5 seconds */
  this.spinner.hide();
  }, 1000);
  localStorage.clear();
  setTimeout(() => {
  this.route.navigate(['/login']);
  }, 1000);
  this.toastr.success("LogOut Successfull"), {
  timeOut: 1000
  };
  }
  ngOnInit() {


  }
  ngOnDestroy() {
  console.log("Search view destroyed...");
  }


  }
