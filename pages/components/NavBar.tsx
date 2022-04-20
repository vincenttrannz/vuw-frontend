import React, { useRef, useEffect } from "react";
import $ from 'jquery';
import Link from "next/link";
import VicLogo from "../../public/vic-logo.svg";
import InstaIcon from '../../public/insta-logo.svg';
import FacebookIcon from '../../public/fb-logo.svg';

type NavBarProps = {
  ContactLink: string;
  EnrolLink: string;
}

const NavBar: React.FC<NavBarProps> = ({ ContactLink, EnrolLink }) => {
  const hamburger = useRef<HTMLButtonElement>(null);
  const MenuContainer = useRef<HTMLDivElement>(null);
  
  const MenuList = () => {
    return (
      <>
       <Link href="/">
          <a tabIndex={0} onClick={clickHrefLink} className="p2">Students Work</a>
        </Link>
        <Link href="/about">
          <a tabIndex={0} onClick={clickHrefLink} className="p2">About</a>
        </Link>
        <Link href="/events">
          <a tabIndex={0} onClick={clickHrefLink} className="p2">Events</a>
        </Link>
        <Link href={ContactLink}>
          <a tabIndex={0} onClick={clickHrefLink} className="p2" target="_blank">Contact</a>
        </Link>
        <Link href={EnrolLink}>
          <a tabIndex={0} onClick={clickHrefLink} className="p2" target="_blank">Enrol</a>
        </Link>
        <div className="navbar__link-container__shares">
          <Link href="https://www.facebook.com/VUWArchitectureandDesign">
            <a tabIndex={0} target="_blank" id="fb-icon"><FacebookIcon/></a>
          </Link>
          <Link href="https://www.instagram.com/wgtnfadi/">
            <a tabIndex={0} target="_blank" id="insta-icon"><InstaIcon/></a>
          </Link>
        </div>
      </>
    )
  }

  const clickHrefLink = () => {
    if (window.innerWidth < 767) {
      hamburger.current?.classList.remove("is-active");
      $(MenuContainer.current!).slideUp();
    }
  }

  const clickHamburger = () => {
    hamburger.current?.classList.toggle("is-active");
    MenuContainer.current?.classList.remove("inactive");
    $(MenuContainer.current!).slideToggle();
  };

  return (
    <header id="site-header" aria-label="header" className="container-fluid navbar shadow-sm">
      <Link href="/">
        <a aria-label="Back to Homepage" className="vic-logo-container">
          <VicLogo className="vic-logo" />
        </a>
      </Link>
      <nav role="navigation" ref={MenuContainer} className="navbar__link-container">
        {MenuList()}
      </nav>
      <div className="hamburger-container">
        <button
          ref={hamburger}
          onClick={clickHamburger}
          className="hamburger hamburger--spin js-hamburger"
          type="button"
          aria-haspopup="true"
          aria-controls="navigation"
          aria-expanded="false"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default NavBar;
