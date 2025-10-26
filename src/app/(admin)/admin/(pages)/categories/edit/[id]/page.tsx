"use client"
import React from 'react'
import { useParams } from 'next/navigation'

const CategoryEditPage = () => {
  const { id } = useParams()

  return (
    <div>CategoryEditPage</div>
  )
}

export default CategoryEditPage