import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiModel';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getLandingPageData() {
    return this.http.get(`${this.baseApiUrl}/user/quiz-data`);
  }

  getAllPublicQuizes() {
    return this.http.get(`${this.baseApiUrl}/user/quiz`);
  }

  getPublicQuestionsWithOptionsByQuizId(quizId: string | null): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseApiUrl}/user/quiz/${quizId}/questions`);
  }

  submitPublicQuiz(quizId: string, answers: any) {
    return this.http.post<ApiResponse>(`${this.baseApiUrl}/user/quiz/${quizId}`, answers);
  }

  getAllQuizes() {
    return this.http.get(`${this.baseApiUrl}/user/quiz`);
  }

  getAllSubjects() {
    return this.http.get(`${this.baseApiUrl}/user/subject`);
  }

  getFilters() {
    return this.http.get(`${this.baseApiUrl}/user/filter`);
  }

  getQuizsByFilters(data: any) {
    return this.http.post(`${this.baseApiUrl}/user/quiz/filter`, data);
  }

  getResultByUser() {
    return this.http.get(`${this.baseApiUrl}/user/progress`);
  }
}
