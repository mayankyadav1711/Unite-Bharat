import React from 'react';
import { GanttComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-gantt';
import {Page} from '@syncfusion/ej2-react-grids';
const projectData = [
  {
    TaskID: 1,
    TaskName: 'Project Initiation',
    StartDate: new Date('01/01/2023'),
    EndDate: new Date('01/21/2023'),
    subtasks: [
      { TaskID: 2, TaskName: 'Define Project Scope', StartDate: new Date('01/02/2023'), Duration: 3, Progress: 20 },
      { TaskID: 3, TaskName: 'Conduct Market Research', StartDate: new Date('01/05/2023'), Duration: 5, Progress: 30, Predecessor: '2FS' },
      { TaskID: 4, TaskName: 'Create Project Plan', StartDate: new Date('01/10/2023'), Duration: 7, Progress: 40, Predecessor: '3FS' },
      { TaskID: 5, TaskName: 'Secure Funding', StartDate: new Date('01/15/2023'), Duration: 5, Progress: 15, Predecessor: '4FS' },
    ],
  },
  {
    TaskID: 6,
    TaskName: 'Design Phase',
    StartDate: new Date('01/22/2023'),
    EndDate: new Date('02/15/2023'),
    subtasks: [
      { TaskID: 7, TaskName: 'Create Wireframes', StartDate: new Date('01/23/2023'), Duration: 5, Progress: 50 },
      { TaskID: 8, TaskName: 'Design UI/UX', StartDate: new Date('01/28/2023'), Duration: 8, Progress: 40, Predecessor: '7FS' },
      { TaskID: 9, TaskName: 'Develop Prototypes', StartDate: new Date('02/05/2023'), Duration: 7, Progress: 30, Predecessor: '8FS' },
    ],
  },
  {
    TaskID: 10,
    TaskName: 'Development Phase',
    StartDate: new Date('02/16/2023'),
    EndDate: new Date('03/20/2023'),
    subtasks: [
      { TaskID: 11, TaskName: 'Setup Development Environment', StartDate: new Date('02/17/2023'), Duration: 5, Progress: 60 },
      { TaskID: 12, TaskName: 'Backend Development', StartDate: new Date('02/22/2023'), Duration: 12, Progress: 30, Predecessor: '11FS' },
      { TaskID: 13, TaskName: 'Frontend Development', StartDate: new Date('03/06/2023'), Duration: 10, Progress: 40, Predecessor: '12FS' },
      { TaskID: 14, TaskName: 'Integration and Testing', StartDate: new Date('03/16/2023'), Duration: 5, Progress: 20, Predecessor: '13FS' },
    ],
  },
  {
    TaskID: 15,
    TaskName: 'Deployment and Launch',
    StartDate: new Date('03/21/2023'),
    EndDate: new Date('04/05/2023'),
    subtasks: [
      { TaskID: 16, TaskName: 'Deploy to Server', StartDate: new Date('03/22/2023'), Duration: 3, Progress: 70 },
      { TaskID: 17, TaskName: 'Final Testing', StartDate: new Date('03/25/2023'), Duration: 5, Progress: 50, Predecessor: '16FS' },
      { TaskID: 18, TaskName: 'Launch Website', StartDate: new Date('04/02/2023'), Duration: 3, Progress: 80, Predecessor: '17FS' },
    ],
  },
  // Add more phases and tasks as needed
];

function CRD_GanttChart() {
  const taskValues = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks',
    dependency: 'Predeceesor',
    color:'#fff7ed'
  };

  return (
    <div style={{backgroundColor:'#fff7ed',margin:'20px',padding:'20px',borderRadius:'10px'}}>
      <GanttComponent dataSource={projectData} taskFields={taskValues} allowPaging
    pageSettings={{ pageSize: 5 }}>
        <ColumnsDirective>
          <ColumnDirective field="TaskID" headerText="ID" style={{backgroundColor:'#fff7ed'}} />
          <ColumnDirective field="TaskName" headerText="Name" />
          <ColumnDirective field="StartDate" format="dd-MMM-yy" />
          <ColumnDirective field="Duration" textAlign="Right" />
        </ColumnsDirective>
        <Inject services={[Edit, Toolbar,Page]} />
      </GanttComponent>
    </div>
  );
}

export default CRD_GanttChart;
