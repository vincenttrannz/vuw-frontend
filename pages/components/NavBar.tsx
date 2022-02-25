import React, { useRef, useEffect } from "react";
import Link from "next/link";
import VicLogo from "../../public/vic-logo.svg";
import { toggle, hide, show } from 'slidetoggle';
import { Container, Button } from "react-bootstrap";
import InstaIcon from '../../public/insta-logo.svg';
import FacebookIcon from '../../public/fb-logo.svg';

const NavBar: React.FC = () => {
  const hamburger = useRef<HTMLButtonElement>(null);
  const MenuContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(window.innerWidth < 767){
      hide(MenuContainer.current!, {
        miliseconds: 0
      })
    }
    window.addEventListener("resize", () => {
      if(window.innerWidth < 767){
        hide(MenuContainer.current!, {
          miliseconds: 0
        })
        hamburger.current?.classList.remove("is-active");
      } else {
        show(MenuContainer.current!, {
          miliseconds: 0
        })
        hamburger.current?.classList.remove("is-active");
      }
    })
  }, [])

  const clickHamburger = () => {
    hamburger.current?.classList.toggle("is-active");
    MenuContainer.current?.classList.remove("inactive");
    toggle(MenuContainer.current!, {
      miliseconds: 300,
      transitionFunction: 'ease-in',
      elementDisplayStyle: 'flex' 
    });
  };

  return (
    <Container fluid className="navbar shadow-sm">
      <Link href="/">
        <a className="vic-logo-container">
          <VicLogo className="vic-logo" />
        </a>
      </Link>
      <div ref={MenuContainer} className="navbar__link-container">
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
            <a><FacebookIcon/></a>
          </Link>
          <Link href="#">
            <a><InstaIcon/></a>
          </Link>
        </div>
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
