import firebaseInit from '..';
import * as admob from '../admob';

jest.mock('../admob', () => jest.fn());

const initAdmob = jest.spyOn(admob, 'default');

describe('Firebase', () => {
  test('deve inicializar o admob', () => {
    firebaseInit();

    expect(initAdmob).toHaveBeenCalled();
  });
});
