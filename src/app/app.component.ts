import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  username = 'Leandro'
  isLogged = false;
  
  constructor() {}
   
  ngOnInit(): void {
    const token = sessionStorage.getItem('user');
    if (token) {
      this.username = JSON.parse(token).name;
      this.isLogged = true;
    }
  }
}
