import React from "react";
import { BsBriefcase, BsGeoAlt, BsEnvelope } from "react-icons/bs";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';

const CRD_Dashboard = () => {
  // Replace the following with actual user data
  const adminProfiles = [
    {
      name: "LDRP University",
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/University%20LOGO%2Fldrp%20logo_HD.png?alt=media&token=1cf60479-c9b0-427d-b444-7858c21137ee",
      members: "4",
      state: "Gujarat",
      email: "ldrp@gmail.com",
    },
    {
      name: "Manipal University",
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/University%20LOGO%2FMU.png?alt=media&token=115e275f-b3f4-44ba-8ebd-d53baade10d9",
      members: "4",
      state: "Rajasthan",
      email: "manipal@gmail.com",
    },
  ];

  const universityUsers = [
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60112.png?alt=media&token=c5b4167b-a420-4f76-8825-6162108fa9ee",
      name: "Mayank Yadav",
      email: "mayank@gmail.com",
      university: "LDRP University",
    },
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60111.png?alt=media&token=a54494aa-013e-4221-9679-ab772fafb4ab",
      name: "Darshit Sojitra",
      email: "darshit@gmail.com",
      university: "LDRP University",
    },
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60111.png?alt=media&token=a54494aa-013e-4221-9679-ab772fafb4ab",
      name: "Harsh Sonaiya",
      email: "harsh@gmail.com",
      university: "LDRP University",
    },
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60111.png?alt=media&token=a54494aa-013e-4221-9679-ab772fafb4ab",
      name: "Vihar Talaviya",
      email: "vihar@gmail.com",
      university: "LDRP University",
    },
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60112.png?alt=media&token=c5b4167b-a420-4f76-8825-6162108fa9ee",
      name: "Divya Kaurani",
      email: "divya@gmail.com",
      university: "Manipal University",
    },
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60111.png?alt=media&token=a54494aa-013e-4221-9679-ab772fafb4ab",
      name: "Aastha Suthar",
      email: "aastha@gmail.com",
      university: "Manipal University",
    },
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60111.png?alt=media&token=a54494aa-013e-4221-9679-ab772fafb4ab",
      name: "Gaurav Tiwari",
      email: "gaurav@gmail.com",
      university: "Manipal University",
    },
    {
      profilePic: "https://firebasestorage.googleapis.com/v0/b/sankalp-3d847.appspot.com/o/Profile%2F60111.png?alt=media&token=a54494aa-013e-4221-9679-ab772fafb4ab",
      name: "Mit Patel",
      email: "mit@gmail.com",
      university: "Manipal University",
    },
  
    // Add more user data as needed
  ]
  const columns = [
    {
      headerText: "Profile Pic",
      template: (props) => (
        <img
          src={props.profilePic}
          alt="Profile Pic"
          style={{ width: "50px", height: "50px" }}
        />
      )
    },
    { field: "name", headerText: "Name" },
    { field: "email", headerText: "Email" },
    { field: "university", headerText: "University" },
    // Add more columns as needed
  ];
  return (
    <div>
  {/* CRD Dashboard (Top) */}
 
  <h2 className="text-4xl font-bold text-center mb-6">Project Id: #0001 || Project Name: Sankalp</h2>
  {/* Coollaborating University (Above the Boxes) */}
  <h2 className="text-2xl font-bold text-center mb-6">Collaborating University</h2>

  <div className="mt-24">
    <div className="flex flex-wrap lg:flex-nowrap justify-center">
      {adminProfiles.map((adminProfile, index) => (
        <div
          key={index}
          className="md:w-2/5 lg:bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
          style={{
            width: "488px",
            transition: "box-shadow 0.3s",
            backgroundColor:"#fff"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow =
              "0 20px 13px rgb(0 0 0 / 0.03), 0 8px 5px rgb(0 0 0 / 0.08)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow =
              "rgb(4 4 4 / 10%) 0px 2px 4px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px";
          }}
        >
          <div className="flex items-center mb-6">
            <div className="mr-4">
              <img
                src={adminProfile.profilePic}
                alt={`Admin Profile ${index + 1}`}
                className="w-36 h-36 rounded-full"
              />
            </div>
            <div>
              <p className="text-2xl font-semibold" style={{ marginBottom: "10px" }}>
                {adminProfile.name}
              </p>
              <div className="flex items-center text-gray-500 mb-2">
                <BsBriefcase className="mr-2" />
                <span className="font-bold">No of Members:</span> {adminProfile.members}
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <BsGeoAlt className="mr-2" />
                <span className="font-bold">State:</span> {adminProfile.state}
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <BsEnvelope className="mr-2" />
                <span className="font-bold">Email:</span> {adminProfile.email}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Team Members (Above the Table) */}
    <h2 className="text-2xl font-bold text-center mt-12 mb-6">Team Members</h2>

    <div className="m-3">
      <GridComponent
        dataSource={universityUsers}
        allowPaging
        pageSettings={{ pageSize: 10 }}
      >
        <ColumnsDirective>
          {columns.map((column) => (
            <ColumnDirective
              key={column.field}
              field={column.field}
              headerText={column.headerText}
              template={column.template}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>
    </div>
  </div>
</div>

 
 
  );
};

export default CRD_Dashboard;
