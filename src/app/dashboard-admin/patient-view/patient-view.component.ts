import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent implements OnInit {
  patient: any;
  patientList = [];
  intakeInfoList = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  updateProfileForm: FormGroup;
  updating = false;
  showPage = false;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.buildForm();
    this.route.params.subscribe((params) => {
      const patientId = params.id;

      this.patientService.getPatientById(patientId).subscribe((data) => {
        console.log('Patient', data);
        this.patient = data;
        const formInfo = this.patient.intakeInformation;

        for (let index = 0; index < formInfo.length; index++) {
          const element = formInfo[index];
          const propertyValues = Object.values(element.information);
          this.intakeInfoList.push(propertyValues);
        }

        this.setFormValues(this.patient.patient);

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
        };
        this.showPage = true;
      });
    });
  }

  get updateProfileControls() {
    return this.updateProfileForm.controls;
  }

  ngOnInit(): void {}

  togglePackage(subPackage: string) {
    this.updateProfileForm.patchValue({
      subscriptionPackage: subPackage,
    });
  }

  toggleHealthCondition(condition: string) {
    let healthArray = this.updateProfileControls.healthCondition.value;
    const index = healthArray.findIndex((h) => h === condition);
    if (index > -1) {
      healthArray = healthArray.slice(index);
    } else {
      healthArray.push(condition);
    }
    this.updateProfileForm.patchValue({
      healthCondition: healthArray,
    });
  }

  addHealthCondition() {
    const healthArray = this.updateProfileControls.healthCondition.value;
    const healthCondition =
      this.updateProfileControls.singleHealthCondition.value;
    healthArray.push(healthCondition);
    this.updateProfileForm.patchValue({
      healthCondition: healthArray,
    });
    this.updateProfileControls.singleHealthCondition.reset();
  }

  addFoodPreference() {
    const foodPreferenceArray = this.updateProfileControls.foodPreference.value;
    const foodPreference =
      this.updateProfileControls.singleFoodPreference.value;
    foodPreferenceArray.push(foodPreference);

    this.updateProfileForm.patchValue({
      foodPreference: foodPreferenceArray,
    });
    this.updateProfileControls.singleFoodPreference.reset();
  }

  updateProfile() {
    if (this.updateProfileForm.valid) {
      const patient = this.updateProfileForm.value;
      this.patientService
        .updatePatient(this.patient.patient.id, patient)
        .subscribe((data) => {
          console.log('Update Patient', data);
          this.patient.patient = data;
          // this.patientCreated = true;
          // setTimeout(() => {
          //   this.patientCreated = false;
          // }, 3000);
        });
    }
  }

  private buildForm(): void {
    this.updateProfileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: [''],
      age: [''],
      weight: [''],
      healthGoal: [''],
      singleHealthCondition: [''],
      healthCondition: [[]],
      foodPreference: [[]],
      singleFoodPreference: [''],
      subscriptionPackage: [''],
      subscriptionStartDate: [''],
      subscriptionEndDate: [''],
      assignedDietitian: [''],
    });
  }

  private setFormValues(patient) {
    if (patient) {
      this.updateProfileForm.patchValue({
        name: patient.name || '',
        email: patient.email || '',
        phone: patient.phone || '',
        age: patient.age || '',
        weight: patient.weight || '',
        healthGoal: patient.healthGoal || '',
        healthCondition: patient.healthCondition || '',
        foodPreference: patient.foodPreference || '',
        subscriptionPackage: patient.subscriptionPackage || '',
        subscriptionStartDate: patient.subscriptionStartDate || '',
        subscriptionEndDate: patient.subscriptionEndDate || '',
        assignedDietitian: patient.assignedDietitian || '',
      });
    }
  }
}
