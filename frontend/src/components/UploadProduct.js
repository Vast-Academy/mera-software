import React, { useEffect, useState } from 'react'
import { CgClose } from "react-icons/cg";
// import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import Select from 'react-select'
import packageOptions from '../helpers/packageOptions';
import perfectForOptions from '../helpers/perfectForOptions';
import defaultFields from '../helpers/defaultFields';
import RichTextEditor from '../helpers/richTextEditor';


const UploadProduct = ({
    onClose,
    fetchData
}) => {
  const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        serviceName : "",
        category : "",
        packageIncludes : "",
        perfectFor : "",
        serviceImage : [],
         price : "",
        sellingPrice : "",
        description : "",
        websiteTypeDescription : "",   
    })

     // Fetch categories when component mounts
     useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await fetch(SummaryApi.allCategory.url);
              const result = await response.json();
              if (result.success) {
                  setCategories(result.data);
              }
          } catch (error) {
              console.error("Error fetching categories:", error);
          }
      };
      fetchCategories();
  }, []);

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e)=> {
      const { name, value } = e.target

      setData((preve)=>{
         // If category changes, set defaults
    if (name === "category" && defaultFields[value]){
      return{
        ...preve,
        [name] : value,
        websiteTypeDescription : defaultFields[value].websiteTypeDescription,
      }
    }
     // Otherwise, just update the field
        return {
          ...preve,
          [name]: value,
        } 
      })
    }

    const handlePackageIncludesChange = (selectedOptions) => {
      setData((preve) => ({
        ...preve,
        packageIncludes: selectedOptions.map((option) => option.value),
      }));
    };
    
    // Add a new handler function for perfectFor
    const handlePerfectForChange = (selectedOptions) => {
      setData((preve) => ({
        ...preve,
        perfectFor: selectedOptions.map((option) => option.value),
      }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve)=>{
          return{
            ...preve,
            serviceImage : [ ...preve.serviceImage, uploadImageCloudinary.url]
          }
        })
    }

    const handleDeleteProductImage = async(index)=>{
      console.log("image index",index);

      const newProductImage = [...data.serviceImage]
      newProductImage.splice(index,1)

      setData((preve)=>{
        return{
          ...preve,
          serviceImage : [...newProductImage]
        }
      })
    }

    // upload product
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      const response = await fetch(SummaryApi.uploadProduct.url,{
        method : SummaryApi.uploadProduct.method,
        credentials : 'include',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      
      const responseData = await response.json()

      if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchData()
      }

      if(responseData.error){
        toast.error(responseData?.message)
      }
    }

    // Add this helper function
const shouldShowWebsiteFields = (category) => {
  const websiteCategories = ['static_websites', 'standard_websites', 'dynamic_websites'];
  return category && websiteCategories.includes(category);
};

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounder w-full max-w-2xl h-full max-h-[75%] overflow-hidden'>

      <div className='flex justify-between items-center pb-3'>
        <h2 className='font-bold text-lg'>Upload Service</h2>
        <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose/>
        </div>
      </div>

      <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
        <label htmlFor='serviceName'>Service Name :</label>
        <input 
        type='text' 
        id='serviceName'
        placeholder='enter service name'
        name='serviceName'
        value={data.serviceName}
        onChange={handleOnChange}
        className='p-2 bg-slate-100 border rounded'
        required
        />


        <label htmlFor='category' className='mt-3'>Service Category :</label>   
        <select required value={data.category} id='category' name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
        <option value="">Select Category</option>
            {categories.map((cat) => (
                <option 
                    value={cat.categoryValue} 
                    key={cat.categoryId}
                >
                    {cat.categoryName}
                </option>
            ))}
        </select> 

          {
            shouldShowWebsiteFields(data.category) && (
              <>
              <label htmlFor='packageIncludes' className='mt-3'>Package Includes:</label>
          <Select
            options={packageOptions}
            isMulti
            value={data.packageIncludes.map(value => {
            // Find the full option object for each selected value
            const option = packageOptions.find(opt => opt.value === value);
            return option;
          })}
            name='packageIncludes'
                id='packageIncludes'
            onChange={handlePackageIncludesChange}
            className='basic-multi-select bg-slate-100 border rounded'
            classNamePrefix='select'
            placeholder="Select package options"
          />

        <label htmlFor='perfectFor' className='mt-3'>Perfect For:</label>
            <Select
              options={perfectForOptions}
              isMulti
              value={data.perfectFor.map(value => {
              // Find the full option object for each selected value
              const option = perfectForOptions.find(opt => opt.value === value);
              return option;
            })}
               name='perfectFor'
                id='perfectFor'
              onChange={handlePerfectForChange}
              className='basic-multi-select bg-slate-100 border rounded'
              classNamePrefix='select'
              placeholder="Select target audience"
            />
              </>
            )
          }

        <label htmlFor='serviceImage' className='mt-3'>Service Image :</label> 
        <label htmlFor='uploadImageInput'>

        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
            <span className='text-4xl'><FaCloudUploadAlt/></span>
            <p className='text-sm'>Upload Product Image</p>
            <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
            </div>   
        </div>

        </label>
        <div>
        {
          data?.serviceImage[0] ? (
           <div className='flex items-center gap-2'>
            {
              data.serviceImage.map((el,index)=>{
              return(
               <div key={index} className='relative group'>
               <img 
                  src={el} 
                  alt={el} 
                  width={80} 
                  height={80} 
                  className='bg-slate-100 border cursor-pointer'
                  onClick={()=>{
                    setOpenFullScreenImage(true)
                    setFullScreenImage(el)
                  }} />

                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                    <MdDelete/>
                  </div>
               </div>
              )
            })
            }
           </div>
          ) : (
            <p className='text-red-600 text-xs'>* Please Upload Product Image</p>
          )
        }
            
        </div>

        <label htmlFor='price' className='mt-3'>Price :</label>
        <input 
        type='number' 
        id='price'
        placeholder='enter price'
        name='price'
        value={data.price}
        onChange={handleOnChange}
        className='p-2 bg-slate-100 border rounded'
        required
        />

        <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
        <input 
        type='number' 
        id='sellingPrice'
        placeholder='enter selling price'
        name='sellingPrice'
        value={data.sellingPrice}
        onChange={handleOnChange}
        className='p-2 bg-slate-100 border rounded'
        required
        />


      <label htmlFor='description' className='mt-3'>Description :</label>
      <RichTextEditor
        name='description'
        value={data.description}
        onChange={(newContent) => {
          setData(prev => ({
            ...prev,
            description: newContent
          }))
        }}
        placeholder='Enter product description'
      />

      {
        shouldShowWebsiteFields(data.category) && (
          <>
        <label htmlFor="websiteTypeDescription" className="mt-3">Website Type Description :</label>
      <textarea
        className="h-28 bg-slate-100 border p-1 resize-none"
        placeholder="enter website type details"
        rows={4}
        onChange={handleOnChange}
        name="websiteTypeDescription"
        value={data.websiteTypeDescription}
      >
      </textarea>
        </>
        )   
      }

       {/* Submit Button */}
        <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Service</button>

      </form>
      
      </div>

      {/* display image full screen */}

        {
          openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
          )
        }
      
    </div>
  )
}

export default UploadProduct
