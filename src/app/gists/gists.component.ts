import { Component, OnInit,OnDestroy } from '@angular/core';
import { GithttpService } from '../githttp.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gists',
  templateUrl: './gists.component.html',
  styleUrls: ['./gists.component.css']
})
export class GistsComponent implements OnInit,OnDestroy {
  gists: any;
  userName: any;
  userDetails: any[];

  constructor(public blogHttpService: GithttpService, public router: Router,public spinner:NgxSpinnerService,private toastr:ToastrService) { 
    console.log("Gist view working...")
  }


  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.userDetails = [];
    this.userName = this.blogHttpService.getUserNameFromLocalStorage();
    this.blogHttpService.profile(this.userName).subscribe(
      data => {
        this.userDetails.push(data);
      },
      error => {
        this.toastr.warning("Something went wrong!");
      }
    )

    this.blogHttpService.usergists(this.userName).subscribe(

      data => {
        let html = "<table>";
        if (data.length == 0) {
          html += `
          <li class="list-group-item">Gist Bucket Empty</li>
          `;
          document.getElementById("box").innerHTML = html;

        }
        else {


          let gistDetail;
          gistDetail = data;
          let little = [];
          let html = "<div>"

          for (let i = 0; i < gistDetail.length; i++) {
            let keyName = "fileName";
            let keyValue = "url";
            let obj = {};
            obj[keyName] = Object.keys(gistDetail[i].files);
            obj[keyValue] = (gistDetail[i].html_url);
            little.push(obj);
          }
          for (let j = 0; j < little.length; j++) {
            html += `
            <li class="list-group-item"><i class="fa fa-file-code-o"></i> ${little[j].fileName}<a href="${little[j].url}" class="btn btn-sm btn-warning float-right">View</a></li>
            `;
           }

          document.getElementById("box").innerHTML = html;
          }
        },
      error => {
       
        this.toastr.warning("Something went wrong!");

      })
  }
  logout(){
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
   }
   ngOnDestroy(){
    console.log("Gist View destroyed...");
  }
}
