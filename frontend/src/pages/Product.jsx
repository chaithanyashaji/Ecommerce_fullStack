import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopcontext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa'; 
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";// Importing person icon

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showDescription, setShowDescription] = useState(true); // Toggle between Description and Reviews

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/review/${productId}/showreviews`);
      const data = response.data;

      if (data.success) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      } else {
        console.error("Failed to fetch reviews:", data.message);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId, products]);

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

  // Generate filled and empty stars based on average rating
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
  

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {generateStars(averageRating)}
            <p className="pl-2">{totalReviews}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews Tabs */}
      <div className="mt-20">
        <div className="flex border-b text-sm">
          <button
            onClick={() => setShowDescription(true)}
            className={`${showDescription ? 'border-2 border-black' : ''}`}
          >
            <div className="px-4 py-2 border">Description</div>
          </button>
          <button
            onClick={() => setShowDescription(false)}
            className={`${!showDescription ? 'border-2 border-black' : ''}`}
          >
            <div className="px-4 py-2 border">Reviews ({totalReviews})</div>
          </button>
        </div>

        {/* Description or Reviews Display */}
        {showDescription ? (
          <div className="px-6 py-6">
            <p>{productData.description}</p>
          </div>
        ) : (
          <div className="px-6 py-6">
            
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="border-b py-4">
                  <div className="flex items-center gap-2">
                    <FaUserAlt className="w-4 h-4 text-gray-600" />
                    <p className="font-medium">{review.userId.name}</p>
                  </div>
                  <div className="flex gap-1">
                    {generateStars(review.rating)} {/* Display review stars */}
                  </div>
                  <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
                  <p>{review.comment}</p>
                  
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
