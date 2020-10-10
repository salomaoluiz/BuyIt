import { ProductListState } from './product-list/types';
import { GeneralState } from './general/types';
import { AuthState } from './auth/types';
import { NotificationState } from './notification/types';
import { StockState } from './stock/types';

export interface ApplicationState {
  authReducer: AuthState;
  notificationReducer: NotificationState;
  productListReducer: ProductListState;
  generalReducer: GeneralState;
  stockReducer: StockState;
}
