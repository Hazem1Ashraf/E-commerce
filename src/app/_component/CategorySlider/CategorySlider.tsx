import getSelectedProduct from '@/api/allCategories.api'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper';

export default async function CategorySlider() {
  const data =await  getSelectedProduct()
  
  return (<>
  <CategorySwiper data={data}/>
  </>
  )
}
