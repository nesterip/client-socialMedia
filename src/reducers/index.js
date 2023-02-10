import { combineReducers } from "redux";
import authReducer from "./AuthReducer.js";
import postReducer from "./PostReducer.js";

/* aqui en el index de la carpeta reducer es donde vamos a combinr todos los reducer
    que tengamos ya que como tal solo puede haber un reducers asi que antes tenemos que
    combinarlos para luego exportarlos todos
*/

export const reducers = combineReducers({authReducer, postReducer});