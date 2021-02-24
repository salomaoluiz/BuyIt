import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import * as utilsDate from '@utils/date';
import * as utilsID from '@utils/id';
import DocumentFirestoreBuilder from 'src/firebase/__mocks__/documentFirestoreBuilder.mock';
import QueryFirestoreBuilder from 'src/firebase/__mocks__/queryFirestoreBuilder.mock';

import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import { ProductList } from '../types';
import * as utils from '../utils';

jest.mock('@react-native-firebase/firestore', () => ({
  Timestamp: {
    fromDate: jest.fn().mockImplementation((func) => ({
      _default: func,
      toDate: jest.fn().mockReturnValue(func),
    })),
  },
}));
describe('Utils ProductList Store', () => {
  jest
    .spyOn(utilsID, 'injectId')
    .mockImplementation((func) => ({ ...func, id: 'abc-12345' }));
  jest.spyOn(utilsDate, 'injectTimeStamp').mockImplementation((func) => ({
    ...func,
    createdAt: 123456,
    updatedAt: 123456,
  }));

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1604012169142);
  });

  // should extract the data and merge the firestore return with the ID
  test('deve extrair o data e mesclar com o ID o retorno do firestore', () => {
    const mockData = new DocumentFirestoreBuilder()
      .withId('123456')
      .withData({ value: 'Value Mock' })
      .build();

    const response = utils.formatDocumentProductList(mockData);

    const expected = {
      id: '123456',
      value: 'Value Mock',
    };

    expect(response).toEqual(expected);
  });

  // should ajust the firestore list as so the app undestand
  test('deve ajustar a lista retornada do firestore de modo que o app compreenda', () => {
    const mockDoc1 = new DocumentFirestoreBuilder()
      .withId('123456')
      .withData({ value: 'Value Mock' })
      .build();
    const mockDoc2 = new DocumentFirestoreBuilder()
      .withId('654321')
      .withData({ value: 'new Mock Value' })
      .build();

    const mockData = new QueryFirestoreBuilder()
      .withDocs([mockDoc1, mockDoc2])
      .build();

    const response = utils.appProductListFormater(mockData);

    const expected = [
      { id: '123456', value: 'Value Mock' },
      { id: '654321', value: 'new Mock Value' },
    ];

    expect(response).toEqual(expected);
  });

  // if due date are a firestore timestamp, should format to correctly date type.
  test('caso duedate seja Firestore Timestamp, deve formatar o tipo de data corretamente', () => {
    const date = new Date(100000);

    const mockData: { dueDate: FirebaseFirestoreTypes.Timestamp } & any = {
      dueDate: firestore.Timestamp.fromDate(date),
      id: '123456',
      text: 'Mock Text',
    };

    const response = utils.formatDueDate(mockData);

    const expected = {
      ...mockData,
      dueDate: date,
    };
    expect(response).toEqual(expected);
  });

  // should format the productList to send to DB, removing ID and items
  test('deve formatar um productList para enviar pro DB, remover ID', () => {
    const mockProductList: ProductList = new ProductListBuilderMock().build();

    const response = utils.dbProductListFormated(mockProductList);

    const expected = {
      ...mockProductList,
      id: undefined
    };

    expect(response).toEqual(expected);
  });

  // should inject the ID and timestamp into a list or item
  test('deve injetar o ID e o timestamp a uma lista ou item', () => {
    const mockList = {
      name: 'mock',
    };

    const response = utils.injectProductListExtraData(mockList);

    const expected = {
      id: 'abc-12345',
      name: 'mock',
      createdAt: 123456,
      updatedAt: 123456,
    };

    expect(response).toEqual(expected);
  });

  // should replace a list filtering by ID
  test('deve sobrescrever uma lista filtrando por ID', () => {
    const mockList = new ProductListBuilderMock()
      .withId('11111')
      .withName('Nome')
      .build();

    const mock2 = new ProductListBuilderMock()
      .withId('22222')
      .withName('Mock2')
      .build();
    const mock3 = new ProductListBuilderMock()
      .withId('333333')
      .withName('Mock3')
      .build();
    const stateProductList = [mockList, mock2, mock3];

    const newList = new ProductListBuilderMock()
      .withId('11111')
      .withName('Novo Nome')
      .build();

    const response = utils.updateProductListArray(stateProductList, newList);

    const expected = [mock2, mock3, newList];

    expect(response).toEqual(expected);
  });

  // should create a new list
  test('deve criar uma nova lista', () => {
    const mock1 = new ProductListBuilderMock()
      .withId('11111')
      .withName('Nome')
      .build();

    const mock2 = new ProductListBuilderMock()
      .withId('22222')
      .withName('Mock2')
      .build();
    const stateProductList = [mock1, mock2];

    const newList = new ProductListBuilderMock()
      .withId('33333')
      .withName('Novo Nome')
      .build();

    const response = utils.createProductListArray(stateProductList, newList);

    const expected = [mock1, mock2, newList];

    expect(response).toEqual(expected);
  });

  // should create a new list's item
  test('deve criar um novo item de uma lista', () => {
    const item1 = new ProductItemBuilderMock()
      .withId('11111')
      .withName('item 1')
      .build();

    const mockList: ProductList = new ProductListBuilderMock()
      .withId('11111')
      .withItems([item1])
      .withName('Nome')
      .build();

    const newItem = new ProductItemBuilderMock()
      .withId('222222')
      .withName('novo item')
      .build();

    const response = utils.createProductItemArray(mockList, newItem);

    const expected = new ProductListBuilderMock()
      .withId('11111')
      .withItems([item1, newItem])
      .withName('Nome')
      .build();

    expect(response).toEqual(expected);
  });

  // should add the first list's item
  test('deve adicionar o primeiro item da lista', () => {
    const mockList: ProductList = new ProductListBuilderMock()
      .withId('11111')
      .withItems([])
      .withName('Nome')
      .build();

    const newItem = new ProductItemBuilderMock()
      .withId('222222')
      .withName('novo item')
      .build();

    const response = utils.createProductItemArray(mockList, newItem);

    const expected = new ProductListBuilderMock()
      .withId('11111')
      .withItems([newItem])
      .withName('Nome')
      .build();

    expect(response).toEqual(expected);
  });

  // should ajust a legacy date to the new format
  test('deve ajustar uma data legado para o novo formato', () => {
    const date = new Date(Date.now()) as any;
    const item1 = new ProductItemBuilderMock()
      .withId('11111')
      .withName('item 1')
      .withDueDate(date)
      .build();

    const response = utils.ajustLegacyDueDate([item1]);

    const expectedItem = new ProductItemBuilderMock()
      .withId('11111')
      .withName('item 1')
      .withDueDate(Date.now())
      .build();
    expect(response).toEqual([expectedItem]);
  });
});
