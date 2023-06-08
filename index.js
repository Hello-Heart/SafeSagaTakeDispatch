import {
    put,race, delay, take
  } from 'redux-saga/effects';

export let dispatchers = {

}

export const createSafeDispatch = ({eventName, defaultTimeout = 500, safeTakeDefaultEffect = take }) => {
    const actionReadyName = `SAFE-DISPATCHER-${eventName}-READY`
    /**
     * creates a a safe dispatch, 
     * either we wait for actionReadyName to be dispatched
     * or dipstahcing it if timeout has occoured
     */
    const safeDispatch = function* _(...params) {
       yield race([take(actionReadyName), delay(defaultTimeout)])
       yield put(eventName, ...params)
    }

    /**
     * creates a a safe Take, 
     * takes a callback to initialize, then let's the disptacher 
     * know he's ready
     */
    const safeTake = function* _(callback = function* _(){}) {
      yield safeTakeDefaultEffect(callback)
      yield put({type: actionReadyName, actionType: 'dispatch'})
     }
    
    dispatchers[eventName] = safeDispatch

    return {safeTake, safeDispatch}
}

export default {createSafeDispatch, dispatchers}
