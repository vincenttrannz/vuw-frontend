import React from 'react';

type ImgCaptionProps = {
  className?: string;
  caption: string;
}

export default function ImgCaption({caption, className}: ImgCaptionProps) {
  return (
    <span className={`p2 img-caption ${className ? className : ""}`}>{caption}</span>
  )
}