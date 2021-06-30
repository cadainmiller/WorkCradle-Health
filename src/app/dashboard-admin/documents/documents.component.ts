import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { DietitianService } from 'src/app/services/dietitian.service';
import { DocumentService } from 'src/app/services/document.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  documentForm: FormGroup;
  documentList = [];
  dietitianList = [];
  companiesList = [];
  patientList = [];
  user: any;
  loading = false;
  showPage = false;
  superAdminAccess = false;

  fileName = '';

  constructor(
    private documentService: DocumentService,
    private patientService: PatientService,
    private dietitianService: DietitianService,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);

    if (this.user) {
      this.buildForm(this.user);
      if (this.user.isSuperAdmin) {
        this.superAdminAccess = this.user.isSuperAdmin;
        this.companyService.getAllCompany().subscribe((data) => {
          console.log('Companies', data);
          this.companiesList = data;
        });
        patientService
          .getPatientByCompanyCodeOnly(this.user.companyCode)
          .subscribe((data) => {
            console.log('Patient', data);
            this.patientList = data;
          });

        this.documentService.getDocumentAdmin().subscribe((data) => {
          console.log('Documents', data);
          this.dtTrigger.next();
          this.documentList = data;
          this.showPage = true;
        });
      } else if (!this.user.isSuperAdmin) {
        this.documentService
          .getDocumentByCompanyCode(this.user.companyCode)
          .subscribe((data) => {
            console.log('Documents', data);
            this.dtTrigger.next();
            this.documentList = data;
            this.showPage = true;
          });
      }
    }
    this.dietitianService
      .getDietitianByCompanyCodeOnly(this.user.companyCode)
      .subscribe((data) => {
        console.log('Dietitians', data);
        this.dietitianList = data;
      });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
    };
  }

  get documentControls() {
    return this.documentForm.controls;
  }

  private buildForm(user: any): void {
    this.documentForm = this.fb.group({
      file: [null, [Validators.required]],
      fileUpload: [''],
      createdBy: ['', [Validators.required]],
      createdFor: ['', [Validators.required]],
      docName: ['', [Validators.required]],
      companyCode: [user.companyCode],
      docType: ['document'],
    });
  }

  changeCompany(code) {
    this.documentControls.companyCode.reset();
    this.documentForm.patchValue({
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      this.documentForm.patchValue({
        fileUpload: file,
      });
    }
  }

  uploadDocument() {
    const formData = new FormData();
    formData.append('fileUpload', this.documentControls.fileUpload.value);
    formData.append('companyCode', this.documentControls.companyCode.value);
    formData.append('createdBy', this.documentControls.createdBy.value);
    formData.append('createdFor', this.documentControls.createdFor.value);
    formData.append('docName', this.documentControls.docName.value);
    formData.append('docType', this.documentControls.docType.value);

    this.documentService.createDocument(formData).subscribe((data) => {
      console.log(data);
    });
  }
}
