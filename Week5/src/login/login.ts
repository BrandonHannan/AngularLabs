import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  public username: string = '';
  public password: string = '';
  public errorMessage: string = ''
  private serverUrl = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const storedUserString = localStorage.getItem('loggedInUser');
    if (storedUserString) {
      const user = JSON.parse(storedUserString);
      if (user.valid){
        this.router.navigateByUrl("/account");
      }
    }
  }

  public checkLogin(){
    if (!this.username || !this.password){
      this.errorMessage = 'Invalid email or password';
      return;
    }

    const userpwd: any = {"username": this.username, "password": this.password};

    this.http.post<any>(this.serverUrl + '/api/auth', userpwd).subscribe({
      next: (response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        this.router.navigateByUrl("/account");
      },
      error: (err) => {
        this.errorMessage = "Invalid login credentials";
        localStorage.removeItem('loggedInUser');
      }
    });
  }
}
