import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileApiService {

  constructor(private api: ApiService) { }

  getProfileData(userId) {
    return this.api.get(this.api.formUrl('User', userId));
  }
}
