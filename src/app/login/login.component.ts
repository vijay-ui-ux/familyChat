import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailId: string = '';
  otp: string = '';
  validEmail: boolean = false;
  userName: string = '';
  isOtp: boolean = false;
  userSuccessMessage: string = '';

constructor(private apiService: ApiService, private commonService: CommonService, private router: Router ) {
}

  ngOnInit() {
    if(localStorage.getItem('userInfo')) {
      this.router.navigate(['chat'])
    }
  }
  emailVerification() {
    this.commonService.showSpinner();
    this.apiService.emailVerification({email: this.emailId}).subscribe(res => {
    this.commonService.hideSpinner();
    //  this.emailId = '';
   
      this.validEmail = true;

      console.log(res, "55::::")
    })
  }

  sendOtp() {
    let body = {
      email: this.emailId,
      enteredOTP: this.otp
    }
    this.commonService.showSpinner();
    this.apiService.sendOtp(body).subscribe(res => {
    this.commonService.hideSpinner();
    this.isOtp = res.success
    })
  }

  sendUser() {
    let body = {
      userName: this.userName,
      email: this.emailId
    }
    this.commonService.showSpinner();
    this.apiService.sendUser(body).subscribe(res => {
    this.commonService.hideSpinner();
    localStorage.setItem('userInfo', JSON.stringify(body))
    this.isOtp = res.success
    this.userSuccessMessage = res.message;
    this.router.navigate(['chat'])
    }, err => {
    this.commonService.hideSpinner();
      localStorage.setItem('userInfo', JSON.stringify(body))
      this.router.navigate(['chat'])
    })

  }
}
