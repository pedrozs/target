import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionImmutableReducer as session } from 'redux-react-session';

import editSucess from './editSucessReducer';
import router from './routerReducer';
import toast from './toastReducer';
import geo from './geoReducer';

const rootReducer = combineReducers({
  form,
  session,
  router,
  editSucess,
  toast,
  geo
});

export default rootReducer;
