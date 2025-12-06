'use client'
import { useGetArrivals } from '@/hooks/arrival/useArrival'
import React from 'react'

const ArrivalsPage = () => {

  const {arrivals, isFetchingArrivals} = useGetArrivals()
  console.log('arrivals',arrivals)

  return (
    <div>ArrivalsPage</div>
  )
}

export default ArrivalsPage