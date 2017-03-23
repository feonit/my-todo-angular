import { Model } from './Model'
let counter = 0;

export interface ICollections {
  models: Model[]
}

export class Collection {
  public models: Model[];
  public id: number;

  constructor(options: ICollections){
    this.id = counter++;
    this.models = options.models ;
  }
}
