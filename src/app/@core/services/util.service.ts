import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor() { }

  formatCurrency(number: any): string {
    if (!number)
      return '0$';
    return Math.round(parseFloat(number) * 100) / 100.00 + '$';
  }
}
