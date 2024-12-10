import React, { useContext } from 'react'
import { ShopContext } from '../context/shopcontext';
import {Link} from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const generateStars = (rating) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Number of half stars
  const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
  }

  // Add half star
  if (halfStars) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
  }

  return stars;
};

const ProductItem = ({id,image,name,price,rating}) => {

    const {currency} = useContext(ShopContext);
    return (
      <div className="shadow-lg p-3 rounded-md">
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
          {/* Product Image */}
          <div className="overflow-hidden rounded-md">
            <img
              className="hover:scale-110 transition-transform ease-in-out duration-300"
              src={image[0]}
              alt={name}
            />
          </div>
  
          {/* Product Details */}
          <p className="pt-3 pb-1 text-sm font-medium">{name}</p>
          <p className="text-sm font-semibold">
            {currency}
            {price}
          </p>
  
          {/* Rating */}
          <div className="flex gap-1 items-center text-sm mt-1">
            {generateStars(rating)}
          </div>
        </Link>
      </div>
    );
}

export default ProductItem
