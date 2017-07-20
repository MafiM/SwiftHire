import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  private _userName: String
  private _currentPost

  constructor() { }
  setUserName(val: String) {
    this._userName = val
  }
  getUserName() {
    return this._userName
  }
  setCurrentPost(val: String) { 
    this._currentPost = val;console.log('setting: '+this._currentPost)
  }
  getCurrentPost() {console.log('getting: '+this._currentPost)
    return this._currentPost
  }
}
