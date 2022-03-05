import React, { RefObject } from 'react';
import { Projects, Schools, Levels, Awards } from "../../compilers/type";

type MapProps = {
  data?: string[];
  handleFilterClick: () => void;
  ref?: RefObject<any>;
  isSchool?: boolean;
  dataSchoolForMajor?: boolean;
}

export default function MapFilterData({data, handleFilterClick, ref, isSchool, dataSchoolForMajor}: MapProps) {
  return (
    <>
      {
        data?.map((val, i) => {
          return (
            <li key={i}>
              <a 
                onClick={handleFilterClick}
                type="button"
                className="p2 bold categories-container__category"
                ref={ref}
                data-filter={val.replace(/ /g, "_")}
                data-is-school={isSchool}
              >
                {val}
              </a>
            </li>
          )
        })
      }
    </>
  )
}