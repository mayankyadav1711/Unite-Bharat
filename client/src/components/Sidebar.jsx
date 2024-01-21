import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

import { Link, NavLink } from 'react-router-dom';
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart } from 'react-icons/fi';
import { BsKanban, BsBarChart } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiStockLine } from 'react-icons/ri';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { GiLouvrePyramid } from 'react-icons/gi';
import { useStateContext } from '../contexts/ContextProvider';
import {
  BsPeople,
  BsPerson,
  BsBuilding,
  BsFileText,
  BsGeoAlt,
  BsBriefcase,
  BsEnvelope,
} from "react-icons/bs";

const Sidebar = () => {
  const { state } = useContext(UserContext);
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  // Define static links with separate link name and link-to values
  const links = [
    {
      title: 'Dashboard',
      links: [
        {
          label: 'Basic Info',
          to: '/admin/admindashboardbasic',
          icon: <FiShoppingBag />,
        },
      ],
    },
    {
      title: 'Members',
      links: [
        {
          label: state?.usertype === 'university' ? 'Mentors' : 'University', // Adjusted label based on usertype
          to: '/admin/adminuniversitylist',
          icon: <BsBuilding />,
        },
        {
          label: 'Users',
          to: '/admin/adminuserslist',
          icon: <BsPeople />,
        },
      ],
    },
    {
      title: 'Analytics',
      links: [
        {
          label: 'Project Domain',
          to: '/admin/adminpiedomain',
          icon: <FiPieChart />,
        },
        {
          label: 'Project Method',
          to: '/admin/adminpiemethod',
          icon: <RiStockLine />,
        },
       
        {
          label: 'Tech vs Non-Tech',
          to: '/admin/adminstacked',
          icon: <AiOutlineBarChart />,
        },
        {
          label: "Trend Domain",
         to: "/admin/pyramid",
          icon: <GiLouvrePyramid />,
        },
        state?.usertype === 'admin' && {
          label: 'Top University',
          to: '/admin/color-mapping',
          icon: <BsBarChart />,
        },
        state?.usertype === 'admin' && {
          label: 'Top States',
          to: '/admin/color-mapping2',
          icon: <BsBarChart />,
        },
        state?.usertype === 'admin' && {
          label: 'Trending States',
          to: '/admin/color-mapping3',
          icon: <BsBarChart />,
        },
        state?.usertype === 'admin' && {
          label: 'Trending Technology',
          to: '/admin/line',
          icon: <BsBarChart />,
        },
      ].filter(Boolean), // Filter out falsy values to remove unwanted links
    },
    
    state?.usertype === 'admin' && {
      title: 'Alerts',
      links: [
        {
          label: 'Updates',
          to: '/admin/alerts',
          icon: <BsPeople />,
        },
      ],
    },
  ].filter(Boolean);

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10" style={{backgroundColor:'#fff'}}>
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Home</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={link.to}
                    key={link.label}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : link.bgColor || '',
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.label}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
