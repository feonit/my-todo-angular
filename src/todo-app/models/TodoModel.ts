import { Model } from './Model'

export interface ITodoModel {
  description: string;
  isCompleted: boolean;
}

export class TodoModel extends Model{
  /** Описание задачи */
  public description: string;

  /** Флаг завершения задачи */
  public isCompleted: boolean;

  constructor(options: ITodoModel){
    super(options);
    this.description = options.description;
    this.isCompleted = options.isCompleted;
  }

  static createTodo(options: ITodoModel){
    return new TodoModel(options)
  }
}
