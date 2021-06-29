import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DietitianService } from 'src/app/services/dietitian.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  appointmentList = [];
  patientList = [];
  dietitianList = [];

  appointmentCreated = false;
  message = '';

  showPage = false;

  crateAppointmentForm: FormGroup;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private dietitianService: DietitianService,
    private fb: FormBuilder
  ) {
    const userString = localStorage.getItem('User');
    const user = JSON.parse(userString);

    appointmentService
      .getAppointmentByCompanyCodeAndID(user.companyCode, user.id)
      .subscribe((data) => {
        console.log('Appointments', data);
        this.appointmentList = data;
        this.showPage = true;
      });
    patientService
      .getPatientByCompanyCodeAndID(user.companyCode, user.id)
      .subscribe((data) => {
        console.log('Patients', data);
        this.patientList = data;
      });
    this.buildForm(user);
  }

  private buildForm(user): void {
    this.crateAppointmentForm = this.fb.group({
      createdBy: [user.id, [Validators.required]],
      createdFor: ['', [Validators.required]],
      companyCode: [user.companyCode, [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      appointmentPlatform: [''],
      appointmentPlatformLink: [''],
      appointmentDuration: [''],
      appointmentNotes: [''],
      isAccepted: [false],
      isDeleted: [false],
    });
  }

  ngOnInit(): void {}

  createAppointment() {
    if (this.crateAppointmentForm.valid) {
      const appointment = this.crateAppointmentForm.value;
      appointment.appointmentDate = Date.parse(appointment.appointmentDate);
      this.appointmentService
        .createAppointment(appointment)
        .subscribe((data) => {
          console.log('Created Appointment', data);
          this.appointmentList.unshift(data);
          this.crateAppointmentForm.reset();
          this.message = `Appointment Was Created Successfully`;
          this.appointmentCreated = true;
          setTimeout(() => {
            this.appointmentCreated = false;
          }, 3000);
        });
    }
  }

  acceptAppointment(id) {
    this.message = `Appointment Was Accepted`;
    this.appointmentCreated = true;
    console.log(id);

    this.appointmentService.acceptAppointment(id).subscribe((data) => {
      console.log('Appointment Accepted', data);
      this.message = `Appointment Was Accepted`;
      this.appointmentCreated = true;
      const index = this.appointmentList.findIndex(
        (ap) => ap.Appointment.id === id
      );
      this.appointmentList[index].Appointment = data;
      setTimeout(() => {
        this.appointmentCreated = false;
      }, 3000);
    });
  }
  rejectAppointment(id) {
    console.log(id);
  }
}
