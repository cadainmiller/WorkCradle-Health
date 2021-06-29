import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  documentList = [];
  user: any;
  loading = false;
  showPage = false;
  superAdminAccess = false;

  constructor(private documentService: DocumentService) {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);

    if (this.user) {
      if (this.user.isSuperAdmin) {
        this.superAdminAccess = this.user.isSuperAdmin;
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
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
    };
  }
}
