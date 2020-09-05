import { ProductListState } from './product-list/types';
import { GeneralState } from './general/types';

export interface ApplicationState {
  authReducer: AuthState;
  notificationReducer: NotificationState;
  productListReducer: ProductListState;
  generalReducer: GeneralState;
}
