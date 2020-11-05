import { LocalDataSource } from 'ng2-smart-table';
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ngx-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data: any[];
  @Input() settings: any;
  @Input() limit = 5;
  @Output() rowSelect = new EventEmitter();
  source = new LocalDataSource();
  page = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.reload();
    }
  }

  ngOnInit(): void {
    //
  }

  loadMore() {
    this.page++;
    this.reload();
  }

  reload() {
    this.source.load(this.data.slice(0, (this.page + 1) * this.limit));
  }

  onRowSelected(evt: any) {
    this.rowSelect.emit(evt);
  }
}
