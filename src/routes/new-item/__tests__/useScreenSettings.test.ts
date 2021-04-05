
import * as reactNavigation from '@react-navigation/native';
import { renderHook } from '@testing-library/react-hooks';

import { translate } from '@locales';
import { useRouteMock } from 'src/__tests__/navigation-mocks';

import useScreenSettings from '../useScreenSettings';

jest.mock('@react-navigation/native');

describe('useScreenSettings', () => {
  const routeSpy = jest.spyOn(reactNavigation, 'useRoute');

  // should return the screen name as New Item and the addition icon
  test('deve retornar o nome da tela como novo item e o icone de adição', () => {
    routeSpy.mockReturnValue({ ...useRouteMock, params: {}  });

    const { result } = renderHook(useScreenSettings);

    expect(result.current.screenTitle).toEqual(translate('productItems.newItem'));
    expect(result.current.fabIcon).toEqual('plus');
  });

  // if the screen receive a productItem on params, should return the screen name as Edit Item and a check icon
  test('caso a tela receba um productItem como paramêtro, deve retornar o nome da tela como editar item e o icone de check', () => {
    routeSpy.mockReturnValue({ ...useRouteMock, params: { productItem: { id: '1234' } }  });

    const { result } = renderHook(useScreenSettings);

    expect(result.current.screenTitle).toEqual(translate('productItems.editItem'));
    expect(result.current.fabIcon).toEqual('check');
  });

});
