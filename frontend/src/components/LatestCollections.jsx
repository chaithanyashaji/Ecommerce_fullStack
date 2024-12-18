import React,{useContext,useEffect,useState} from 'react'
import { ShopContext } from '../context/shopcontext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollections = () => {


    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
      },
    [products])
    

 
    
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST '} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores excepturi tenetur ea sunt quis delectus autem asperiores pariatur, maxime expedita ut quasi, cum molestias ipsum numquam? Adipisci minima cupiditate sint.
        </p>
      </div>

      {/*Rendering Products*/}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} rating={item.averageRating||0}/>
          ))
        }

      </div>
    </div>
  )
}

export default LatestCollections
