import { Component, OnInit,OnDestroy } from '@angular/core';
import { GithttpService } from '../githttp.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit,OnDestroy {
  followers: any;

  constructor(private toastr:ToastrService,public blogHttpService:GithttpService, public router:Router,public spinner:NgxSpinnerService) { 
    console.log("Followers view working...")
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.userName = this.blogHttpService.getUserNameFromLocalStorage();
    this.blogHttpService.followers(this.userName).subscribe(followers=>{
      let html = "";
      if (followers.length == 0) {
        html += `
        <div class="col-md-12">
        <div class="list-group">
          <li class="list-group-item active">Followers</li>
          <li class="list-group-item">No Followers Available</li>
         
          </div>
        </div>`;
        
      }
      else{
      this.followers=followers;
    }
    document.getElementById("box").innerHTML = html;
  })
  }

  userName(userName: any) {
    throw new Error("Method not implemented.");
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
    console.log("Followers view destroyed...");
  }

}
