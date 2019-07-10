import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class CommonService {
  public userInfo: any = [];
  public domain: string = 'http://appadmin.com/';
  public domainImg: string = 'http://appadmin.com/uploads/';
  constructor(
  ) {}

}
