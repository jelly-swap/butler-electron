import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

import { useHttpGet } from './useHttpGet';

const balanceEndpoint = '/api/v1/balanceAll';

export const useBalanceTable = () => {
  const httpResponse = useHttpGet(balanceEndpoint);

  const mockData = {
    ETH: {
      address: '0x4382432',
      balance: '321321321321',
    },
    AE: {
      address: 'ae321321',
      balance: '351321',
    },
    USDC: {
      address: '0x41254432',
      balance: '2222',
    },
    WBTC: {
      address: '0x4382543534432',
      balance: '22',
    },
    DAI: {
      address: '0x4382436546542',
      balance: '3',
    },
    BTC: {
      address: 'bc14532fwf',
      balance: '32322132132',
    },
  };

  const data = useMemo(() => {
    return Object.keys(mockData).map(key => ({
      network: (
        <div className='network-wrapper'>
          {key} <img src={require(`../images/tokens/${key}.svg`)} alt={key} />
        </div>
      ),
      balance: Number(mockData[key].balance).toFixed(6),
      address: mockData[key].address,
    }));
  }, [httpResponse.data, httpResponse.isLoading]);

  const columns = useMemo(
    () => [
      {
        Header: 'Network',
        accessor: 'network', // accessor is the "key" in the data
      },
      {
        Header: 'Balance',
        accessor: 'balance',
      },
      {
        Header: 'Address',
        accessor: 'address', // accessor is the "key" in the data
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data: data || [] }, useSortBy);

  return { tableInstance, isLoading: httpResponse.isLoading };
};
