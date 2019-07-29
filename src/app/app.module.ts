import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { GithttpService } from './githttp.service';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryComponent } from './repository/repository.component';
import { FollowersComponent } from './followers/followers.component';
import { GistsComponent } from './gists/gists.component';
import { FollowingComponent } from './following/following.component';
import { StarsComponent } from './stars/stars.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RepositoryComponent,
    FollowersComponent,
    GistsComponent,
    FollowingComponent,
    StarsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot([
      {path:'user', component:UserComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login', component:LoginComponent},
      {path:'repo',component:RepositoryComponent},
      {path:'followers',component:FollowersComponent},
      {path:'gists',component:GistsComponent},
      {path:'following',component:FollowingComponent},
      {path:'stars',component:StarsComponent},
      {path:'search',component:SearchComponent}
    ])
  ],
  providers: [GithttpService,SearchService,ToastrModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
