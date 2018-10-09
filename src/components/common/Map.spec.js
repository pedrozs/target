import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import { fromJS } from 'immutable';
import { Circle, GoogleMap } from 'react-google-maps';

import HomePage from '../../containers/HomePage';
import Map from './Map';
import configureStore from '../../store/configureStore';
import { withStore } from '../../utils/testHelpers';

describe('<Map />', () => {
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
      },
    }));
    const location = {
      pathname: '/',
      search: '/',
      hash: '',
      key: '9kzkus'
    };
    subject = mount(withStore(<HomePage location={location} />, store, location));

    nock(process.env.API_URL)
      .get('targets')
      .reply(200, {"targets":[{"target":{"id":978,"title":"lol","lat":-34.9083356452463,"lng":-56.1983425222957,"radius":50.0,"topic_id":11}},{"target":{"id":979,"title":"lol","lat":-34.9047282294338,"lng":-56.2039644323909,"radius":40.0,"topic_id":11}},{"target":{"id":980,"title":"Peter","lat":-34.9044199352015,"lng":-56.1999325378204,"radius":100.0,"topic_id":2}}]});
  });
  it('Should render 3 targets', () => {
    const targets = subject.find(GoogleMap);
    expect(targets).toHaveLength(1);
  });
});
