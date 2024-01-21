import React, { useState, useEffect, useContext } from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection } from '@syncfusion/ej2-react-charts';
import { UserContext } from '../../App';

import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Pyramid = () => {
  const { currentMode} = useStateContext();
  const [pyramidChartData, setPyramidChartData] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchPyramidChartData = async () => {
      try {
        let apiEndpoint = '/top-projects-by-likes';

        if (state?.usertype === 'university') {
          const universityId = state?._id;
          apiEndpoint = `/university-top-projects-by-likes/${universityId}`;
        }

        const response = await fetch(apiEndpoint);
        const data = await response.json();

        console.log('API Response:', response);
        console.log('Fetched Data:', data);

        setPyramidChartData(data);
      } catch (error) {
        console.error('Error fetching pyramid chart data:', error);
      }
    };

    fetchPyramidChartData();
  }, [state?.usertype, state?._id]);

  return (
    <div className="m-4 md:m-10 mt-24  p-10 bg-orange-50 dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Pyramid" title="Trending Domains" />
      <div className="w-full">
        <AccumulationChartComponent
          id="pyramid-chart"
          legendSettings={{ background: '#fff7ed' }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff7ed'}
        >
          <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationLegend, AccumulationSelection]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              name="Domain"
              dataSource={pyramidChartData}
              xName="_id"
              yName="likes"
              type="Pyramid"
              width="45%"
              height="80%"
              neckWidth="15%"
              gapRatio={0.03}
              explode
              emptyPointSettings={{ mode: 'Drop', fill: 'red' }}
              dataLabel={{
                visible: true,
                position: 'Inside',
                name: 'text',
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default Pyramid;
