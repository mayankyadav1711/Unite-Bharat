import React, { useState, useEffect, useContext } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, SplineAreaSeries, Legend } from '@syncfusion/ej2-react-charts';
import { UserContext } from '../../App';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
export const areaPrimaryXAxis = {
  valueType: "Category", // Change valueType to Category for categorical data
  edgeLabelPlacement: "Shift",
  labelIntersectAction: "Rotate45", // You can adjust this based on your preference
  title: "Domain", // Update the title to reflect the X-axis data
  intervalType: "Category",

};

export const areaPrimaryYAxis = {
  title: "Likes", // Update the title to reflect the Y-axis data
  labelFormat: "{value}",
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: "gray" },
  interval: 1,

};

const Area = () => {
  const { state } = useContext(UserContext);
  const [areaChartData, setAreaChartData] = useState([]);

  useEffect(() => {
    const fetchAreaChartData = async () => {
      try {
        let apiEndpoint = '/top-projects-by-likes';
  
        if (state?.usertype === 'university') {
          const universityId = state?._id;
          apiEndpoint = `/university-top-projects-by-likes/${universityId}`;
        }
  
        const response = await fetch(apiEndpoint);
        const data = await response.json();
  
        console.log('API Response:', response);
        console.log('Fetched Data:', data); // Log the fetched data
  
        setAreaChartData(data);
      } catch (error) {
        console.error('Error fetching top projects by likes:', error);
      }
    };
  
    fetchAreaChartData();
  }, [state?.usertype, state?._id]);
  

  const { currentMode } = useStateContext();
 
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={areaChartData}
              xName="_id" // Assuming your data has a property 'x' for the x-axis
              yName="likes" // Assuming your data has a property 'y' for the y-axis
              type="SplineArea"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Area;
