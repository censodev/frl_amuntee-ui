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
  @Output() edit = new EventEmitter();
  @Output() create = new EventEmitter();
  @Output() editConfirm = new EventEmitter();
  @Output() createConfirm = new EventEmitter();
  
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
    this.rowSelect.emit(evt);
  }

  onEdited(evt: any) {
    this.edit.emit(evt);
  }

  onCreated(evt: any) {
    this.create.emit(evt);
  }

  onEditConfirmed(evt: any) {
    this.editConfirm.emit(evt);
  }

  onCreateConfirmed(evt: any) {
    this.createConfirm.emit(evt);
  }

  hiddenLoadMore() {
    return (this.page * this.limit >= this.data?.length) || !this.data;
  }
}
