import * as sagas from '../sagas';
import {
  productListWithItems,
  productListEmpty,
  firstProductItem,
  secondProductItem,
} from '../__mocks__/sagas.mock';
import { productListActions, productListSelectors } from '..';
import { put, select, call } from 'redux-saga/effects';
import navigationService from '@navigator/services/navigationService';

jest.mock('@utils/id', () => ({
  generateUniqueID: jest.fn().mockReturnValue('123456789'),
}));

describe('ProductList Sagas', () => {
  test('deve editar um ProductList já existente', () => {
    const mockProductList = [productListWithItems().build()];
    const newProductList = productListWithItems().withName('Novo nome').build();

    const response = sagas._generateProductList(
      mockProductList,
      newProductList,
    );

    expect(response).toEqual([newProductList]);
  });

  test('deve add um novo ProductList se ele não existir na lista', () => {
    const oldProductList = productListWithItems().build();
    const newProductList = productListEmpty().withName('Novo nome').build();

    const mockProductList = [oldProductList];
    const response = sagas._generateProductList(
      mockProductList,
      newProductList,
    );

    const expected = [oldProductList, newProductList];
    expect(response).toEqual(expected);
  });

  // #region setProductListAsync

  test('deve salvar uma nova lista corretamente ', () => {
    const oldProductList = productListWithItems().build();
    const newProductList = productListEmpty().withName('Novo nome').build();
    const mockProductList = [oldProductList];
    const mockNewProductListArray = [oldProductList, newProductList];

    const action = productListActions.setProductListAsync(newProductList);
    // @ts-ignore
    const gen = sagas.setProductListAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));
    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    expect(gen.next(mockProductList).value).toEqual(
      put(productListActions.setProductLists(mockNewProductListArray)),
    );
    expect(gen.next(mockProductList).value).toEqual(
      call(navigationService.goBack),
    );

    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));

    expect(gen.next().done).toEqual(true);
  });

  test('Em caso de erro, seve setar o erro', () => {
    const newProductList = productListEmpty().withName('Novo nome').build();

    const action = productListActions.setProductListAsync(newProductList);

    //@ts-ignore
    const gen = sagas.setProductListAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));
    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );
    const mockError = new TypeError(
      `Cannot read property 'filter' of undefined`,
    );

    expect(gen.next().value).toEqual(
      put(productListActions.setError(mockError)),
    );
    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));
    expect(gen.next().done).toEqual(true);
  });

  // #endregion

  // #region setProductItemAsync

  test('deve salvar um novo item na lista corretamente ', () => {
    const productItem = firstProductItem().withId('').build();
    const newProductItem = firstProductItem().withId('123456789').build();

    const listId = '123456';

    const mockNewProductListsArray = [productListWithItems().build()];

    const action = productListActions.setProductItemAsync(productItem, listId);
    // @ts-ignore
    const gen = sagas.setProductItemAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));
    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    const expectedNewProductListArray = [
      productListWithItems().withMoreItem(newProductItem).build(),
    ];

    expect(gen.next(mockNewProductListsArray).value).toEqual(
      put(productListActions.setProductLists(expectedNewProductListArray)),
    );

    expect(gen.next().value).toEqual(call(navigationService.goBack));
    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));

    expect(gen.next().done).toEqual(true);
  });

  test('deve editar um item existente na lista corretamente ', () => {
    const productItem = firstProductItem().build();
    const newProductItem = firstProductItem()
      .withName('Novo nome do item')
      .build();
    const listId = '654321';

    const mockCurrentList = productListEmpty().withItems([productItem]).build();

    const mockNewProductListsArray = [mockCurrentList];

    const action = productListActions.setProductItemAsync(
      newProductItem,
      listId,
    );

    // @ts-ignore
    const gen = sagas.setProductItemAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));
    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    const expectedNewProductListArray = [
      productListEmpty().withItems([newProductItem]).build(),
    ];

    expect(gen.next(mockNewProductListsArray).value).toEqual(
      put(productListActions.setProductLists(expectedNewProductListArray)),
    );

    expect(gen.next().value).toEqual(call(navigationService.goBack));
    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));

    expect(gen.next().done).toEqual(true);
  });

  test('Em caso de erro, seve setar o erro', () => {
    const newProductList = productListEmpty().withName('Novo nome').build();

    const action = productListActions.setProductListAsync(newProductList);

    // @ts-ignore
    const gen = sagas.setProductListAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));
    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    const mockError = new TypeError(
      `Cannot read property 'filter' of undefined`,
    );
    expect(gen.next().value).toEqual(
      put(productListActions.setError(mockError)),
    );
    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));
    expect(gen.next().done).toEqual(true);
  });

  // #endregion

  // #region deleteProductItemAsync

  test('deve deletar um item da lista corretamente ', () => {
    const itemId = '123456';
    const listId = '123456';

    const mockNewProductListsArray = [productListWithItems().build()];

    const action = productListActions.deleteProductItemAsync(itemId, listId);

    // @ts-ignore
    const gen = sagas.deleteProductItemAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));

    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    const expectedNewProductListArray = [
      productListWithItems().withItems([secondProductItem().build()]).build(),
    ];

    expect(gen.next(mockNewProductListsArray).value).toEqual(
      put(productListActions.setProductLists(expectedNewProductListArray)),
    );

    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));

    expect(gen.next().done).toEqual(true);
  });

  test('Em caso de erro, seve setar o erro', () => {
    const itemId = '123456';
    const listId = '654321';
    const action = productListActions.deleteProductItemAsync(itemId, listId);

    // @ts-ignore
    const gen = sagas.deleteProductItemAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));
    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    const mockError = new TypeError(
      `Cannot read property 'filter' of undefined`,
    );
    expect(gen.next().value).toEqual(
      put(productListActions.setError(mockError)),
    );

    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));
    expect(gen.next().done).toEqual(true);
  });

  // #endregion

  // #region deleteProductListAsync

  test('deve deletar uma lista corretamente ', () => {
    const listId = '123456';

    const mockNewProductListsArray = [
      productListWithItems().build(),
      productListEmpty().build(),
    ];

    const action = productListActions.deleteProductListAsync(listId);

    // @ts-ignore
    const gen = sagas.deleteProductListAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));

    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    const expectedNewProductListArray = [productListEmpty().build()];

    expect(gen.next(mockNewProductListsArray).value).toEqual(
      put(productListActions.setProductLists(expectedNewProductListArray)),
    );

    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));

    expect(gen.next().done).toEqual(true);
  });

  test('Em caso de erro, seve setar o erro', () => {
    const listId = '654321';
    const action = productListActions.deleteProductListAsync(listId);

    // @ts-ignore
    const gen = sagas.deleteProductListAsync(action);

    expect(gen.next().value).toEqual(put(productListActions.setLoading(true)));
    expect(gen.next().value).toEqual(
      select(productListSelectors.getProductLists),
    );

    const mockError = new TypeError(
      `Cannot read property 'filter' of undefined`,
    );
    expect(gen.next().value).toEqual(
      put(productListActions.setError(mockError)),
    );

    expect(gen.next().value).toEqual(put(productListActions.setLoading(false)));
    expect(gen.next().done).toEqual(true);
  });

  // #endregion
});
