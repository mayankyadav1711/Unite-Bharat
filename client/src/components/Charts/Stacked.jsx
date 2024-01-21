import React, { useState, useEffect, useContext } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { UserContext } from "../../App";

const Stacked = ({ width, height }) => {
  const { state } = useContext(UserContext);

  const [stackedData, setStackedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiEndpoint = 'https://api-sankalp.vercel.app/project-tech-vs-non-tech-breakdown';
    
        if (state?.usertype === 'university') {
          const universityId = state?._id;
          apiEndpoint = `https://api-sankalp.vercel.app/university/project-tech-vs-non-tech-breakdown/${universityId}`;
        }
    
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        // Add a unique identifier to each category
        const processedData = data.map((item, index) => ({
          ...item,
          
          uniqueId: index === 0 ? 'Tech' : 'Non Tech',
        }));

        setStackedData(processedData);
      } catch (error) {
        console.error('Error fetching stacked data:', error);
      }
    };

    fetchData();
  }, []);

  const tooltipSettings = {
    enable: true,
    format: '${point.x} : ${point.y} Projects',
  };

  return (
    <ChartComponent
      id="charts"
      primaryXAxis={{
        valueType: 'Category',
        title: 'Category',
        labelIntersectAction: 'Rotate90',
        interval: 1, // Ensure all labels are displayed
      }}
      primaryYAxis={{ title: 'Projects' }}
      width={width}
      height={height}
      chartArea={{ border: { width: 0.1 } }}
      tooltip={tooltipSettings}
      background="#fff7ed"
      legendSettings={{ background: '#fff7ed' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={stackedData} xName="uniqueId" yName="y" type="StackingColumn" name="Projects" />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
