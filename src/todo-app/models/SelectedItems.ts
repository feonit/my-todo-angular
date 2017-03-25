/**
 * Список выбранных элементов и логика по работе со списком
 * */

export class SelectedItems{

  private values: number[];

  constructor(items: number[] = []){
    this.values = items;
  }

  getValues(){
    return this.values.concat()
  }

  addValue(value: number){
    if ( !this.hasValue(value) ){
      this.values.push(value)
    }
  }

  removeValue(value: number){
    if ( this.hasValue(value) ){
      this.values.splice(this.values.indexOf(value), 1)
    }
  }

  /**
   * @return {boolean}
   * */
  hasValue(expectedValue: number){
    return this.values.some(function(value){
      return value === expectedValue
    })
  }

  switchPresence(value: number){
    if ( this.hasValue(value) ){
      this.removeValue(value)
    } else {
      this.addValue(value)
    }
  }
}
