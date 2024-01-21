import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, Tooltip, Legend, RangeColorSettingsDirective, RangeColorSettingDirective } from '@syncfusion/ej2-react-charts';
import { ChartsHeader } from '../../components';

const ColorMapping = () => {
  const [universitiesData, setUniversitiesData] = useState([]);

  useEffect(() => {
    const fetchTopUniversities = async () => {
      try {
        const response = await fetch('/top-universities-with-most-projects');
        const data = await response.json();

        console.log('API Response:', response);
        console.log('Parsed Data:', data);

        setUniversitiesData(data);
      } catch (error) {
        console.error('Error fetching top universities with most projects:', error);
      }
    };

    fetchTopUniversities();
  }, []);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-orange-50 dark:bg-secondary-dark-bg rounded-3xl fixed">
      <ChartsHeader category="Color Mapping" title="Top 8 Universities with Most Projects" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={{
            title: 'University',
            valueType: 'Category',
            labelIntersectAction: 'Rotate45',
          }}
          primaryYAxis={{
            title: 'Number of Projects',
           
          }}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ mode: 'Range', background: 'white' }}
          tooltip={{ enable: true }}
          background="#fff7ed"
          height="400"
          width='1000'
        >
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={universitiesData}
              name="Universities"
              xName="university"
              yName="projects"
              type="Column"
              cornerRadius={{
                topLeft: 10,
                topRight: 10,
              }}
            />
          </SeriesCollectionDirective>
          <RangeColorSettingsDirective>
            {/* Define your range color settings if needed */}
          </RangeColorSettingsDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default ColorMapping;
