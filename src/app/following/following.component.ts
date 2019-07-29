import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithttpService } from '../githttp.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit,OnDestroy {
  userName: any;
  following: any;

  constructor(private toastr:ToastrService,public blogHttpService:GithttpService, public router:Router,public spinner:NgxSpinnerService) {
    console.log("Following view working...")
   }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.userName = this.blogHttpService.getUserNameFromLocalStorage();
    this.blogHttpService.following(this.userName).subscribe(following=>{
      let html = "";
      if (following.length == 0) {
        html += `
        <div class="col-md-12">
        <div class="list-group">
          <li class="list-group-item active">Following</li>
          <li class="list-group-item">You Follow None</li>
        </div>
        </div>`;
        
      }
      else{
      this.following=following;
    }
    document.getElementById("box").innerHTML = html;
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
    console.log("Following view destroyed...");
  }

}


