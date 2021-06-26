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
      isEmailVerified: [true],
    });
  }

  private setFormValues(dietitian) {
    if (dietitian) {
      this.updateProfileForm.patchValue({
        name: dietitian.name,
        email: dietitian.email,
        phone: dietitian.phone,
      });
    }
  }
}
