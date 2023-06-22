import * as ACTIONS from "../../actionTypes";
import { showError } from "../../components/messages/messages";
import { getData } from "../../requests/requisições";



export const keyWordAction = (key) => {

    return {
      type: ACTIONS.KEY_WORD,
      payload: key,
    };
  
};