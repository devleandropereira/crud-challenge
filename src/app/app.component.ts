import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public user = '';
  public isLogged = false;
  
  constructor(
    private router: Router
  ) {}
   
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.match('login')) {
          this.isLogged = false;
        } else {
          this.configuraCabecalho();
          this.isLogged = true;
        }
      }
    });
  }

  configuraCabecalho() {
    const token = sessionStorage.getItem('usuarioLogado');
    if (token) {
      this.user = JSON.parse(token).nome;
      this.isLogged = true;
    }
  }
  
}
