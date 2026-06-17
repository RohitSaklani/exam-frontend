import { Component, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-testimony',
  imports: [NgClass],
  templateUrl: './testimony.html',
  styleUrl: './testimony.css',
})
export class Testimony implements OnInit {
  list = [
    {
      content: ' Pagedone is simply the best tool of investment in the market right now.',
      name: 'Jabe b',
    },
    {
      content: ' Pagedone is simply the best tool of investment in the market right now.',
      name: 'Jabe b',
    },
    {
      content: ' Pagedone is simply the best tool of investment in the market right now.',
      name: 'Jabe b',
    },
    {
      content: ' Pagedone is simply the best tool of investment in the market right now.',
      name: 'Jabe b',
    },
    {
      content: ' Pagedone is simply the best tool of investment in the market right now.',
      name: 'Jabe b',
    },
  ];

  active = signal(1);

  ngOnInit(): void {
    setInterval(() => this.next(), 1000 * 5);
  }

  next() {
    if (this.active() >= this.list.length - 1) {
      this.active.set(0);
    } else {
      this.active.update((val) => val + 1);
    }
  }

  getClass(index: number) {
    let right = this.list.length <= this.active() + 1 ? 0 : this.active() + 1;
    let left = this.active() == 0 ? this.list.length - 1 : this.active() - 1;

    if (index == left) {
      return 'left';
    } else if (index == right) {
      return 'right';
    } else if (index == this.active()) {
      return 'middle';
    } else {
      return 'hide';
    }
  }
}
