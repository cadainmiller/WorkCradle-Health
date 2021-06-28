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
    const userString = localStorage.getItem('User');
    this.user = JSON.parse(userString);
    if (this.user && this.user.role === 'dietitian') {
      this.statsService
        .getAdminStats(this.user.companyCode)
        .subscribe((data) => {
          console.log('Stats', data);
          this.pieChartLabels = [['Dietitian'], ['Patient'], 'Document'];

          this.pieChartData = [
            data.Dietitian.length,
            data.Patient.length,
            data.Document.length,
          ];
          this.pieChartPlugins = [];
          this.statsList = data;
          this.showPage = true;
        });
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
    };
  }
}
