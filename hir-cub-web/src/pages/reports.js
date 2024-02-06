import React, { useState } from 'react';
import { HeadingBlock, MyNotes, ReportsBlock } from '~/components/reports';

function Reports() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isSearching, setSearching] = useState(false);

  return (
    <div className="intake-manager-page reports-page page-has-separate-bg md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container">
        <HeadingBlock
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          setSearching={setSearching}
        />
        <div className="report-content">
          <MyNotes />
          <ReportsBlock dateFrom={dateFrom} dateTo={dateTo} isSearching={isSearching} />
        </div>
      </div>
    </div>
  );
}

export default Reports;
