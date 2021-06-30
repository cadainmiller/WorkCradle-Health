import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';
import { DietitianService } from 'src/app/services/dietitian.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-admin-create-view',
  templateUrl: './admin-create-view.component.html',
  styleUrls: ['./admin-create-view.component.scss'],
})
export class AdminCreateViewComponent implements OnInit {
  adminList = [];
  companiesList = [];

  showPage = false;
  superAdminAccess = false;
  adminCreated = false;
  hasError = false;
  hasErrorMessage = '';

  closeResult: string;
  user: any;

  createAdminForm: FormGroup;

  get createAdminControls() {
    return this.createAdminForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private companyService: CompanyService
  ) {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);

    if (this.user) {
      this.buildForm(this.user);
      if (this.user.isSuperAdmin) {
        this.superAdminAccess = this.user.isSuperAdmin;
        this.companyService.getAllCompany().subscribe((data) => {
          console.log('Companies', data);
          this.companiesList = data;
        });
        this.adminService.getAdminAllOnly().subscribe((data) => {
          console.log('Admins', data);
          this.adminList = data;
          this.showPage = true;
        });
      } else if (!this.user.isSuperAdmin) {
        this.adminService
          .getUserAdminByCompanyCode(this.user.companyCode)
          .subscribe((data) => {
            console.log('Admins', data);
            this.adminList = data;
            this.showPage = true;
          });
      }
    }
  }

  ngOnInit(): void {}

  changeCompany(companyCode) {
    this.createAdminForm.patchValue({
      companyCode: companyCode,
    });
  }

  copyPassword() {
    const admin = this.createAdminForm.value;
    if (admin.password != '') {
      this.createAdminForm.patchValue({
        confirmPassword: admin.password,
      });
    }
  }

  createAdmin() {
    if (this.createAdminForm.valid) {
      const admin = this.createAdminForm.value;
      this.adminService.createUser(admin).subscribe(
        (data) => {
          console.log('Created Admin', data);
          this.adminList.push(data);
          this.createAdminForm.reset();
          this.createAdminForm.patchValue({
            companyCode: this.user.companyCode,
          });
          this.adminCreated = true;
          setTimeout(() => {
            this.adminCreated = false;
            this.hasError = false;
          }, 3000);
        },
        (error) => {
          this.hasError = true;
          this.hasErrorMessage = error.error.message;
          setTimeout(() => {
            this.hasError = false;
          }, 3000);
        }
      );
    }
  }

  private buildForm(user: any): void {
    this.createAdminForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      companyCode: [user.companyCode, [Validators.required]],
      role: ['admin'],
      isEmailVerified: [true],
      isSuperAdmin: [false],
    });
  }
}
