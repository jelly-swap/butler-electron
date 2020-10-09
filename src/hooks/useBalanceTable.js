import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useBalance } from '../context/BalanceContext';

export const useBalanceTable = () => {
  const balance = useBalance();

  const data = useMemo(() => {
    if (!balance) {
      return [];
    }

    return Object.keys(balance).map(key => ({
      network: (
        <div className='network-wrapper'>
          {key} <img src={require(`../images/tokens/${key}.svg`)} alt={key} />
        </div>
      ),
      balance: Number(balance[key].balance).toFixed(6),
      address: balance[key].address,
    }));
  }, [balance]);

  const columns = useMemo(
    () => [
      {
        Header: 'Network',
        accessor: 'network',
      },
      {
        Header: 'Balance',
        accessor: 'balance',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  return [tableInstance, Object.keys(balance).length === 0];
};
