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
  @Output() rowSelected = new EventEmitter();
  @Output() edited = new EventEmitter();
  @Output() created = new EventEmitter();
  source = new LocalDataSource();
  page = 1;

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
    this.source.load(this.data.slice(0, this.page * this.limit));
  }

  onRowSelected(evt: any) {
    this.rowSelected.emit(evt);
  }

  onEdited(evt: any) {
    this.edited.emit(evt);
  }

  onAdded() {
    this.created.emit();
  }

  hiddenLoadMore() {
    return this.page * this.limit >= this.data?.length;
  }
}
