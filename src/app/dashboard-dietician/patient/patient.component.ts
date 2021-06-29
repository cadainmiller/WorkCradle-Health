import { Component, OnInit } from '@angular/core';
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

  constructor(
    private patientService: PatientService,
    private dietitianService: DietitianService
  ) {
    const userString = localStorage.getItem('User');
    const user = JSON.parse(userString);

    patientService
      .getPatientByCompanyCodeAndID(user.companyCode, user.id)
      .subscribe((data) => {
        console.log('Patient', data);
        this.patientList = data;
        this.showPage = true;
      });
  }

  ngOnInit(): void {}

  viewPatient(patient) {
    console.log(patient);
  }
}
