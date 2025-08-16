import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [CommonModule, FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit{
  public user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUserString = localStorage.getItem('loggedInUser');
    if (storedUserString) {
      this.user = JSON.parse(storedUserString);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
}
