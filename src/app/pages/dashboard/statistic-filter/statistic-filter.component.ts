import { StatisticService } from './../../../@core/services/statistic.service';
import { Store } from './../../../@core/models/business/store';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-statistic-filter',
  templateUrl: './statistic-filter.component.html',
  styleUrls: ['./statistic-filter.component.scss'],
})
export class StatisticFilterComponent implements OnInit {
  @Input() stores: Store[];

  dateRange: any;
  storeSelectedId = 0;

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.onFiltered.subscribe(data => {
      this.storeSelectedId = data.storeId ? data.storeId : 0;
      this.dateRange = {
        start: data.from,
        end: data.to,
      };
    });
  }

  onFiltered() {
    this.statisticService.onFiltered.next({
      storeId: this.storeSelectedId,
      from: this.dateRange?.start,
      to: this.dateRange?.end,
    });
  }
}
