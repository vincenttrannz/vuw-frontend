import React from 'react';
import Link from 'next/link';

type ImgCaptionProps = {
  className?: string;
  caption: string;
}

export default function ImgCaption({caption, className}: ImgCaptionProps) {
  function urlify(text:string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url:string) {
      return `<a target="_blank" href="${url}">${url}</a>`;
    })
  }
  
  return (
    (caption.startsWith("http")) 
    ?
    <span className={`p2 img-caption ${className ? className : ""}`}>
      <Link href={caption}>
        <a target="_blank">{caption}</a>
      </Link>
    </span>
    :
    <span 
      className={`p2 img-caption ${className ? className : ""}`} 
      dangerouslySetInnerHTML={{__html: urlify(caption)}}/>
  )
}