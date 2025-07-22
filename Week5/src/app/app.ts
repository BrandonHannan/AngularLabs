import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('week5');
  constructor(private router: Router) {}
  logOut(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
