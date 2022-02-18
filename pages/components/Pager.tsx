import React from 'react'

type Props = {
  currentPage: number;
  totalPages: [];
  pageSwitcher: () => void;
}

export default function Pager({currentPage, totalPages, pageSwitcher}: Props) {
  const cur = +currentPage,
        max = totalPages.length,
        go = pageSwitcher;
  return (
    <ul className="pager">
      {
        // ARROW LEFT
        (cur > 1) &&
        <li>
          <a href="#" data-rel={cur - 1} onClick={go}>&lt;</a>
        </li>
      }
      {
        // PAGE NUMBER
        totalPages.map((item, i) => {
          let isFirst = i === 0;
          let isLast = max - 1;
          if(i < cur + 2 && i > cur - 4 || isFirst || isLast){
            return (
              <li key={i}>
                <a href="#" data-rel={item} onClick={go}>{item}</a>
              </li>
            )
          } else if (i === cur - 5 || i === cur + 2) {
            return (
              <li key={i}>...</li>
            )
          }
        })
      }
      {
        // ARROW RIGHT
        (cur < max) &&
        <li>
          <a href="#" data-rel={cur + 1} onClick={go}>&gt;</a>
        </li>
      }
    </ul>
  )
}