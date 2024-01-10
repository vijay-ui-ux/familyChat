import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

interface Message {
  text: string;
  timestamp: string;
  sender: string;
  receiver: string;
  senderemail: string;
  index?: number;
  receiveremail: string;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: Message[] = [];
  inputMessage: string = '';
  emailId: string = '';
  otp: string ='';
  userInfo: any = {};
  activeFriend: any = {};
  
  @Output() isBack = new EventEmitter<boolean>();
  constructor(private apiService: ApiService, private commonService: CommonService) {}

  ngOnInit() {

    this.commonService.activatedFriend$.subscribe(friend => {
      this.activeFriend = friend
      if(this.activeFriend) {
        let data = {
          senderemail: friend['email'],
          receiveremail: this.userInfo.email
        }
        this.commonService.showSpinner();
        this.messages = []
        this.apiService.setActiveChat(data).subscribe(chat => {
          this.commonService.hideSpinner();
          this.messages = chat.length ? chat[0].messages : [];
          console.log(chat, "chat")
        })
      }
    })

    this.userInfo = JSON.parse(localStorage.getItem('userInfo')) 
    // if(this.activeFriend && this.activeFriend.email) {
      this.apiService.getMessageUpdates().subscribe(
        (message: any) => {
          console.log(message, 'message')
          if(message.length >= 0) {
            this.messages = message
          }
          else if(message.senderemail === this.activeFriend.email) {
            this.messages.push(message);
          }
        },
        (error: any) => {
          console.error('WebSocket error:', error);
        }
      );
    // }
  }

  sendMessage() {
    const message: Message = {
      text: this.inputMessage,
      timestamp: new Date().toISOString(),
      sender: this.userInfo.userName,
      receiver: this.activeFriend.userName,
      senderemail: this.userInfo.email,
      receiveremail: this.activeFriend.email,
    };
    this.messages.push(message)
    // this.socket$.next(message);
    this.apiService.sendMessage(message);
    this.inputMessage = '';
  }

  backToList() {
    this.isBack.emit(true);
  }

  
}
