export interface OptionModel {
  value: string;
  id: number;
}
export interface QuestionModel {
  id: number;
  value: string;
  optionList: OptionModel[];
}

export interface SelectedOption {
  quizId: string;
  optionId: string;
}

export interface SubjectModel {
  id: number;
  name: string;
}

export interface QuizModel {
  id: number;
  description: string;
  name: string;
  level: string;
  durationInSec: number;
  subject: SubjectModel;
  passingScore: number;
  rating: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminQuizDTOModel {
  id: number;
  description: string;
  name: string;
  level: string;
  durationInSec: number;
  subject: string;
  passingScore: number;
  rating: number;
  enabled: boolean;
}

export interface QuizCardModel {
  id: number;
  name: string;
  level: string;
  durationInSec: number;
  subjectName: string;
}

export interface SubjectFilterModel {
  id: number;
  name: string;
  checked: boolean;
}

export interface LevelFilterModel {
  name: string;
  checked: boolean;
}

export interface FilterModel {
  subjectIds: number[];
  levelNames: string[];
  rating: number;
}

export interface ResultModel {
  id: number;
  attemptedquestions: number;
  rightQuestions: number;
  score: number;
  totalQuestions: number;
  quiz: QuizModel;
  subject: SubjectModel;
}

export interface PageDataModel {
  size: number;
  activePage: number;
  totalElements: number;
  totalPages: number;
}

export interface AdminQuestionModel {
  id: number;
  value: string;
  optionList: { id: number; value: string; right: boolean }[];
}

export interface AdminOptionDTOModel {
  id: number;
  value: string;
}

export interface AdminQuestionDTOModel {
  id: number;
  question: string;
  optionList: AdminOptionDTOModel[];
  isRightId: number;
}
