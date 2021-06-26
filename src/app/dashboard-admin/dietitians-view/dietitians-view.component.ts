import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DietitianService } from 'src/app/services/dietitian.service';

@Component({
  selector: 'app-dietitians-view',
  templateUrl: './dietitians-view.component.html',
  styleUrls: ['./dietitians-view.component.scss'],
})
export class DietitiansViewComponent implements OnInit {
  dietitian: any;
  patientList = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  updateProfileForm: FormGroup;
  updating = false;
  showPage = false;
  constructor(
    private dietitianService: DietitianService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.buildForm();
    this.route.params.subscribe((params) => {
      const dietitianId = params.id;
      this.dietitianService.getDietitianById(dietitianId).subscribe((data) => {
        console.log('Dietitian', data);
        this.dietitian = data;
        this.setFormValues(this.dietitian);

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
        };

        this.dietitianService
          .getPatientByDietitianId(this.dietitian.id)
          .subscribe((data) => {
            console.log('Patients', data);
            this.patientList = data;
            this.showPage = true;
            this.dtTrigger.next();
          });
      });
    });
  }

  ngOnInit(): void {}

  get updateProfileControls() {
    return this.updateProfileForm.controls;
  }

  updateProfile() {
    this.updating = true;
    if (this.updateProfileForm.valid) {
      const updateBody = this.updateProfileForm.value;
      this.dietitianService
        .updateDietitianById(this.dietitian.id, updateBody)
        .subscribe((data) => {
          console.log('Created Dietitian', data);
          this.dietitian = data;
          this.updating = false;
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
      phone: ['', [Validators.required]],
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
