export function addDelay(context, cb, time){
  return function(args){
    setTimeout(cb.bind(context, args), time)
  }
}
