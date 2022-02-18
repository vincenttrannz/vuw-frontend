import React from 'react'

type Props = {
  filterPack: {}
}

export default function ProjectFilters({filterPack}: Props) {
  const filtersPack = filterPack;
  const categories = [];

  for(let category in filterPack) {
    categories.push(category);
  }

  let lists = categories

  return (
    <div>
      
    </div>
  )
}