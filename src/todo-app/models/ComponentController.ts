export class ComponentController{

  constructor(){

  }

  setState(state){

    function reqursive(state, self){
      for (let key in state){
        if ( !state.hasOwnProperty(key) ) return;

        if ( "object" === typeof state[key]){

          if ( Array.isArray(state[key]) ){

            self[key] = [].concat(state[key]); // new arr

          } else {
            if ( !self[key] ) {
              self[key] = {};
            } else {
              self[key] = reqursive(self[key], {})
            }
            reqursive(state[key], self[key])
          }
        } else {
          self[key] = state[key];
        }
      }
      return self;
    }

    reqursive(state, this)
  }

  getJSONfromData(data){
    let json = null;
    try {
      json = JSON.stringify(data)
    } catch (e){
      throw e;
    }
    return json;
  }

  parseJSON(json){
    let data = null;
    try {
      data = JSON.parse(json)
    } catch (e){
      throw e;
    }
    return data;
  }
}
