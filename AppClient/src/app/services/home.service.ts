import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  private _userName: String
  constructor() { }
  setUserName(val: String) {
    this._userName = val
  }
  getUserName() {
    return this._userName
  }
}
