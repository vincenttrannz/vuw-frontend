import React, { useRef } from 'react';
import $ from 'jquery'
import { useRouter } from 'next/router';
import FacebookShare from '../../../public/round-fb-logo.svg';
import LinkedInShare from '../../../public/round-linkedin-logo.svg';
import TwitterShare from '../../../public/round-twitter-logo.svg';
import CopyLinkShare from '../../../public/round-copy-link-logo.svg';
import {FacebookShareButton, LinkedinShareButton, TwitterShareButton} from 'react-share'

type ShareContainerProps = {
  className?: string;
}

export default function ShareContainer({className}: ShareContainerProps) {
  const router = useRouter();
  const currentURL = "http://vuwunicodesjav1.vuw.ac.nz" + router.asPath;
  const CopiedText = useRef<HTMLSpanElement>(null);
  

  const clickCopy = () => {
    (CopiedText.current) && $(CopiedText.current).fadeIn("fast").delay(800).fadeOut("fast");
    navigator.clipboard.writeText(currentURL);
  }

  return (
    <div className={`project-share-wrapper ${className ? className : ""}`}>
      <div className='project-share-container'>
        <FacebookShareButton
          url={currentURL}
        >
          <FacebookShare className="share-logo"/>
        </FacebookShareButton>
        <LinkedinShareButton
          url={currentURL}
        >
          <LinkedInShare className="share-logo"/>
        </LinkedinShareButton>
        <TwitterShareButton
          url={currentURL}
        >
          <TwitterShare className="share-logo"/>
        </TwitterShareButton>
        <div aria-label="copy" className='react-share__ShareButton' onClick={clickCopy}>
          <CopyLinkShare className="share-logo"/>
          <span className='copied-text' style={{display: "none"}} ref={CopiedText}>Copied!</span>
        </div>
      </div>
    </div>
  )
}