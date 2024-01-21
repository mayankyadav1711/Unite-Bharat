import React, { useState, useEffect, useContext } from 'react';
import { ChartsHeader, Pie as PieChart } from '../../components';
import { UserContext } from '../../App';

const AdminPieChart = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchProjectDomainDistribution = async () => {
      try {
        let apiEndpoint = '/project-domain-distribution';

        if (state?.usertype === 'university') {
          apiEndpoint = `/university-project-domain-distribution/${state?._id}`;
        }

        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setPieChartData(data);
      } catch (error) {
        console.error('Error fetching project domain distribution:', error);
      }
    };

    fetchProjectDomainDistribution();
  }, [state?.usertype]);

  const formattedPieChartData = pieChartData.map((item) => ({
    ...item,
    x: item.x.charAt(0).toUpperCase() + item.x.slice(1).toLowerCase(),
  }));

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-orange-50 dark:bg-secondary-dark-bg rounded-3xl fixed">
      <ChartsHeader  title={state?.usertype === 'university' ? 'University Project Domain Distribution' : 'Admin Project Domain Distribution'} />
      <div style={{width:'850px',marginLeft:'120px'}}>
        <PieChart id="chart-pie" data={formattedPieChartData} legendVisiblity height="350" />
      </div>
    </div>
  );
};

export default AdminPieChart;
