import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

import { useHttpGet } from './useHttpGet';

const balanceEndpoint = '/api/v1/balanceAll';

export const useBalanceTable = isServerStarted => {
  const httpResponse = useHttpGet(balanceEndpoint, isServerStarted);

  const data = useMemo(() => {
    if (httpResponse.isLoading) {
      return [];
    }

    return Object.keys(httpResponse.data).map(key => ({
      network: (
        <div className='network-wrapper'>
          {key} <img src={require(`../images/tokens/${key}.svg`)} alt={key} />
        </div>
      ),
      balance: Number(httpResponse.data[key].balance).toFixed(6),
      address: httpResponse.data[key].address,
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