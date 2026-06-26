import { Component, model, signal } from '@angular/core';
import { LevelFilterModel } from '../../../models/QuizModel';

@Component({
  selector: 'app-level-filter',
  imports: [],
  templateUrl: './level-filter.html',
  styleUrl: './level-filter.css',
})
export class LevelFilter {
  isOpen = signal(false);
  levelList = model<LevelFilterModel[]>();

  openSection() {
    this.isOpen.set(true);
  }

  closeSection() {
    this.isOpen.set(false);
  }

  switchIsOpen() {
    this.isOpen.update((val) => !val);
  }

  onCheckBoxChange(name: string) {
    const updatedSubjects =
      this.levelList()?.map((level) => {
        if (name === level.name) {
          return { ...level, checked: !level.checked };
        } else {
          return { ...level };
        }
      }) ?? [];

    // Emit the array to the parent
    this.levelList.set(updatedSubjects);
  }
}
