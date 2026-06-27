import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { PopUpModalService } from '../../services/pop-up-modal-service';
import { NgComponentOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { GLobalService } from '../../services/global-service';

@Component({
  selector: 'app-pop-up-model',
  imports: [],
  templateUrl: './pop-up-model.html',
  styleUrl: './pop-up-model.css',
})
export class PopUpModel {
  modal = inject(PopUpModalService);

  globalService = inject(GLobalService);

  constructor(private elementRef: ElementRef | null) {}
  closeOnBackdropClick(event: MouseEvent, backdropElement: HTMLDivElement): void {
    // Check if the user clicked the backdrop itself, NOT the centered white content box
    if (event.target === backdropElement) {
      this.modal.closeModal();
    }
  }
}
