import { Component, OnInit,OnDestroy } from '@angular/core';
import { GithttpService } from '../githttp.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnDestroy {
  
  starred: any;

  constructor(public blogHttpService:GithttpService, public router:Router,public spinner:NgxSpinnerService,private toastr:ToastrService) { 
    console.log("Star view working...")
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.userName = this.blogHttpService.getUserNameFromLocalStorage();
    this.blogHttpService.starred(this.userName).subscribe(starred=>{
      
      let html = "";
      if (starred.length == 0) {
        html += `
        <div class="col-md-12">
        <div class="list-group">
          <li class="list-group-item active">Stars</li>
          <li class="list-group-item">No Stars Available</li>
         
          </div>
        </div>`;
        
      }
      else{
      this.starred=starred;
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
    console.log("Star view destroyed...");
  }


}

