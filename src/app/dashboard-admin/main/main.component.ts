import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { Subject } from 'rxjs';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  user: any;
  superAdminAccess: boolean;

  statsList = [];
  showPage = false;

  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

  constructor(private statsService: StatsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.superAdminAccess = false;
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
    if (this.user) {
      if (this.user.isSuperAdmin) {
        this.superAdminAccess = this.user.isSuperAdmin;
        this.statsService.getSuperAdminStats().subscribe((data) => {
          console.log('Stats', data);

          this.pieChartLabels = [
            ['Dietitian'],
            ['Patient'],
            ['Document'],
            ['Admin'],
            'Super Admin',
          ];

          this.pieChartData = [
            data.Dietitian.length,
            data.Patient.length,
            data.Document.length,
            data.Admin.length,
            data.SuperAdmin.length,
          ];
          this.pieChartPlugins = [];
          this.statsList = data;
          this.showPage = true;
        });
      } else if (!this.user.isSuperAdmin) {
        this.statsService
          .getAdminStats(this.user.companyCode)
          .subscribe((data) => {
            console.log('Stats', data);
            this.pieChartLabels = [
              ['Dietitian'],
              ['Patient'],
              ['Document'],
              'Admin',
            ];

            this.pieChartData = [
              data.Dietitian.length,
              data.Patient.length,
              data.Document.length,
              data.Admin.length,
            ];
            this.pieChartPlugins = [];
            this.statsList = data;
            this.showPage = true;
          });
      }
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
    };
  }
}
