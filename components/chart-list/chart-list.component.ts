import {Component, Input, OnInit} from '@angular/core';
import {ChartConfigurationService} from '../../services/chart-configuration.service';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit {

  @Input() visualizationLayers: any[] = [];
  @Input() visualizationId: string;
  @Input() chartHeight: string;
  chartLayers: Array<{chartConfiguration: any; analyticsObject: any}> = [];
  constructor(private chartConfig: ChartConfigurationService) { }

  ngOnInit() {
    if (this.visualizationLayers.length > 0) {
      this.chartLayers = this.visualizationLayers.map((layer: any, layerIndex: number) => {
        return {
          chartConfiguration: this.chartConfig.getChartConfiguration(
            layer.settings,
            this.visualizationId + '_' + layerIndex,
            layer.layout
          ),
          analyticsObject: layer.analytics
        };
      });
    }
  }

}
