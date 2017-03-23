let counter = 0;

export class Model {
  public id: number;

  constructor(options: any){
    this.id = counter++;
  }
}
