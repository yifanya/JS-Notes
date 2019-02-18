function createStore(reducer) {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state,action);
    listeners.forEach(l=>l());
  };
  const subscribe = (fn) => {
    listeners.push[fn];
    return () => {
      listeners = listeners.filter(l=>l!==fn)
    }
  }

  return {
    dispatch,
    getState,
    subscribe,
  }
}

function combineReducers() {
  
}

function applyMiddleWare(middleWare) {
  return createStore => reducer => {
    const store = createStore(reducer);
    middleWares = middleWare.map(mw => mw(store));
    let dispatch = compose(middleWares);
    return {
      ...store,
      dispatch
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export default {
  createStore,
  combineReducers,
  applyMiddleWare,
  compose
}

//中间件标准写法
let logger = store => next => action => {

};