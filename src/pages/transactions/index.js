import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/common/ContentWrapper';
import Header from '../../components/common/Header';
import PageWrapper from '../../components/common/PageWrapper';
import { useTransactionTable } from '../../hooks/useTxTable';

export default () => {
  const [table, isLoading] = useTransactionTable();

  const { getTableProps, getTableBodyProps, rows, prepareRow } = table;

  return (
    <PageWrapper>
      <Header displayNav={true} />
      <ContentWrapper>
        {!isLoading && (
          <div className='balance-of-wrapper'>
            <table {...getTableProps()}>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};
