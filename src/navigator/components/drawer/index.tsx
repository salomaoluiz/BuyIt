import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import * as React from 'react';

import { Routes } from '@routes';

import DrawerBottom from '../drawer-bottom';
import UserCard from '../user-card';

const Drawer = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
  const { state, ...rest } = props;

  const newState = {
    ...state,
    routes: state.routes.filter(
      (item) => item.name !== Routes.UnauthenticatedNavigator,
    ),
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <UserCard navigation={props.navigation} />
        <DrawerItemList {...rest} state={newState} />
      </DrawerContentScrollView>
      <DrawerBottom />
    </>
  );
};

export default Drawer;
