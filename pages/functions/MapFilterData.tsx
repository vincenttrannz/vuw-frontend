import React from 'react'

type MapProps = {
  data?: number[] | string[]
}

export default function MapFilterData({data}: MapProps) {
  return (
    <>
      {
        data?.map((val, i) => {
          return (
            <li key={i}>
              <a href="#">{val}</a>
            </li>
          )
        })
      }
    </>
  )
}