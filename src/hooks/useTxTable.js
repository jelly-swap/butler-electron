import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useTransactions } from '../context/TransactionContext';
import { getAssetImage } from '../images/tokens';

import { cutHash } from '../utils';

import { STATUS, STATUS_COLOR } from '../constants';

import Arrow from '../images/arrow.svg';

// network: "ETH"
// transactionHash: "0xc9ef5f6e4574450f092f90c690e2dafc68a47ca81135b2b11b32a2570a8ea031"
// blockNumber: 10453301
// inputAmount: "2245225000000000000"
// outputAmount: "5758500"
// expiration: 1594757525
// id: "0x7135db065132fead036c7b6fb16b32f9c29f3fa432632c265820bb9a074f9fe3"
// hashLock: "0x3b38f083c98162be9bbff31ba88782801b8ede37365258cbdb02b3a9242bc30b"
// sender: "0xf0756e188d2f9e0c9003a65019be010ddbf5f026"
// receiver: "0xdf9cb34d9dd92d54cec4150bd1518202e391479c"
// outputNetwork: "BTC"
// outputAddress: "bc1qhfpcxxcanakff4gdtjxkaz8wthemptefcrc6zw"
// refundAddress: "0xf0756e188d2f9e0c9003a65019be010ddbf5f026"
// status: 2
// _id: "5f0cc02d0d8dd1001798eeb1"
// createdAt: "2020-07-13T20:12:29.776Z"

export const useTransactionTable = () => {
  const transactions = useTransactions();

  const data = useMemo(() => {
    if (!transactions) {
      return [];
    }
    return Object.values(transactions).map(swap => ({
      swap: (
        <div className='network-wrapper'>
          <div className='transaction-info'>
            <div className='input-info'>
              <img src={getAssetImage(swap.network)} alt={swap.network} />
              <span>{swap.inputAmount}</span>
            </div>

            <div className='txHash'>
              <img src={Arrow} alt='arrow' />
              <span title={swap.transactionHash}>
                <p>TXHash:&nbsp;</p>
                {cutHash(swap.transactionHash)}
              </span>
            </div>

            <div className='output-info'>
              <img src={getAssetImage(swap.outputNetwork)} alt={swap.network} />
              <span>{swap.outputAmount}</span>
            </div>
          </div>

          <span className='status' style={{ color: STATUS_COLOR[STATUS[swap.status]] }}>
            {STATUS[swap.status].toLowerCase()}
          </span>
        </div>
      ),
    }));
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
