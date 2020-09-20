import { ProductListState } from './product-list/types';
import { GeneralState } from './general/types';
import { AuthState } from './auth/types';
import { NotificationState } from './notification/types';

export interface ApplicationState {
  authReducer: AuthState;
  notificationReducer: NotificationState;
  productListReducer: ProductListState;
  generalReducer: GeneralState;
}
