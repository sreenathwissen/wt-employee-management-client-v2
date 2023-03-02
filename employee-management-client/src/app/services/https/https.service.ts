import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { apiList } from "./api-list";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpsService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private apiList: apiList) {}
  

  httpPost(url: string, params:any): Observable<Object> {
    // return this.http.post(this.baseUrl + this.apiList[url], params);
    return this.http.post(this.baseUrl + url, params);
  }

  httpPutWithHeader(url: string, params: any): Observable<Object> {
    // return this.http.put(this.baseUrl + this.apiList[url], params, this.header());
    return this.http.put(this.baseUrl + url, params, this.header());
  }

  httpPostWithHeader(url: string, params: any): Observable<Object> {
    // return this.http.post(this.baseUrl + this.apiList[url], params, this.header());
    return this.http.post(this.baseUrl + url, params, this.header());
  }

  httpGetWithHeader(url: string, params:any): Observable<Object> {
    // return this.http.get(this.baseUrl + this.apiList[url] + "?" + params, this.header());
    return this.http.get(this.baseUrl + url + (params?"?"+params:""), this.header());
  }

  httpGetWithHeaderId(url: string, params:any): Observable<Object> {
    // return this.http.get(this.baseUrl + this.apiList[url] + "/" + params, this.header());
    return this.http.get(this.baseUrl + url + "/" + params, this.header());
  }

  httpGet(url: string): Observable<Object> {
    // return this.http.get(this.baseUrl + this.apiList[url] + link);
    return this.http.get(this.baseUrl + url);
  }

  httpGetWithoutBase(url: string, link: string): Observable<Object> {
    // return this.http.get(this.baseUrl + this.apiList[url] + link);
    return this.http.get(url + link);
  }

  httpDeleteWithHeaderAndId(url: string, id:string, isFormData:boolean): Observable<Object> {
    // return this.http.delete(this.baseUrl + this.apiList[url] + "/" + id, this.header());
    return this.http.delete(this.baseUrl + url + "/" + id, this.header());
  }

  header() {
    // if (localStorage.getItem('accessToken') != undefined || localStorage.getItem('accessToken') != null) {
      const headers = new HttpHeaders({
        "cache-control": "no-cache",
        "content-type": "application/json",
        authorization: localStorage.getItem('accessToken') || '',
      });
      const option = {
        headers,
      };
      return option;
    // }
  }
}
