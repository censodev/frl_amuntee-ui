import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {

  constructor() { }

  today() {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    const to = new Date();
    to.setDate(to.getDate() + 1);
    to.setHours(0, 0, 0, 0);
    return {
      from: from,
      to: to,
    };
  }

  yesterday() {
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return {
      from: yesterday,
      to: now,
    };
  }

  thisWeek() {
    const d = new Date();
    const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return {
      from: new Date(d.setDate(diff)),
      to: new Date(),
    };
  }

  thisMonth() {
    const date = new Date();
    return {
      from: new Date(date.getFullYear(), date.getMonth(), 1),
      to: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    };
  }
}
