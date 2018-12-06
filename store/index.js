/*
 ConfigureStore
 Basic usage involves { persistReducer , persistStore }
 @storage // default to localStorage
 
 */

import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import rootReducer from "../reducers"

const persistConfig = {
  /*
        required config key,storage
        otherConfig like - Whitelist , blacklist , version , stateReconciler, debug
  */

  key: "root",
  storage,
  blacklist: ["navigation"]

  /* navigation will not be persisted */
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)

  /*
        persistStore
        store - redux store . the store to be persisted
        config - object(typically null)
        callback function will be called after rehydration is finished.
  */

  return { store, persistor }
}

/* Some useful points

    ======== State Reconciler ========
    state Reconciler define how incoming state is merged in with initial state.

    3 Options available
    * "HardSet" - This will hard set incoming state. This can be desirable in some cases where persistReducer is
                  nested deeper in your reducer tree, or if you do not rely on initialState in your reducer.
    * "autoMergeLevel1" - It's the default . This will auto merge one level deep. Auto merge means if the some piece of
                  substate was modified by your reducer during the REHYDRATE action, it will skip the piece of state.
                  level 1 means it will shallow merge 1 level deep.
    * "autoMergeLevel2" - This acts just like autoMergeLevel1, except it shallow merges two levels

 */
