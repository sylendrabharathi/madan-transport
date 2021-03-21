import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = environment.serverUrl;
  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(this.baseURL + url);
  }

  post(url, req) {
    return this.http.post(this.baseURL + url, req);
  }

  put(url, req) {
    return this.http.put(this.baseURL + url, req);
  }

  delete(url, req) {
    return this.http.delete(this.baseURL + url, req);
  }

  formUrl(...urls): string {
    return urls.join('/');
  }
  getGstData(gstNo) {
    console.log('https://appyflow.in/api/verifyGST/?gstNo=' + gstNo + '&key_secret=mqDMTdJpfIU6qpmfyQWp5qMOxbm2');

    return this.http.get('https://appyflow.in/api/verifyGST/?gstNo=' + gstNo + '&key_secret=mqDMTdJpfIU6qpmfyQWp5qMOxbm2');
  }

}
