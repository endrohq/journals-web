import { lazy } from 'react';
import { LazyLoad } from '../../components/loaders/LazyLoad';

const transactions = {
  page: 'transactions',
  label: 'Transactions',
  Component: LazyLoad(lazy(() => import('./AccountTransactions')))
};

export const getAccountDetailsMenu = () => {
  return [transactions];
};
