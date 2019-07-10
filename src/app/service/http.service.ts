import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public restServer:any;
  public http:any;

  constructor(Http: HttpClient) {
    this.http = Http;
    this.restServer = '/apidata/';
  }

  public get(url:string, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('get开始请求');
    const vm = this;
    if (params) {
      params['token'] = ''; // token传值
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.get(vm.restServer + url, {params: httpParams})
      .subscribe(data => {
        console.log('get请求结束', data);
        cb(data);
      });
  }

  public post(url:string, data?: Object, cb?: Function, options?: Object) {
    console.log('post开始请求');
    const vm = this;
    vm.http.post(vm.restServer + url, data, options)
      .subscribe(res => {
        console.log('post请求结束', res);
        cb(res);
      });
  }

  public put(url:string, data?: Object, cb?: Function, options?: Object) {
    console.log('put开始请求');
    const vm = this;
    vm.http.put(vm.restServer + url, data, options)
      .subscribe(res => {
        console.log('put请求结束', res);
        cb(res);
      });
  }

  public delete(url:string, params?: Object, cb?: Function) {
    let httpParams = new HttpParams();
    console.log('delete开始请求');
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    vm.http.delete(vm.restServer + url, {params: httpParams})
      .subscribe(data => {
        console.log('delete请求结束', data);
        cb(data);
      });
  }
}
