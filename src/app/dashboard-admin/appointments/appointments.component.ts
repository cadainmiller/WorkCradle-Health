import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CompanyService } from 'src/app/services/company.service';
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
  companiesList = [];

  appointmentCreated = false;
  message = '';

  user: any;
  loading = false;
  showPage = false;
  superAdminAccess = false;

  crateAppointmentForm: FormGroup;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private dietitianService: DietitianService,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);

    if (this.user) {
      this.buildForm(this.user);
      this.buildForm(this.user);
      if (this.user.isSuperAdmin) {
        this.superAdminAccess = this.user.isSuperAdmin;
        this.companyService.getAllCompany().subscribe((data) => {
          console.log('Companies', data);
          this.companiesList = data;
        });
        appointmentService.getAllAppointments().subscribe((data) => {
          console.log('Appointments', data);
          this.appointmentList = data;
          this.showPage = true;
        });
        patientService
          .getPatientByCompanyCodeOnly(this.user.companyCode)
          .subscribe((data) => {
            console.log('Patients', data);
            this.patientList = data;
          });
        dietitianService
          .getDietitianByCompanyCodeOnly(this.user.companyCode)
          .subscribe((data) => {
            console.log('Dietitians', data);
            this.dietitianList = data;
          });
      } else if (!this.user.isSuperAdmin) {
        appointmentService
          .getAppointmentByCompanyCode(this.user.companyCode)
          .subscribe((data) => {
            console.log('Appointments', data);
            this.appointmentList = data;
            this.showPage = true;
          });
        patientService
          .getPatientByCompanyCodeOnly(this.user.companyCode)
          .subscribe((data) => {
            console.log('Patients', data);
            this.patientList = data;
          });
        dietitianService
          .getDietitianByCompanyCodeOnly(this.user.companyCode)
          .subscribe((data) => {
            console.log('Dietitians', data);
            this.dietitianList = data;
          });
      }
    }
  }

  get appointmentControls() {
    return this.crateAppointmentForm.controls;
  }

  private buildForm(user): void {
    this.crateAppointmentForm = this.fb.group({
      createdBy: ['', [Validators.required]],
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

  changeCompany(code) {
    this.appointmentControls.companyCode.reset();
    this.crateAppointmentForm.patchValue({
      companyCode: code,
    });
    this.dietitianService
      .getDietitianByCompanyCodeOnly(code)
      .subscribe((data) => {
        console.log('Dietitians', data);
        this.dietitianList = data;
      });
  }
  changeDietitian(code, id) {
    this.patientService
      .getPatientByCompanyCodeAndID(code, id)
      .subscribe((data) => {
        console.log('Patient', data);
        this.patientList = data;
      });
  }
}
