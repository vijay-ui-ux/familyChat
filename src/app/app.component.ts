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

  }


  

  /* ngOnDestroy() {
    if (this.socket$) {
      this.socket$.complete(); // Close WebSocket connection on component destroy
    }
  } */
}