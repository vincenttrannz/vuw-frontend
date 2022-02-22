import React from 'react'

type TextDividerProps = {
  prime: boolean;
}

export default function TextDivider({prime}: TextDividerProps) {
  return (
    <div className={`text-divider ${prime ? "prime" : "secondary"}`}></div>
  )
}