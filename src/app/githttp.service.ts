import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import GitHub from 'github-api';


@Injectable({
  providedIn: 'root'
})
export class GithttpService {
  getUserDetailsFromLocalStorage(): any {
    throw new Error("Method not implemented.");
  }
  public clientId = '176f23a4f898d3b545e8';
  public clientSecret = '6b91ba89df6b6c369c2c5eb0ce27625db11ca011';
  private username;
  private password;

  setAuth(username, password) {
    // tslint:disable-next-line:prefer-const
    this.username = username;
    this.password = password;
    localStorage.setItem('Newusername', JSON.stringify(this.username))
  }
  getAuth() {
    // tslint:disable-next-line:prefer-const
    let passwordAuth = new GitHub({
      username: this.username,
      password: this.password
    });
    return passwordAuth.getUser();
  }
 public getUserNameFromLocalStorage = () =>{
  return JSON.parse(localStorage.getItem('Newusername'));
  }
 public setUserInfoInLocalStorage = (data) =>{
   localStorage.setItem('UserDetails', JSON.stringify(data))
  }
  public setsearchvalueInLocalStorage = (data)=>{
    localStorage.setItem('userSearch', JSON.stringify(data))
  }
  public getsearchvalueFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('userSearch'));
    }
 public setreposInLocalStorage = (repos) =>{
   localStorage.setItem('repo', JSON.stringify(repos))
  }

 constructor(public _http:HttpClient) { }
  getUser() {
    // tslint:disable-next-line:max-line-length
    return this._http.get("https://api.github.com/users/"+this.username+"?client_id="+this.clientId+"&client_secret="+this.clientSecret);
  }

  public repos(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/repos"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  
  public profile(username): any{
    return this._http.get("https://api.github.com/users/"+username+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  public followers(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/followers"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  public usergists(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/gists"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }

  public searchProfile(username): any{
    return this._http.get("https://api.github.com/users/"+username+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  public searchFollowers(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/followers"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  public searchGists(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/gists"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  public following(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/following"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  public searchRepos(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/repos"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }
  public starred(username): any{
    return this._http.get("https://api.github.com/users/"+username+"/starred"+"?client_id="+this.clientId
    +"&client_secret="+this.clientSecret)
  }

}
