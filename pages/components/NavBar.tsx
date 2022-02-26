import React, { useRef, useEffect } from "react";
import $ from 'jquery';
import Link from "next/link";
import VicLogo from "../../public/vic-logo.svg";
import { Container, Button } from "react-bootstrap";
import InstaIcon from '../../public/insta-logo.svg';
import FacebookIcon from '../../public/fb-logo.svg';

const NavBar: React.FC = () => {
  const hamburger = useRef<HTMLButtonElement>(null);
  const MenuContainer = useRef<HTMLDivElement>(null);

  const MenuList = () => {
    return (
      <>
       <Link href="/">
          <a className="p2">Student Work</a>
        </Link>
        <Link href="/about">
          <a className="p2">About</a>
        </Link>
        <Link href="/">
          <a className="p2">Events</a>
        </Link>
        <Link href="https://www.wgtn.ac.nz/">
          <a className="p2" target="_blank">
            Contact
          </a>
        </Link>
        <Link href="https://www.wgtn.ac.nz/">
          <a className="p2" target="_blank">
            Enroll
          </a>
        </Link>
        <div className="navbar__link-container__shares">
          <Link href="#">
            <a id="fb-icon"><FacebookIcon/></a>
          </Link>
          <Link href="#">
            <a id="insta-icon"><InstaIcon/></a>
          </Link>
        </div>
      </>
    )
  }

  const clickHamburger = () => {
    hamburger.current?.classList.toggle("is-active");
    MenuContainer.current?.classList.remove("inactive");
    $(MenuContainer.current!).slideToggle(300, 'swing');
  };

  return (
    <Container fluid className="navbar shadow-sm">
      <Link href="/">
        <a className="vic-logo-container">
          <VicLogo className="vic-logo" />
        </a>
      </Link>
      <div ref={MenuContainer} className="navbar__link-container">
          {MenuList()}
      </div>
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
    </Container>
  );
};

export default NavBar;
