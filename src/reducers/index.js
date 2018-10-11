import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionImmutableReducer as session } from 'redux-react-session';

import topics from './topicReducer';
import router from './routerReducer';
import target from './targetReducer';
import conversations from './conversationsReducer';

const rootReducer = combineReducers({
  conversations,
  form,
  router,
  session,
  target,
  topics
});

export default rootReducer;
