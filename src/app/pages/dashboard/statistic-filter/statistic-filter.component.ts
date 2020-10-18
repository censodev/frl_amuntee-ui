import { TimeService } from './../../../@core/services/time.service';
import { StatisticService } from './../../../@core/services/statistic.service';
import { Store } from './../../../@core/models/business/store';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'app/@core/services/store.service';

@Component({
  selector: 'ngx-statistic-filter',
  templateUrl: './statistic-filter.component.html',
  styleUrls: ['./statistic-filter.component.scss'],
})
export class StatisticFilterComponent implements OnInit {
  stores: Store[];
  dateRange: any;

  constructor(public statisticService: StatisticService,
              private timeService: TimeService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.listStores()
      .subscribe(res => this.stores = res.content);
    this.statisticService.onFiltered.subscribe(data => {
      this.statisticService.storeSelectedId = data.storeId ? data.storeId : 0;
      this.dateRange = {
        start: data.from,
        end: data.to,
      };
    });
  }

  onSubmitted() {
    const data = {
      storeId: this.statisticService.storeSelectedId,
      from: this.dateRange?.start,
      to: this.dateRange?.end,
    };

    switch (this.statisticService.filterOptionSelectedId) {
      case 1:
        const today = this.timeService.today();
        data.from = today.from;
        data.to = today.to;
        break;
      case 2:
        const yesterday = this.timeService.yesterday();
        data.from = yesterday.from;
        data.to = yesterday.to;
        break;
      case 3:
        const thisWeek = this.timeService.thisWeek();
        data.from = thisWeek.from;
        data.to = thisWeek.to;
        break;
      case 4:
        const thisMonth = this.timeService.thisMonth();
        data.from = thisMonth.from;
        data.to = thisMonth.to;
        break;
      case 5:
        data.from = this.dateRange?.start;
        data.to = this.dateRange?.end;
        break;
    }

    this.statisticService.onFiltered.next(data);
  }
}
