export class ListModel{
  selectedById: number[];

  constructor(items: number[]){
    this.selectedById = items;
  }

  addTodoId(id: number){
    if ( !this.findTodoId(id) ){
      this.selectedById.push(id)
    }
  }

  findTodoId(expectedId){
    return this.selectedById.some(function(i){
      return i === expectedId
    })
  }

  removeTodoId(id: number){
    if ( this.findTodoId(id) ){
      this.selectedById.splice(this.selectedById.indexOf(id), 1)
    }
  }

  switchPresence(id){
    if ( this.findTodoId(id) ){
      this.removeTodoId(id)
    } else {
      this.addTodoId(id)
    }
  }
}
