import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { DietitianService } from 'src/app/services/dietitian.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-dietitians-create',
  templateUrl: './dietitians-create.component.html',
  styleUrls: ['./dietitians-create.component.scss'],
})
export class DietitiansCreateComponent implements OnInit {
  dietitianForm: FormGroup;
  user: any;
  dietitianCreated: boolean;
  superAdminAccess: boolean;
  companyNotSelected: boolean;

  companiesList = [];

  hasError = false;
  hasErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dietitianService: DietitianService,
    private companyService: CompanyService
  ) {
    this.dietitianCreated = false;
    this.superAdminAccess = false;
    this.companyNotSelected = true;
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
    if (this.user.isSuperAdmin) {
      this.superAdminAccess = this.user.isSuperAdmin;
      this.companyService.getAllCompany().subscribe((data) => {
        console.log('Companies', data);
        this.companiesList = data;
      });
    }

    this.buildForm(this.user);
  }

  ngOnInit(): void {}

  addCompanyCode(companyCode) {
    this.companyNotSelected = false;
    this.dietitianForm.patchValue({
      companyCode: companyCode,
    });
  }

  copyPassword() {
    const dietitian = this.dietitianForm.value;
    if (dietitian.password != '') {
      this.dietitianForm.patchValue({
        confirmPassword: dietitian.password,
      });
    }
  }

  createDietitian() {
    if (this.dietitianForm.valid) {
      const dietitian = this.dietitianForm.value;
      this.dietitianService.createDietitian(dietitian).subscribe(
        (data) => {
          console.log('Created Dietitian', data);
          // this.dietitianForm.reset();
          this.dietitianCreated = true;
          setTimeout(() => {
            this.dietitianCreated = false;
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

  get dietitianControls() {
    return this.dietitianForm.controls;
  }

  private buildForm(user: any): void {
    this.dietitianForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      companyCode: [user.companyCode, [Validators.required]],
      role: ['dietitian'],
      isEmailVerified: [true],
      isSuperAdmin: [false],
    });
  }
}
