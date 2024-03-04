import React, { useEffect, useState } from 'react';
//import { toast } from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import  Select from 'react-select'
import { fetchbarndAction } from '../../../redux/slices/brandSlice';
import { fetchCategoriesAction } from '../../../redux/slices/categorySlice';
import { fetchColorsAction } from '../../../redux/slices/colorSlice';
import { createProductAction } from '../../../redux/slices/ProductSlice';

function AddProduct() {
    const dispatch=useDispatch()
    const sizes = [
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
        { value: 'XXL', label: 'XXL' },
      ];

      const categories=[{}]
      const colors=[{}]
      const brands=[{}]

      const [files,setFiles]=useState([])
      const [brandform,setBrandform]=useState(null)
      const [categoryform,setCategoryform]=useState(null)
      const [sizefrom,setSizeform]=useState(null)
      const [colorform,setColorform]=useState(null)


      const [producData,setProductData]=useState({
        name:'',
        description:'',
        brand:'',
        category:'',
        size:'',
        colors:'',
        price:0,
        totalQty:0,
        

      })

      useEffect(()=>{
        dispatch(fetchCategoriesAction())
        dispatch(fetchColorsAction())
        dispatch(fetchbarndAction())
      },[dispatch])

    const category= useSelector((state)=>state.category.categories.category)
    //console.log(category);

    const color= useSelector((state)=>state.colors.colors.color)
    //console.log(colors);

    const brand= useSelector((state)=>state.brands.brands.brands)
    //console.log(brand);

    category?.map((item)=>(
        categories.push({value:item?.name,label:item?.name})
    ))

    color?.map((item)=>(
      colors.push({value:item?.color,label:item?.color})
  ))

  brand?.map((item)=>(
    brands.push({value:item?.name,label:item?.name})
))
    //console.log(categories)

const handelFiles=(e)=>{
  e.preventDefault(); 
  const newfiles=Array.from(e.target.files)
  // const files=[]
  // newfiles.forEach((file)=>{
  //   if(file?.size>1000000){
  //     toast.error('file is too large')
  //   }
  //   else if(!file?.type?.startsWith('image/')){
  //     toast.error('select images only')
      
  //   }
  //   else{
  //    files.push(newfiles)
  //   }
  // })
  setFiles(newfiles)
}

const handelFormdata=(e)=>{
  e.preventDefault();
  const {name,value}=e.target
  setProductData({
    ...producData,
    [name]:value
  }) 
}

const handelSubmit=(e)=>{
  e.preventDefault();
  const data={
    ...producData,
    brand:brandform.value,
    category:categoryform.value,
    size:sizefrom.map((item)=>item?.value),
    colors:colorform.map((item)=>item?.value),
    files

  }
  dispatch(createProductAction(data))
  //console.log(data);
  
}

  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto light mt-2 mb-2">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-black-200 mb-4">New Product</h2>

          <form className="flex flex-col" onSubmit={handelSubmit}>
            <input
              placeholder="name"
              className="bg-white-700 text-black-200 border-1 rounded-md p-2 mb-4 focus:bg-white-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text" name='name' onChange={handelFormdata}
            />

            <div style={{marginBottom:20}}>
            <Select options={brands} placeholder='brand' isSearchable name='brand' onChange={setBrandform} />
            </div>

            <div style={{marginBottom:20}}>
            <Select options={categories} placeholder='category' isSearchable name='category' onChange={setCategoryform}/>
            </div>
            
            
            <div style={{marginBottom:20}}>
            <Select options={sizes} isMulti isClearable isSearchable placeholder="sizes" onChange={setSizeform} />
            </div>

            <div style={{marginBottom:20}}>
            <Select options={colors} isMulti isClearable isSearchable placeholder="colors" name='colors' onChange={setColorform} />
            </div>

            <input
              placeholder="Price"
              className="bg-white-700 text-black-200 border-1 rounded-md p-2 mb-4 focus:bg-white-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number" name='price' onChange={handelFormdata}
            />
            <input
              placeholder="totalQty"
              className="bg-white-700 text-black-200 border-1 rounded-md p-2 mb-4 focus:bg-white-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number" name='totalQty' onChange={handelFormdata}
            />
            
            <textarea
              placeholder="description"
              className="bg-white-700 text-black-200 border-1 rounded-md p-2 mb-4 focus:bg-white-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              name="description" onChange={handelFormdata}
            ></textarea>

            <input placeholder="photos" className="bg-white-700 text-black-200 border-0 rounded-md p-2 mb-4 focus:bg-white-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="file" multiple onChange={handelFiles} />


            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit" onClick={handelSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
