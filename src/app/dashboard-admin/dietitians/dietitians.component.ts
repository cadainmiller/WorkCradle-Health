import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { DietitianService } from 'src/app/services/dietitian.service';

@Component({
  selector: 'app-dietitians',
  templateUrl: './dietitians.component.html',
  styleUrls: ['./dietitians.component.scss'],
})
export class DietitiansComponent implements OnInit {
  user: any;
  superAdminAccess: boolean;

  dietitianList = [];
  showPage = false;

  constructor(
    private dietitianService: DietitianService,
    private companyService: CompanyService
  ) {
    this.superAdminAccess = false;
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
    if (this.user) {
      if (this.user.isSuperAdmin) {
        this.superAdminAccess = this.user.isSuperAdmin;
        this.dietitianService.getDietitianAllOnly().subscribe((data) => {
          console.log('Dietitians', data);
          this.dietitianList = data;
          this.showPage = true;
        });
      } else if (!this.user.isSuperAdmin) {
        this.dietitianService
          .getDietitianByCompanyCodeOnly(this.user.companyCode)
          .subscribe((data) => {
            console.log('Dietitians', data);
            this.dietitianList = data;
            this.showPage = true;
          });
      }
    }
  }

  ngOnInit(): void {}
}
