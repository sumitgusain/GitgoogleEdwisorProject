import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithttpService } from '../githttp.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit, OnDestroy {
  userName: any;
  repos: any;

  constructor(public blogHttpService: GithttpService, public router: Router, public spinner: NgxSpinnerService, private toastr: ToastrService) {
    console.log("Repository view working...")
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.userName = this.blogHttpService.getUserNameFromLocalStorage();
    this.blogHttpService.repos(this.userName).subscribe(repos => {
      let html = "";
      if (repos.length == 0) {
        html += `
        <div class="col-md-12">
        <div class="list-group">
        <li class="list-group-item active">Repositories</li>
        <li class="list-group-item">No Repositories Available</li>
        </div>
        </div>
        `
      }
      else {
        this.repos = repos;
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
      this.router.navigate(['/login']);
    }, 1000);
    this.toastr.success("LogOut Successfull"), {
      timeOut: 1000
    };
    error => {

      this.toastr.error("Something Went Wrong!");
    }
  }


  ngOnDestroy() {
    console.log("Repository view destroyed...");
  }

}
