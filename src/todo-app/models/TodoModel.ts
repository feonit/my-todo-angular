import { Model } from './Model'

export interface ITodoModel {
  id: number;
  description: string;
  isCompleted: boolean;
}

export class TodoModel extends Model{
  /** Идентификатор */
  public id: number;

  /** Описание задачи */
  public description: string;

  /** Флаг завершения задачи */
  public isCompleted: boolean;

  constructor(options: ITodoModel){
    super(options);
    this.id = "undefined" == typeof options.id ? this._id : options.id;
    this.description = options.description;
    this.isCompleted = options.isCompleted;
  }

  static createTodo(options: ITodoModel){
    return new TodoModel(options)
  }
}
