import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineUnorderedList, AiOutlineShoppingCart } from 'react-icons/ai'; // Import icons from React Icons

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {/* Add Items */}
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/add"
        >
          <AiOutlinePlus className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/list"
        >
          <AiOutlineUnorderedList className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/orders"
        >
          <AiOutlineShoppingCart className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
