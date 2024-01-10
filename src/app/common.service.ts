import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  activatedFriend = new BehaviorSubject({});
  activatedFriend$ = this.activatedFriend.asObservable();
  constructor(public spinner: NgxSpinnerService) { }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  activeFriend(friend) {
    this.activatedFriend.next(friend);
  }
}
