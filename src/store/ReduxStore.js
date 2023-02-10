import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

//este store de redux va aplicar simpre para todos los proyectos
//donde tengamos que usar un store de redux

//almacenando los datos en el local store
function saveToLocalStorage(store) {
    try {
        //transformando los datos en formato JSON, antes de pasarlo
        const serializedStore = JSON.stringify(store);
        //pasando al local store
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

//obteniendo los datos del local store
function loadFromLocalStorage() {
    try {
        //obteniendo los datos del local store
        const serializedStore = window.localStorage.getItem('store');
        //convirtiendo de JSON a javascrips
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

//haciendolo disponible para todas las herramientas redux 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

//el store se subscribe al localStore para que cuando haya un cambio en
//el store se refleje en el local store;
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;