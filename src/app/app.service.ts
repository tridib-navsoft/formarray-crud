import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public getUserInfoFromLocalStorage: any = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage: any = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

}
