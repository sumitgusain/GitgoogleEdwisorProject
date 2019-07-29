import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public url = "https://api.github.com/users/";
  public username:string;
  private clientId = '43e0a972c91f9242893f';
  private clientSecret = 'd491ab9aad747d2bc2c603fe23bb0d7c4daf4537';

  public setUserNameInLocalStorage = (username) =>{
    localStorage.setItem('userSearch', JSON.stringify(username))
   } 
   public getUserNameFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('userSearch'));
    }
 constructor(public http:HttpClient) {
   console.log("Service is ready to deploy!!")
 
  }
 
  public getProfileInfo(){
    return this.http.get("https://api.github.com/users/"+this.username+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret);
  }
 
  getProfileRepos(){
    return this.http.get("https://api.github.com/users/"+this.username+"/repos"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
 
  getFollowers(){
    return this.http.get("https://api.github.com/users/"+this.username+"/followers"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  
  getGist(){
    return this.http.get("https://api.github.com/users/"+this.username+"/gists"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
 
  updateProfile(username:string){
    this.username = username;
  }
 }
 