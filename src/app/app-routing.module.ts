import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainChatComponent } from './main-chat/main-chat.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'chat', component:MainChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
