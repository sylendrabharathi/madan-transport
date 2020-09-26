import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private userId = 'userId';
  private customerId = 'customerId';
  private userIns = 'userIns';

  constructor() { }

  setUserId(userId) {
    localStorage.setItem(this.userId, userId);
  }

  getUserId() {
    return localStorage.getItem(this.userId);
  }

  setCustomerId(customerId) {
    localStorage.setItem(this.customerId, customerId);
  }

  getCustomerId() {
    return localStorage.getItem(this.customerId);
  }

  setUserIns(userIns) {
    localStorage.setItem(this.userIns, userIns);
  }

  getUserIns() {
    return localStorage.getItem(this.userIns);
  }
}
