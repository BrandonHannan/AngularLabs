import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

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

  updateUser(){
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.router.navigateByUrl('/account');
  }

}
