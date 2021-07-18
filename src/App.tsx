import React, { useState } from 'react';
import {Filter} from './components/Filter/Filter'
import './App.css';

const PERIOD_FILTER = ['week', 'month']
const VALUE_TYPE_FILTER = ['revenue', 'margin']

function App() {
  const [period, setPeriod] = useState(PERIOD_FILTER[0])
  const [valueType, setValueType] = useState(VALUE_TYPE_FILTER[0])

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
              <Filter filters={PERIOD_FILTER} selectedFilter={period} onFilterSelected={setPeriod} />
            </div>
            <div className="col">
              <Filter filters={VALUE_TYPE_FILTER} selectedFilter={valueType} onFilterSelected={setValueType} />
            </div>
          </section>

          <section>
            {period}
            {valueType}
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="container">Copyright {new Date().getFullYear()} by sn1</div>
      </footer>
    </>
  );
}

export default App;
