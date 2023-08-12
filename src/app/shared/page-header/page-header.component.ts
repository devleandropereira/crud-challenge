import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input() user = '';
  @Output() logout = new EventEmitter();
  sessionTimer: NodeJS.Timeout;

  constructor(
    private router: Router
  ) {
    this.sessionTimer = setTimeout(() => this.sair(), 600000);
  }
  
  sair() {
    sessionStorage.clear();
    clearInterval(this.sessionTimer);
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    clearInterval(this.sessionTimer);
  }

}
