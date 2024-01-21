import React from 'react';

import { ChartsHeader, Stacked as StackedChart } from '../../components';

const AdminStacked = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-orange-50 dark:bg-secondary-dark-bg rounded-3xl fixed">
    <ChartsHeader  title="Project Type Breakdown" />
    <div style={{width:'760px',marginLeft:'200px'}}>
      <StackedChart />
    </div>
  </div>
);

export default AdminStacked;
