export interface ToastModel {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'error' | 'info';
}

export interface PopUpModalModel {
  type: 'alert' | 'info' | 'success' | 'fail' | 'error' | 'QUIZ_RESULT' | null;
  heading: string | null;
  data: any | null;
}
