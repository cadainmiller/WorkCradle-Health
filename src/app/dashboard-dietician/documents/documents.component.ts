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

  constructor(private documentService: DocumentService) {
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
    };

    this.documentService
      .getDocumentByCompanyCodeAndID(this.user.companyCode, this.user.id)
      .subscribe((data) => {
        const foundDoc = data.filter(
          (doc) => doc.Document.docType === 'document'
        );
        console.log('Documents', foundDoc);
        this.dtTrigger.next();
        this.loading = false;
        this.documentList = foundDoc;
        this.showPage = true;
      });
  }
}
