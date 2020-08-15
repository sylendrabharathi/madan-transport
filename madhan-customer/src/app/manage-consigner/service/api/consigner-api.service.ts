import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ConsignerApiService {

  constructor(private api: ApiService) { }

  getConsigners(id) {
    return this.api.get(`Consigner/GetConsignerByCustometID/?custid=${id}`);
  }
}
