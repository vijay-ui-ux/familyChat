import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  friendsList: any[] = [];
  userInfo: any = {};
  activeIndex: any = -1;
  @Input() changed: boolean = false;
  constructor(private apiService: ApiService, private commonService: CommonService) {}

ngOnInit() {
  this.commonService.showSpinner();
  this.apiService.getFriendsList().subscribe(friends => {
    this.commonService.hideSpinner();
    this.friendsList = friends
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.friendsList = this.friendsList.filter(friend => {
      return friend.email !== this.userInfo.email;
    })
    // this.commonService.activeFriend(this.friendsList[0]);
}) 
}


activeFriend(friend,i) {
  this.activeIndex = i;
  this.commonService.activeFriend(friend);
  
}


}
