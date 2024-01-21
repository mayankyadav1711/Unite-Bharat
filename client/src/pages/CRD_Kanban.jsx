import React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';

import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

const CRD_Kanban = () => (
  <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-orange-50 rounded-3xl">
    <Header category="App" title="Kanban" />
    <KanbanComponent style={{backgroundColor:'#fff7ed'}}
      id="kanban"
      keyField="Status"
      dataSource={kanbanData}
      cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
    </KanbanComponent>
  </div>
);

export default CRD_Kanban;
