import { ImagePickerComponent } from './../image-picker/image-picker.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Image } from './image';

@Component({
  selector: 'ngx-image-grid-picker',
  templateUrl: './image-grid-picker.component.html',
  styleUrls: ['./image-grid-picker.component.scss']
})
export class ImageGridPickerComponent implements OnInit {
  @Input() images: Image[];
  @Output() imagesChange = new EventEmitter<Image[]>();
  @Output() onChanged = new EventEmitter<any>();
  @ViewChild('newPicker') newPicker: ImagePickerComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onImageChanged(base64: string, index: number) {
    this.onChanged.emit({
      index: index,
      oldImage: this.images[index],
      newImage: { src: base64 },
    });
    this.images[index] = { src: base64 };
    this.imagesChange.emit(this.images);
    this.newPicker.src = null;
  }
}
