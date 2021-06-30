import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { DietitianService } from 'src/app/services/dietitian.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-admin-create-view',
  templateUrl: './admin-create-view.component.html',
  styleUrls: ['./admin-create-view.component.scss'],
})
export class AdminCreateViewComponent implements OnInit {
  adminList = [];

  showPage = false;
  superAdminAccess = false;

  closeResult: string;
  user: any;

  assignDietitianForm: FormGroup;
  get assignDietitianControls() {
    return this.assignDietitianForm.controls;
  }

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);

    if (this.user) {
      if (this.user.isSuperAdmin) {
        this.superAdminAccess = this.user.isSuperAdmin;
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

    this.buildForm();
  }

  private buildForm(): void {
    this.assignDietitianForm = this.fb.group({
      assignedDietitian: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
}
