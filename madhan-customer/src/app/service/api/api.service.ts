import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  delete(url) {
    return this.http.delete(this.baseURL + url);
  }

  formUrl(...urls): string {
    return urls.join(',');
  }

  getCities() {
    return this.get(this.formUrl('ReferenceList/GetRLByRName/?name=city'));
  }

  getStates() {
    return this.get(this.formUrl('ReferenceList/GetRLByRName/?name=state'));
  }

  getCountries() {
    return this.get(this.formUrl('ReferenceList/GetRLByRName/?name=country'));
  }

}
