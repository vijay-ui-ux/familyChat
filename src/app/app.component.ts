import { Component, OnDestroy, OnInit  } from '@angular/core';
import { ApiService } from './api.service';


interface Message {
  text: string;
  timestamp: string;
  sender: string;
  receiver: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: Message[] = [];
  inputMessage: string = '';
  emailId: string = '';
  otp: string ='';
  constructor(private apiService: ApiService) {}

  ngOnInit() {

    this.apiService.getMessageUpdates().subscribe(
      (message: any) => {
        console.log(message, 'message')
        if(message.length) {
          this.messages = message
        }
        else {
          this.messages.push(message);
        }
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  sendMessage() {
    const message: Message = {
      text: this.inputMessage,
      timestamp: new Date().toISOString(),
      sender: 'user1',
      receiver: 'user2'
    };
    this.messages.push(message)
    // this.socket$.next(message);
    this.apiService.sendMessage(message);
    this.inputMessage = '';
  }

  emailVerification() {
    this.apiService.emailVerification({email: this.emailId}).subscribe(res => {
      console.log(res, "55::::")
    })
  }

  sendOtp() {
    let body = {
      email: this.emailId,
      enteredOTP: this.otp
    }
    this.apiService.sendOtp(body).subscribe(res => {
      // this.otpResponse = res;
      console.log(res, "otppppp");
    })
  }

  /* ngOnDestroy() {
    if (this.socket$) {
      this.socket$.complete(); // Close WebSocket connection on component destroy
    }
  } */
}