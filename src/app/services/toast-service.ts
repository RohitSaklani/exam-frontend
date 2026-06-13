import { Injectable, signal } from '@angular/core';

type variantType = 'alert' | 'info' | 'success' | 'error';
type ToastModal = {
  id: string;
  variant: variantType;
  message: string;
  visible: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastList = signal<ToastModal[]>([]);

  turOffTime = 5000;

  addToast(variant: variantType, message: string) {
    const idCount = JSON.stringify(new Date());
    this.toastList().forEach((ele) => console.log(ele));
    console.log('idCount : ', idCount, '  list ', this.toastList());

    let newToast = { id: idCount, variant: variant, message: message, visible: false };

    setTimeout(() => {
      newToast.visible = true;
      this.toastList.update((current) => [...current, newToast]);
    }, 10);

    setTimeout(() => {
      newToast.visible = false;
      this.toastList.update((current) => [...current]);
    }, this.turOffTime);

    setTimeout(() => this.removeToast(idCount), this.turOffTime + 400);
  }

  removeToast(id: string) {
    this.toastList.update((current) => current.filter((toast) => toast.id != id));
  }

  customRemove(id: string) {
    setTimeout(() => {
      this.toastList.update((list) => [
        ...list.map((item) => (item.id == id ? { ...item, visible: false } : item)),
      ]);
    }, 10);

    setTimeout(() => this.removeToast(id), 500);
  }
}
