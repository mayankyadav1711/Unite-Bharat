import React, { useState, useEffect, useContext } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { UserContext } from "../App";

const AdminUserList = () => {
  const [usersData, setUsersData] = useState([]);
  const { state } = useContext(UserContext);
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (state?.usertype === "admin") {
          const response = await fetch("https://api-sankalp.vercel.app/students-and-mentors");
          const data = await response.json();
          setUsersData(data);
        } else if (state?.usertype === "university") {
          const universityId = state?.university;

          if (universityId) {
            const response = await fetch(
              `/students-for-university/${universityId}`
            );
            const data = await response.json();
            setUsersData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [state?.usertype, state?._id]);

  return (
    <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-orange-50 rounded-3xl fixed" style={{width:'1050px',textAlign:'left'}}>
      <Header  title="Users" />
      <GridComponent
        dataSource={usersData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageSize: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* Define your columns based on the actual properties of your User model */}
          <ColumnDirective
            headerText="Profile Pic"
            template={(props) => (
              <img
                src={props.profilePic}
                alt="Profile Pic"
                style={{ width: "50px", height: "50px" }}
              />
            )}
          />{" "}
          <ColumnDirective field="name" headerText="Name" />
          <ColumnDirective field="email" headerText="Email" />
          {state?.usertype === 'admin' && (
        <ColumnDirective field="university" headerText="University" />
      )}
          {/* Add other columns as needed */}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default AdminUserList;
