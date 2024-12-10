import React,{useContext,useState,useEffect} from 'react'
import { ShopContext } from '../context/shopcontext'
import { assets } from '../assets/assets';
import { useLoaderData, useLocation } from 'react-router-dom';
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = () => {

    const {search, setSearch, showSearch,setShowSearch} = useContext(ShopContext) ;
    const location = useLocation();
    const [visible,setVisible] = useState(false) ;

    useEffect(() => {
        if(location.pathname.includes('collection')){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },
      [location])
  return showSearch && visible ? (
    <div className="border-t border-b py-5 flex justify-center">
  <div className="relative w-11/12 sm:w-1/2">
    {/* Search Input */}
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full py-2 px-4 pl-10 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300 text-sm"
      type="text"
      placeholder="Search for products..."
    />
    
    {/* Search Icon */}
    <FaSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />

    {/* Close Icon */}
    <FaTimes
      onClick={() => setShowSearch(false)}
      className="absolute right-3 top-2.5 text-gray-500 w-5 h-5 cursor-pointer hover:text-red-500 transition ease-in-out"
    />
  </div>
</div>
  ) : null
}

export default SearchBar
