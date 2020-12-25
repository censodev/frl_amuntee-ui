import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @Input() src: string;
  @Input() config = {
    width: '100%',
    height: '200px',
  }

  @Output() onImageChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
        this.onImageChanged.emit(this.src);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
