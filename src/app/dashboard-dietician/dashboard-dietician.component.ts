import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-dietician',
  templateUrl: './dashboard-dietician.component.html',
  styleUrls: ['./dashboard-dietician.component.scss'],
})
export class DashboardDieticianComponent implements OnInit {
  user: any;
  viewSidebar = false;
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

  showSideBar() {
    this.viewSidebar = !this.viewSidebar;
  }

  sidebarOff() {
    this.viewSidebar = false;
  }
}
