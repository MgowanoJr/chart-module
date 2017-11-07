import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as OfflineHighchartExporting from 'highcharts/modules/offline-exporting.js';
import * as HighchartsMore from 'highcharts/highcharts-more.js';
import * as HighchartGauge from 'highcharts/modules/solid-gauge.js';
import * as HighchartDrilldown from 'highcharts/modules/drilldown.js';
import * as HighchartGroupedCategories from 'highcharts-grouped-categories/grouped-categories.js';

HighchartsExporting(Highcharts);
OfflineHighchartExporting(Highcharts);
HighchartsMore(Highcharts);
HighchartGauge(Highcharts);
HighchartDrilldown(Highcharts);
HighchartGroupedCategories(Highcharts);
import {ChartService} from '../../services/chart.service';
import {ChartConfiguration} from '../../models/chart-configuration';

@Component({
  selector: 'app-chart-item',
  templateUrl: './chart-item.component.html',
  styleUrls: ['./chart-item.component.css']
})
export class ChartItemComponent implements OnInit {

  @Input() chartConfiguration: ChartConfiguration;
  @Input() analyticsObject: any;
  @Input() chartHeight: string;
  chart: any;

  constructor(private chartService: ChartService) {
  }

  get renderId(): string {
    return this.chartConfiguration.renderId;
  }

  ngOnInit() {
    if (this.chartConfiguration && this.analyticsObject) {
      const chartObject: any = this.chartService.drawChart(this.analyticsObject, this.chartConfiguration);

      if (chartObject) {
        setTimeout(() => {
          this.chart = Highcharts.chart(chartObject);
        }, 20);
      }
    }
  }

}
