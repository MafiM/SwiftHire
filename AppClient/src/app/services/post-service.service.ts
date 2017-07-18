import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class PostServiceService {
  private postUrl = 'http://localhost:4000/api/posts/'
  
  constructor(private http: Http) { }
  
  retrieveAllPosts(){
    return this.http.get(this.postUrl)
  }

  //My own job post
  getAllUserPosts(username) {
    return this.http.get('http://localhost:4000/api/posts/' + username);
  }

  //My own activities
  getUserActivities(username) {
    return this.http.get('http://localhost:4000/api/posts/activities/' + username);
  }
}
