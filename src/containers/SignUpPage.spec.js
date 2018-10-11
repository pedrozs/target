import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import faker from 'faker';
import { Field } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';
import humps from 'humps';
import Select from 'react-select';

import SignUpPage from './SignUpPage';
import SelectBox from '../components/common/Select';
import { SignUpForm } from '../components/user/SignUpForm';
import configureStore from '../store/configureStore';
import { withStore } from '../utils/testHelpers';

describe('<SignUpPage />', () => {
  let username;
  let email;
  let password;
  let passwordConfirmation;
  let gender;
  let store;
  let subject;
  let form;
  let fakeAccount;
  let fakeAccountResponse;

  beforeEach(() => {
    store = configureStore();
    subject = mount(withStore(<SignUpPage />, store, ['/sign-up']));
    form = subject.find('form');

    username = subject.find('input').at(0);
    email = subject.find('input').at(1);
    password = subject.find('input').at(2);
    passwordConfirmation = subject.find('input').at(3);
    gender = subject.find(Select);

    const pass = faker.internet.password();
    fakeAccount = {
      user: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: pass,
        passwordConfirmation: pass,
        gender: 'male'
      }
    };

    fakeAccountResponse = {
      id: 1,
      email: fakeAccount.email,
      provider: 'email',
      uid: fakeAccount.email,
      last_name: '',
      gender: 'female',
      username: 'test',
      created_at: '2017-02-23T13:54:33.283Z',
      updated_at: '2017-02-23T13:54:33.425Z',
      avatar: {
        url: 'http://urlexample.com/avatar/12345.jpg',
        normal: {
          url: 'http://urlexample.com/avatar/12345.jpg'
        },
        small_thumb: {
          url: 'http://urlexample.com/avatar/12345.jpg'
        }
      }
    };

    sessionService.saveUser = jest.fn(() => Promise.resolve());
    sessionService.saveSession = jest.fn(() => Promise.resolve());
    // sessionService.loadSession = jest.fn(() => Promise.reject('Session not found'));
  });

  it('should display a username input', () => {
    expect(subject.find(Field).get(0).props.name).toEqual('username');
  });

  it('should display an email input', () => {
    expect(subject.find(Field).get(1).props.name).toEqual('email');
  });

  it('should display a password input', () => {
    expect(subject.find(Field).get(2).props.name).toEqual('password');
  });

  it('should display a password confimation input', () => {
    expect(subject.find(Field).get(3).props.name).toEqual('password_confirmation');
  });

  it('should display a gender selector', () => {
    expect(subject.find(Field).get(4).props.name).toEqual('gender');
  });

  describe('submit with valid form', () => {
    beforeEach(() => {
      nock(process.env.API_URL)
        .post('//users', humps.decamelizeKeys(fakeAccount))
        .reply(200, humps.camelizeKeys({ fakeAccount: fakeAccountResponse }));

      username.simulate('change', { target: { value: fakeAccount.user.username } });
      email.simulate('change', { target: { value: fakeAccount.user.email } });
      password.simulate('change', { target: { value: fakeAccount.user.password } });
      passwordConfirmation.simulate('change', { target: { value: fakeAccount.user.password } });
      gender.simulate('change', { target: { value: fakeAccount.user.gender } });
      const inp = gender.find('input').at(0);
      inp.simulate('change', { target: { value: fakeAccount.user.gender } });
      inp.simulate('keyDown', { keyCode: 13, key: 'Enter' });
      form.simulate('submit');
    });

    it('should  call onSubmit', (done) => {
      sessionService.saveUser = jest.fn(() => {
        expect(sessionService.saveUser).toHaveBeenCalled();
        done();
        return Promise.resolve();
      });
    });
  });

  describe('submit with blank gender', () => {
    beforeEach(() => {
      username.simulate('change', { target: { value: fakeAccount.user.username } });
      email.simulate('change', { target: { value: fakeAccount.user.email } });
      password.simulate('change', { target: { value: fakeAccount.user.password } });
      passwordConfirmation.simulate('change', { target: { value: fakeAccount.user.password } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      form = subject.find(SignUpForm);
      expect(form.props().valid).toEqual(false);
    });

    it('should display an error in the field', () => {
      const firstNameInput = subject.find(SelectBox);
      expect(firstNameInput.props().meta.error).toHaveLength(1);
    });
  });
});
