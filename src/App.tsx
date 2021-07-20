import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { H2 } from './components/Typography/Typography';
import { Filter } from './components/Filter/Filter';
import { BestCustomersTable } from './patterns/BestCustomersTable';
import { LatestInvoicesTable } from './patterns/LatestInvoicesTable';
import { RevenueChart } from './patterns/RevenueChart';
import { CummulativeRevenueChart } from './patterns/CummulativeRevenueChart';
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
      <Header />
      <main className="main">
        <div className="container">
          <section className="row filters">
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
            <div className="col-12 col-md-6">
              <H2>Latest invioces</H2>
              <LatestInvoicesTable valueType={valueType} />
            </div>
            <div className="col-12 col-md-6">
              <H2>Our best customers</H2>
              <BestCustomersTable valueType={valueType} />
            </div>
          </section>

          <section className="row">
            <div className="col-12 col-md-6">
              <H2>Total {valueType} per products categories</H2>
              <RevenueChart period={period} valueType={valueType} />
            </div>
            <div className="col-12 col-md-6">
              <H2>
                Cumulative invoices {valueType}/{period}
              </H2>
              <CummulativeRevenueChart period={period} valueType={valueType} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
