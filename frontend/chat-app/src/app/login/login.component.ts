import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
name:string | undefined;
  constructor(private router: Router) { }
sendDataToChat() {
  this.router.navigate(['/chat-app'], { queryParams: { data: JSON.stringify(this.name) } });
}

}
