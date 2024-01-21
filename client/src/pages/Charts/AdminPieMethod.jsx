import React, { useState, useEffect, useContext } from 'react';
import { ChartsHeader, Pie as PieChart } from '../../components';
import { UserContext } from '../../App';

const AdminPieMethod = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchProjectMethodDistribution = async () => {
      try {
        let apiEndpoint = '/project-method-type';
    
        if (state?.usertype === 'university') {
          const universityId = state?._id;
    
          // Include universityId in the API endpoint
          apiEndpoint = `/university-project-method-type/${universityId}`;
        }
    
        const response = await fetch(apiEndpoint);
        const data = await response.json();
    
        console.log('API Response:', response); // Log the entire response
        console.log('Parsed Data:', data); // Log the parsed data
    
        setPieChartData(data);
      } catch (error) {
        console.error('Error fetching project method distribution:', error);
      }
    };
    

    fetchProjectMethodDistribution();
  }, [state?.usertype, state?._id]);

  const formattedPieChartData = pieChartData.map((item) => ({
    ...item,
    x: item.x.charAt(0).toUpperCase() + item.x.slice(1).toLowerCase(),
  }));

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-orange-50 dark:bg-secondary-dark-bg rounded-3xl fixed">
      <ChartsHeader  title="Project Method Distribution" />
      <div style={{width:'850px',marginLeft:'120px'}}>
        <PieChart id="chart-pie" data={formattedPieChartData} legendVisiblity height="350" />
      </div>
    </div>
  );
};

export default AdminPieMethod;
