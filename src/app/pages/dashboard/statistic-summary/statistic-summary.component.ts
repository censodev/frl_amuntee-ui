import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-statistic-summary',
  templateUrl: './statistic-summary.component.html',
  styleUrls: ['./statistic-summary.component.scss'],
})
export class StatisticSummaryComponent implements OnInit, OnChanges {
  @Input() chartData: any;
  @Input() totalSales: number;

  eTheme: any;
  colors: any;
  options: any;

  constructor(private theme: NbThemeService) { }

  ngOnInit(): void {
    //
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData.currentValue !== undefined) {
      this.theme.getJsTheme()
        .subscribe(config => {
          this.eTheme = config.variables.profit;
          this.colors = config.variables;
          this.initChart();
        });
    }
  }

  initChart() {
    this.options = {
      backgroundColor: this.eTheme.bg,
      legend: {
        data: ['Revenue', 'Fee', 'Profit'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.chartData.chartLabel,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: this.eTheme.axisLineColor,
            },
          },
          axisLabel: {
            color: this.eTheme.axisTextColor,
            fontSize: this.eTheme.axisFontSize,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: this.eTheme.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: this.eTheme.splitLineColor,
            },
          },
          axisLabel: {
            color: this.eTheme.axisTextColor,
            fontSize: this.eTheme.axisFontSize,
          },
        },
      ],
      series: [
        {
          name: 'Revenue',
          type: 'bar',
          barGap: 0,
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.colors.primaryLight,
              }, {
                offset: 1,
                color: this.colors.primaryLight,
              }]),
            },
          },
          data: this.chartData.data[0],
        },
        {
          name: 'Fee',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.colors.dangerLight,
              }, {
                offset: 1,
                color: this.colors.dangerLight,
              }]),
            },
          },
          data: this.chartData.data[1],
        },
        {
          name: 'Profit',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.colors.successLight,
              }, {
                offset: 1,
                color: this.colors.successLight,
              }]),
            },
          },
          data: this.chartData.data[2],
        },
      ],
    };
  }
}
