import { PersistState } from 'redux-persist';

import { AuthState } from '@store/auth/types';
import { GeneralState } from '@store/general/types';
import { NotificationState } from '@store/notification/types';
import { ProductListState } from '@store/product-list/types';
import { StockState } from '@store/stock/types';

import { initialAppState } from './initialAppState.mock';

export class AppStateMockBuilder {
  _persist: PersistState = initialAppState._persist;
  productListReducer: ProductListState = initialAppState.productListReducer;
  authReducer: AuthState = initialAppState.authReducer;
  generalReducer: GeneralState = initialAppState.generalReducer;
  notificationReducer: NotificationState = initialAppState.notificationReducer;
  stockReducer: StockState = initialAppState.stockReducer;

  withPersist(state: PersistState) {
    this._persist = state;
    return this;
  }

  withAuth(state: AuthState) {
    this.authReducer = state;
    return this;
  }

  withNotification(state: NotificationState) {
    this.notificationReducer = state;
    return this;
  }

  withStock(state: StockState) {
    this.stockReducer = state;
    return this;
  }

  withGeneral(state: GeneralState) {
    this.generalReducer = state;
    return this;
  }

  withProductList(state: ProductListState) {
    this.productListReducer = state;
    return this;
  }

  build = () => {
    return {
      _persist: this._persist,
      authReducer: this.authReducer,
      generalReducer: this.generalReducer,
      notificationReducer: this.notificationReducer,
      productListReducer: this.productListReducer,
      stockReducer: this.stockReducer,
    };
  };
}
