import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DriverInOutApiService {

  constructor(private api: ApiService) { }
}
