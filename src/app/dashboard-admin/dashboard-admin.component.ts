import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  user: any;
  constructor(private router: Router) {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem('Token');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('User');
    this.router.navigate(['/']);
  }
}
