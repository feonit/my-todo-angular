export function delayFn(callback, context, time){
  var delayArgs = [].slice.call(arguments, 3);
  return function(){
    var args = [].slice.call(arguments);
    var unshiftArgs = delayArgs.concat(args);
    setTimeout(function(){
      callback.apply(context, unshiftArgs)
    }, time)
  }
}
