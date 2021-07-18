import React, { useState } from 'react';
import { H2 } from './components/Typography/Typography';
import { Filter } from './components/Filter/Filter';
import { BestCustomersTable } from './patterns/BestCustomersTable';
import { LatestInvoicesTable } from './patterns/LatestInvoicesTable';
import { PeriodFilter, ValueTypeFilter } from './constant';
import './App.css';

const PERIOD_FILTER = Object.keys(PeriodFilter);
const VALUE_TYPE_FILTER = Object.keys(ValueTypeFilter);

function App() {
  const [period, setPeriod] = useState<PeriodFilter>(PeriodFilter.month);
  const [valueType, setValueType] = useState<ValueTypeFilter>(
    ValueTypeFilter.revenue
  );

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="title">Statistics</h1>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <section className="row">
            <div className="col">
              <Filter
                filters={PERIOD_FILTER}
                selectedFilter={period}
                onFilterSelected={setPeriod}
              />
            </div>
            <div className="col">
              <Filter
                filters={VALUE_TYPE_FILTER}
                selectedFilter={valueType}
                onFilterSelected={setValueType}
              />
            </div>
          </section>

          <section className="row">
            <div className="col-12">
              <H2>Latest invioces</H2>
              <LatestInvoicesTable valueType={valueType} />
            </div>
          </section>

          <section className="row">
            <div className="col-12">
              <H2>Our best customers</H2>
              <BestCustomersTable valueType={valueType} />
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          Copyright {new Date().getFullYear()} by sn1
        </div>
      </footer>
    </>
  );
}

export default App;
