import React from 'react';
import ContentWrapper from '../../components/common/ContentWrapper';
import EmptyPage from '../../components/common/EmptyPage';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import PageWrapper from '../../components/common/PageWrapper';
import StopButton from '../../components/StopButton';
import { useApp } from '../../context/AppContext';
import { useTransactionTable } from '../../hooks/useTxTable';

import './_style.scss';

export default () => {
  const [table] = useTransactionTable();
  const [app] = useApp();

  const { getTableProps, getTableBodyProps, rows, prepareRow } = table;

  return (
    <PageWrapper>
      <Header displayNav={true} />
      <ContentWrapper>
        {!app.serverStarted ? (
          <EmptyPage />
        ) : (
          <div className='transaction-wrapper'>
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
      <Footer>{app.serverStarted && <StopButton />}</Footer>
    </PageWrapper>
  );
};
