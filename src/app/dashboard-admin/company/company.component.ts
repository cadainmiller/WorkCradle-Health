import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  user: any;
  superAdminAccess: boolean;

  companyList = [];
  showPage = false;

  constructor(private companyService: CompanyService, private router: Router) {
    this.superAdminAccess = false;
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
    if (this.user) {
      if (this.user.isSuperAdmin) {
        this.companyService.getAllCompany().subscribe((data) => {
          this.superAdminAccess = this.user.isSuperAdmin;
          console.log('Companies', data);
          this.companyList = data;
          this.showPage = true;
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    }
  }

  ngOnInit(): void {}
}
