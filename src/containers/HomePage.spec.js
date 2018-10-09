import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
// import nock from 'nock';

import HomePage from './HomePage';
import configureStore from '../store/configureStore';
import { withStore } from '../utils/testHelpers';

describe('<HomePage />', () => {
  let store;
  let subject;

  beforeEach(() => {
    store = configureStore(fromJS({
      session: {
        authenticated: true,
        checked: true,
        invalid: false,
        user: {
          id: 300,
          username: 'Peter'
        }
      }
    }));
    const location = {
      pathname: '/',
      search: '/',
      hash: '',
      key: '9kzkus'
    };
    subject = mount(withStore(<HomePage location={location} />, store, location));
  });

  it('should render a div', () => {
    expect(subject.find('div').get(0).props.className).toEqual('home-page');
  });
});
