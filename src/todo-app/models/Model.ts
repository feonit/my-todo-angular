let counter = 0;

export class Model {
  /** Внутренний каунтер подсчета экземпляров */
  public _id: number;

  constructor(options: any){
    this._id = counter++;
  }
}
