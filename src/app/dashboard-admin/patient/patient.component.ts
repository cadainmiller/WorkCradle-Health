import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietitianService } from 'src/app/services/dietitian.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  patientList = [];
  dietitianList = [];

  showPage = false;

  closeResult: string;

  assignDietitianForm: FormGroup;
  get assignDietitianControls() {
    return this.assignDietitianForm.controls;
  }

  constructor(
    private patientService: PatientService,
    private dietitianService: DietitianService,
    private fb: FormBuilder
  ) {
    const userString = localStorage.getItem('User');
    const user = JSON.parse(userString);

    patientService
      .getPatientByCompanyCode(user.companyCode)
      .subscribe((data) => {
        console.log('Patient', data);
        this.patientList = data;
      });
    dietitianService
      .getDietitianByCompanyCode(user.companyCode)
      .subscribe((data) => {
        console.log('Dietitians', data);
        this.dietitianList = data;
        this.showPage = true;
      });
    this.buildForm();
  }

  private buildForm(): void {
    this.assignDietitianForm = this.fb.group({
      assignedDietitian: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  viewPatient(patient) {
    console.log(patient);
  }

  selectedDietitian(patient) {
    if (patient) {
      const dietitian = this.assignDietitianForm.value;
      this.patientService
        .updatePatient(patient.Patient.id, dietitian)
        .subscribe((data) => {
          console.log('Updated', data);
          const index = this.patientList.findIndex(
            (p) => p.Patient.id === data.id
          );
          if (index > -1) {
            this.patientList[index].Patient = data;
          }
        });
    }
  }
}
