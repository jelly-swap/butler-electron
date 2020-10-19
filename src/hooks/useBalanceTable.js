import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { ASSETS_MAP } from '../constants/assets';
import { useBalance } from '../context/BalanceContext';
import { openLink } from '../utils/electronAPI';

export const useBalanceTable = () => {
  const balance = useBalance();

  const data = useMemo(() => {
    if (!balance) {
      return [];
    }

    return Object.keys(balance).map(key => {
      const addressLink = `${ASSETS_MAP[key].addressExplorer}${balance[key].address}`;

      return {
        network: (
          <div className='network-wrapper'>
            <span>{key}</span> <img src={require(`../images/tokens/${key}.svg`)} alt={key} />
          </div>
        ),
        balance: <div className='amount-wrapper'>{Number(balance[key].balance).toFixed(6)}</div>,
        address: (
          <div className='address-wrapper' title={addressLink} onClick={() => openLink(addressLink)}>
            {balance[key].address}
            <i className='fas fa-external-link-alt'></i>
          </div>
        ),
      };
    });
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
