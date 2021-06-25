import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  user: any;
  constructor() {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
  }

  ngOnInit(): void {
    console.log(this.user);
  }
}
