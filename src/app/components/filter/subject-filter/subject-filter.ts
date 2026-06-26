import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { SubjectFilterModel } from '../../../models/QuizModel';
import { GLobalService } from '../../../services/global-service';
import { QuizService } from '../../../services/quiz-service';

@Component({
  selector: 'app-subject-filter',
  imports: [],
  templateUrl: './subject-filter.html',
  styleUrl: './subject-filter.css',
})
export class SubjectFilter {
  isOpen = signal(false);
  subjectList = model<SubjectFilterModel[]>();

  openSection() {
    this.isOpen.set(true);
  }

  closeSection() {
    this.isOpen.set(false);
  }

  switchIsOpen() {
    this.isOpen.update((val) => !val);
  }

  onCheckBoxChange(id: number) {
    // const isChecked = (event.target as HTMLInputElement).checked;
    // subject.checked = isChecked;

    // Filter the array to get only the IDs of checked subjects
    const updatedSubjects: SubjectFilterModel[] =
      this.subjectList()?.map((s) => {
        if (id === s.id) {
          return { ...s, checked: !s.checked };
        } else {
          return { ...s };
        }
      }) ?? [];

    // Emit the array to the parent
    this.subjectList.set(updatedSubjects);
  }
}
