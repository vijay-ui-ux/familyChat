import { Component, SimpleChange } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {
friendsList: any[] = [];
activeFriend: any = {};
  isChange: boolean = false;

constructor(private apiService: ApiService, private commonService: CommonService) {}

ngOnInit() {
 /*  this.apiService.getFriendsList().subscribe(friends => {
      this.friendsList = friends
  })  */
  this.commonService.activatedFriend$.subscribe(friend => {
  
    this.activeFriend = JSON.parse(JSON.stringify(friend));
    console.log(friend, "24::::")
    if(Object.keys(friend).length)
    this.isChange = true;
  
  })
}

ngOnChanges(changes: SimpleChange) {
  console.log(changes, "21")
}

isBack(event) {
  this.isChange = false;

}

}
