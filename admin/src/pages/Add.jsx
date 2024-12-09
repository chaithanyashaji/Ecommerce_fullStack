import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';



const Add = ({token}) => {

const [image1,setImage1] = useState(null);
const [image2,setImage2] = useState(null);
const [image3,setImage3] = useState(null);
const [image4,setImage4] = useState(null);

const [name,setName] = useState("");
const[description,setDescription] = useState("");
const[price,setPrice]=useState("");
const[category,setCategory] = useState("Men");
const[subCategory,setSubCategory] = useState("Topwear");
const[bestseller,setBestseller] = useState(false); 
const[sizes,setSizes] = useState([]);

const onSubmitHandler= async(e)=>{
    e.preventDefault();
    try{

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('bestseller', bestseller);
        formData.append('sizes', JSON.stringify(sizes));

        image1 && formData.append("image1",image1)
        image2 && formData.append("image2",image2)
        image3 && formData.append("image3",image3)
        image4 && formData.append("image4",image4)

        const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{token}})
        if(response.data.success) {
            toast.success(response.data.message);
            setName("");
            setDescription("");
            setPrice("");
            setCategory("Men");
            setSubCategory("Topwear");
            setBestseller(false);
            setSizes([]);
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
        }else{
            toast.error(response.data.message);
        }
        console.log(response.data);
        
    }catch(error){

    }

}

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className="flex gap-2">
          {/* Image Upload 1 */}
          <label htmlFor="image1" className="cursor-pointer">
  {!image1 ? (
    <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md">
      <i className="fas fa-upload text-gray-500 text-xl"></i>
    </div>
  ) : (
    <img
      src={URL.createObjectURL(image1)}
      alt="Uploaded Preview"
      className="w-20 h-20 object-cover rounded-md"
    />
  )}
  <input
    onChange={(e) => setImage1(e.target.files[0])}
    type="file"
    id="image1"
    hidden
  />
</label>


          {/* Image Upload 2 */}
          <label htmlFor="image2" className="cursor-pointer">
  {!image2 ? (
    <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md">
      <i className="fas fa-upload text-gray-500 text-xl"></i>
    </div>
  ) : (
    <img
      src={URL.createObjectURL(image2)}
      alt="Uploaded Preview"
      className="w-20 h-20 object-cover rounded-md"
    />
  )}
  <input
    onChange={(e) => setImage2(e.target.files[0])}
    type="file"
    id="image2"
    hidden
  />
</label>

          {/* Image Upload 3 */}
          <label htmlFor="image3" className="cursor-pointer">
  {!image3 ? (
    <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md">
      <i className="fas fa-upload text-gray-500 text-xl"></i>
    </div>
  ) : (
    <img
      src={URL.createObjectURL(image3)}
      alt="Uploaded Preview"
      className="w-20 h-20 object-cover rounded-md"
    />
  )}
  <input
    onChange={(e) => setImage3(e.target.files[0])}
    type="file"
    id="image3"
    hidden
  />
</label>

          {/* Image Upload 4 */}
          <label htmlFor="image4" className="cursor-pointer">
  {!image4 ? (
    <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md">
      <i className="fas fa-upload text-gray-500 text-xl"></i>
    </div>
  ) : (
    <img
      src={URL.createObjectURL(image4)}
      alt="Uploaded Preview"
      className="w-20 h-20 object-cover rounded-md"
    />
  )}
  <input
    onChange={(e) => setImage4(e.target.files[0])}
    type="file"
    id="image4"
    hidden
  />
</label>
        </div>
      </div>

      <div className='w-full'>
        <p>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full max-w-[500px] px-3 py-2" placeholder="Enter product name" required />
      </div>

      <div className='w-full'>
        <p>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} type="text" className="w-full max-w-[500px] px-3 py-2" placeholder="Write content here" required />
      </div>

       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>


      <div>
      <p className='mb-2'>Product Category</p>
        <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full  px-3 py-2 '>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
        </select>
        
      </div>


      <div >
      <p className='mb-2'>Sub Category</p>
        <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full  px-3 py-2 '>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
        </select>
      </div>


        <div>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='Number' placeholder='Rs'/>
        </div>
        
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
            <div onClick={()=>setSizes(prev=>prev.includes("S")? prev.filter(item=>item!=="S"):[...prev,"S"])}>
                <p className={`${sizes.includes("S")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("M")? prev.filter(item=>item!=="M"):[...prev,"M"])} >
                <p className={`${sizes.includes("M")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("L")? prev.filter(item=>item!=="L"):[...prev,"L"])}>
                <p className={`${sizes.includes("L")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("XL")? prev.filter(item=>item!=="XL"):[...prev,"XL"])}>
                <p className={`${sizes.includes("XL")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`} >XL</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("XXL")? prev.filter(item=>item!=="XXL"):[...prev,"XXL"])}>
                <p className={`${sizes.includes("XXL")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`} >XXL</p>
            </div>
        </div>
        </div>
        <div className='flex gap-2 mt-2'>
            <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type='checkbox' id='bestseller'/>
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>
        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
      

      
    </form>
  );
};

export default Add;
