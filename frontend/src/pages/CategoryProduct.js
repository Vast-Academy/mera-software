import React, { useEffect, useState } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'
// import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import SingleBanner from '../components/SingleBanner'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })


    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    useEffect(() => {
      let isSubscribed = true;
      
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              category: filterCategoryList
            })
          });
    
          const dataResponse = await response.json();
          if (isSubscribed) {
            setData(dataResponse?.data || []);
            console.log(dataResponse);
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          if (isSubscribed) {
            setLoading(false);
          }
        }
      };
    
      fetchData();
    
      return () => {
        isSubscribed = false;
      };
    }, [filterCategoryList]);


    const handleSelectCategory = (e) =>{
      const { name, value, checked } = e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }


    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      // format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1) === index ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      navigate("/product-category?"+urlFormat.join(""), {replace: true})
    },[selectCategory])
    

    const handleOnChangeSortBy = (e) => {
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

    const generateServiceName = () => {
      // Check for each category and return the corresponding service name
      if (selectCategory["static_websites"]) {
        return "static_websites";
      }
      if (selectCategory["standard_websites"]) {
        return "standard_websites";
      }
      if (selectCategory["dynamic_websites"]) {
        return "dynamic_websites";
      }
      if (selectCategory["website_updates"]) {
        return "website_updates";
      }
      if (selectCategory["mobile_apps"]) {
        return "mobile_apps";
      }
      if (selectCategory["web_applications"]) {
        return "web_applications";
      }
      if (selectCategory["app_update"]) {
        return "app_update";
      }
      if (selectCategory["feature_upgrades"]) {
        return "feature_upgrades";
      }
    
      // Default case if no category is selected
      return "";
    }
    
  return (
    <div className='container mx-auto px-4'>
    <SingleBanner
     serviceName={generateServiceName()}
     bannerType="top"
      />

      
      {/* Desktop Version */}
       {/* <div className='hidden lg:grid grid-cols-[200px,1fr]'> */}
        {/* left side */}
        {/* <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'> */}
         {/* sort by */}
          {/* <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div> */}

          {/* filter by */}
          {/* <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName,index)=>{
                  return(
                    <div className='flex items-center gap-3' key={categoryName.value}>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div> */}

        {/* </div> */}

        <div>
        {/* <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p> */}
        <div >
        {
          data.length !== 0 && (
            <VerticalCard data={data} loading={loading} currentCategory={generateServiceName()}/>
          )
        }
        </div>

        </div>

       {/* </div> */}
    </div>
  )
}

export default CategoryProduct
