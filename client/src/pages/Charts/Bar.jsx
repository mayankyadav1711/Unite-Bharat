import React, { useState, useEffect, useContext } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import { ChartsHeader } from '../../components';
import { UserContext } from '../../App';

const Bar = () => {
  const { state } = useContext(UserContext);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchTopDomainsWithMostLikes = async () => {
      try {
        let apiEndpoint = '/top-domains-with-most-likes';

        if (state?.usertype === 'university') {
          const universityId = state?._id;
          apiEndpoint = `/university-top-domains-with-most-likes/${universityId}`;
        }

        const response = await fetch(apiEndpoint);
        const data = await response.json();

        console.log('API Response:', response); // Log the entire response
        console.log('Parsed Data:', data); // Log the parsed data

        setBarData(data);
      } catch (error) {
        console.error('Error fetching top domains with most likes:', error);
      }
    };

    fetchTopDomainsWithMostLikes();
  }, [state?.usertype, state?._id]);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-orange-50 dark:bg-secondary-dark-bg rounded-3xl fixed">
      <ChartsHeader category="Bar" title="Top Domains with Most Likes" />
      <div style={{width:'200px',marginLeft:'-30px'}}>
        <ChartComponent
          id="charts"
          primaryXAxis={{ title: 'Domain', valueType: 'Category' }}
          primaryYAxis={{ title: 'Likes' }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background="#fff7ed"
          legendSettings={{ background: '#fff7ed' }}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={barData} xName="domain" yName="likes" type="Column" name="Likes" />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;
