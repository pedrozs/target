import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

import Routes from '../routes';
import HomePage from './HomePage';
import Map from '../components/common/Map';
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
    subject = mount(withStore(<HomePage subRoutes={Routes[2].subRoutes} location={location} />, store, location));
  });

  it('should render a cointainer div with "home-page" class name', () => {
    expect(subject.find('div').get(0).props.className).toEqual('home-page');
  });

  it('should render a Map component', () => {
    expect(subject.find(Map)).toHaveLength(1);
  });

  it('should render a left panel', () => {
    expect(subject.find('.left-panel')).toHaveLength(1);
  });
});
