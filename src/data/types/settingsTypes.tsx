export interface IQuestionOptions {
  columnName?: string;
  guidance?: string;
  default?: string;
  mandatory?: boolean;
}

export interface ICondition {
  field?: string;
  comparator?: string;
  value?: string;
}

export interface ISkipLogic {
  conditions?: ICondition[];
}

export interface IValidationCriteria {
  comparator?: string;
  value?: string;
  errorMessage?: string;
  formula?: string;
}

export interface ISettings {
  questionOptions?: IQuestionOptions;
  skipLogic?: ISkipLogic;
  validationCriteria?: IValidationCriteria;
}
