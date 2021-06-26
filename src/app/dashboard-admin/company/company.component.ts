import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  crateCompanyForm: FormGroup;

  message = '';
  companyCreated = false;
  companyNotCreated = false;

  companyList = [];
  showPage = false;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.superAdminAccess = false;
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
    if (this.user) {
      this.buildForm();
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

  get companyControls() {
    return this.crateCompanyForm.controls;
  }

  private buildForm(): void {
    this.crateCompanyForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      companyType: ['Health'],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        zip: [''],
      }),
      userInfo: this.fb.group({
        userName: ['', [Validators.required]],
        userEmail: ['', [Validators.required]],
        userPhone: ['', [Validators.required]],
        userPassword: ['', [Validators.required]],
      }),
    });
  }

  createCompany() {
    if (this.crateCompanyForm.valid) {
      const company = this.crateCompanyForm.value;
      this.companyService.createCompany(company).subscribe(
        (data) => {
          console.log('Created Appointment', data);
          this.companyList.unshift(data);
          this.crateCompanyForm.reset();
          this.message = `Company Was Created Successfully`;
          this.companyCreated = true;
          setTimeout(() => {
            this.companyCreated = false;
          }, 3000);
        },
        (error) => {
          this.companyNotCreated = true;
          this.message = error.error.message
            ? error.error.message
            : 'Please Review And Try Again';
          setTimeout(() => {
            this.companyNotCreated = false;
          }, 3000);
        }
      );
    }
  }
}
