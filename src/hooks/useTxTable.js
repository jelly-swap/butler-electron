import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useTransactions } from '../context/TransactionContext';
import { getAssetImage } from '../images/tokens';

import { cutHash, getAmount } from '../utils';
import { openLink } from '../utils/electronAPI';

import { STATUS, STATUS_COLOR } from '../constants';
import { ASSETS_MAP } from '../constants/assets';

import Arrow from '../images/arrow.svg';

export const useTransactionTable = () => {
  const transactions = useTransactions();

  const data = useMemo(() => {
    if (!transactions) {
      return [];
    }

    return Object.values(transactions)
      .sort((s1, s2) => s2.expiration - s1.expiration)
      .map(swap => {
        const txLink = `${ASSETS_MAP[swap.network].txExplorer}${swap.transactionHash}`;
        const outputAmount = getAmount(swap.outputAmount, swap.outputNetwork);
        const inputAmount = getAmount(swap.inputAmount, swap.network);

        return {
          swap: (
            <div className='network-wrapper'>
              <div className='transaction-info'>
                <div className='input-info' title={`You sent ${inputAmount} ${swap.network}`}>
                  <img src={getAssetImage(swap.network)} alt={swap.network} />
                  <span>{inputAmount}</span>
                </div>

                <div className='txHash'>
                  <img src={Arrow} alt='arrow' />
                  <span title={txLink} onClick={() => openLink(txLink)}>
                    {cutHash(swap.transactionHash)}
                    <i className='fas fa-external-link-alt'></i>
                  </span>
                </div>

                <div className='output-info' title={`You received ${outputAmount} ${swap.outputNetwork}`}>
                  <img src={getAssetImage(swap.outputNetwork)} alt={swap.outputNetwork} />
                  <span>{outputAmount}</span>
                </div>
              </div>

              <span className='status' style={{ color: STATUS_COLOR[STATUS[swap.status]] }}>
                {STATUS[swap.status].toLowerCase()}
              </span>
            </div>
          ),
        };
      });
  }, [transactions]);

  const columns = useMemo(
    () => [
      {
        accessor: 'swap',
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  return [tableInstance, Object.keys(transactions).length === 0];
};
