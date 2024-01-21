import React, { useState, useEffect, useContext } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { UserContext } from '../App';

const AdminUniversityList = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [universityUsers, setUniversityUsers] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state?.usertype === 'admin') {
          const response = await fetch('https://api-sankalp.vercel.app/university-users');
          const data = await response.json();
          setUniversityUsers(data);
        } else if (state?.usertype === 'university') {
          const universityId = state?.university;

          if (universityId) {
            const response = await fetch(`https://api-sankalp.vercel.app/mentors-for-university/${universityId}`);
            const data = await response.json();
            setUniversityUsers(data);
          }
        }
      } catch (error) {
        console.error('Error fetching university users:', error);
      }
    };

    fetchData();
  }, [state?.usertype, state?._id]);

  return (
    <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-orange-50 rounded-3xl fixed" style={{textAlign:'left',width:'1050px'}} >
  <Header category="Members" title={state?.usertype === 'university' ? 'Mentor' : 'University'} />
  <GridComponent
    id="gridcomp"
    dataSource={universityUsers}
    allowPaging
    pageSettings={{ pageSize: 5 }}
    allowSorting
    allowExcelExport
    allowPdfExport
    editSettings={editing}
  >
    <ColumnsDirective>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {/* Adjust the columns as needed */}
      <ColumnDirective
        headerText="Profile Pic"
        template={(props) => (
          <img
            src={props.profilePic}
            alt="Profile Pic"
            style={{ width: "50px", height: "50px" }}
          />
        )}
      />
      <ColumnDirective field="name" style={{   textAlign: 'center',}} headerText="Name" />
      {state?.usertype === 'admin' && (
        <ColumnDirective field="accreditation" headerText="Accreditation" />
      )}
      {state?.usertype === 'university' && (
        <ColumnDirective field="email" headerText="Email" />
      )}
      <ColumnDirective field="nameofstate" headerText="State" />
      {/* Add other columns as needed */}
    </ColumnsDirective>
    <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
  </GridComponent>
</div>

  );
};

export default AdminUniversityList;
