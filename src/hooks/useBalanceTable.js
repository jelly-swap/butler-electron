import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

import { useHttpGet } from './useHttpGet';

const balanceEndpoint = '/api/v1/balanceAll';

export const useBalanceTable = () => {
  const httpResponse = useHttpGet(balanceEndpoint);

  const data = useMemo(() => {
    if (httpResponse.isLoading) {
      return [];
    }

    console.log('data', httpResponse);

    return Object.keys(httpResponse.data).map(key => ({
      network: key,
      address: httpResponse.data[key].address,
      balance: (
        <span>
          {httpResponse.data[key].balance} <img src={require(`../images/tokens/${key}.svg`)} alt={key} />
        </span>
      ),
    }));
  }, [httpResponse.data, httpResponse.isLoading]);

  const columns = useMemo(
    () => [
      {
        Header: 'Network',
        accessor: 'network', // accessor is the "key" in the data
      },
      {
        Header: 'Address',
        accessor: 'address', // accessor is the "key" in the data
      },
      {
        Header: 'Balance',
        accessor: 'balance',
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data: data || [] }, useSortBy);

  return { tableInstance, isLoading: httpResponse.isLoading };
};
