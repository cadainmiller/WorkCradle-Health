import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { DietitianService } from 'src/app/services/dietitian.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss'],
})
export class PatientCreateComponent implements OnInit {
  patientForm: FormGroup;
  user: any;
  superAdminAccess = false;
  companyNotSelected: boolean;

  dietitianList = [];
  companiesList = [];
  patientCreated: boolean;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private dietitianService: DietitianService,
    private companyService: CompanyService
  ) {
    this.patientCreated = false;
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

    dietitianService
      .getDietitianByCompanyCodeOnly(this.user.companyCode)
      .subscribe((data) => {
        console.log('Dietitians', data);
        this.dietitianList = data;
      });
    this.buildForm(this.user);
  }

  ngOnInit(): void {}

  get patientControls() {
    return this.patientForm.controls;
  }

  private buildForm(user: any): void {
    this.patientForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: [''],
      age: [''],
      weight: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      companyCode: [user.companyCode, [Validators.required]],
      role: ['patient'],
      healthGoal: [''],
      singleHealthCondition: [''],
      healthCondition: [[]],
      foodPreference: [[]],
      singleFoodPreference: [''],
      subscriptionPackage: [''],
      subscriptionStartDate: [''],
      subscriptionEndDate: [''],
      assignedDietitian: [''],
      isEmailVerified: [true],
    });
  }

  togglePackage(subPackage: string) {
    this.patientForm.patchValue({
      subscriptionPackage: subPackage,
    });
  }

  toggleHealthCondition(condition: string) {
    let healthArray = this.patientControls.healthCondition.value;
    const index = healthArray.findIndex((h) => h === condition);
    if (index > -1) {
      healthArray = healthArray.slice(index);
    } else {
      healthArray.push(condition);
    }
    this.patientForm.patchValue({
      healthCondition: healthArray,
    });
  }

  addHealthCondition() {
    const healthArray = this.patientControls.healthCondition.value;
    const healthCondition = this.patientControls.singleHealthCondition.value;
    healthArray.push(healthCondition);
    this.patientForm.patchValue({
      healthCondition: healthArray,
      role: 'patient',
    });
    this.patientControls.singleHealthCondition.reset();
  }

  addFoodPreference() {
    const foodPreferenceArray = this.patientControls.foodPreference.value;
    const foodPreference = this.patientControls.singleFoodPreference.value;
    foodPreferenceArray.push(foodPreference);

    this.patientForm.patchValue({
      foodPreference: foodPreferenceArray,
    });
    this.patientControls.singleFoodPreference.reset();
  }

  cratePatient() {
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;
      patient.subscriptionStartDate = Date.parse(patient.subscriptionStartDate);
      patient.subscriptionEndDate = Date.parse(patient.subscriptionEndDate);
      this.patientService.createPatient(patient).subscribe((data) => {
        console.log('Created Patient', data);
        this.patientForm.reset();
        this.patientCreated = true;
        setTimeout(() => {
          this.patientCreated = false;
        }, 3000);
      });
    }
  }
  cancelCratePatient() {}

  changeCompany(code) {
    this.patientControls.companyCode.reset();
    this.companyNotSelected = false;
    this.dietitianService
      .getDietitianByCompanyCodeOnly(code)
      .subscribe((data) => {
        console.log('Dietitians', data);
        this.dietitianList = data;
      });
  }
}
