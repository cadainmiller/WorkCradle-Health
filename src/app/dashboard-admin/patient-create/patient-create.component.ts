import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss'],
})
export class PatientCreateComponent implements OnInit {
  patientForm: FormGroup;
  user: any;

  patientCreated: boolean;
  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientCreated = false;
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
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
      this.patientService.createPatient(patient).subscribe((data) => {
        console.log('Created Patient', data);

        this.patientCreated = true;
        setTimeout(() => {
          this.patientCreated = false;
        }, 3000);
      });
    }
  }
  cancelCratePatient() {}
}
