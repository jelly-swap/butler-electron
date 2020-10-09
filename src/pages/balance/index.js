import React from 'react';
import ContentWrapper from '../../components/common/ContentWrapper';
import EmptyPage from '../../components/common/EmptyPage';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import PageWrapper from '../../components/common/PageWrapper';
import { useApp } from '../../context/AppContext';

import { useBalanceTable } from '../../hooks/useBalanceTable';

import './style.scss';

export default () => {
  const [table, isLoading] = useBalanceTable();

  const [app] = useApp();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <PageWrapper>
      <Header displayNav={true} />
      <ContentWrapper>
        {!app.serverStarted && <EmptyPage />}
        {!isLoading && (
          <div className='balance-of-wrapper'>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props

                      <th {...column.getHeaderProps(column?.getSortByToggleProps())}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
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
      <Footer />
    </PageWrapper>
  );
};
