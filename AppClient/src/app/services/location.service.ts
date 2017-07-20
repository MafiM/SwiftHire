import { Injectable } from '@angular/core';
import $ from "jquery";

@Injectable()
export class LocationService {

  constructor() { }
  getLocation(zipcode) {
    console.log(zipcode)
    $.getJSON(`http://gomashup.com/json.php?fds=geo/usa/${zipcode}&jsoncallback=?`, function(result){
      console.log(result)
        return (result);
    });
    return null;
  }
}
