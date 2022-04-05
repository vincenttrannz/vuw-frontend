import React from 'react';
import Link from 'next/link'
import InstaIcon from '/public/insta-logo.svg';
import FacebookIcon from '/public/fb-logo.svg';

export default function StickySocial() {
  return (
    <div className='side-share-container shadow-sm'>
      <Link href="https://www.facebook.com/VUWArchitectureandDesign">
        <a target="_blank" aria-label="facebook" className='react-share__ShareButton'>
          <FacebookIcon className="social-icon"/>
        </a>
      </Link>
      <Link href="https://www.instagram.com/wgtnfadi/">
        <a target="_blank" aria-label="instagram" className='react-share__ShareButton'>
          <InstaIcon className="social-icon"/>
        </a>
      </Link>
    </div>
  )
}