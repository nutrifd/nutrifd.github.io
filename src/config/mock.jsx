import MockAdapter from 'axios-mock-adapter';
import request from './request';

export const mock = new MockAdapter(request);