import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Container, Button} from 'react-bootstrap';

const NavBar: React.FC = () => {
  return (
    <Container fluid className='navbar shadow-sm py-1'>
      <Link href="/">
        <a className='navbar__logo'>
          <Image 
            src={"/vic-logo.svg"}
            layout='fill'
            objectFit='contain'
          />
        </a>
      </Link>
      <div className='navbar__link-container'>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/">
          <a>Student Work</a>
        </Link>
        <Link href="/">
          <a>Events</a>
        </Link>
        <Link href="/">
          <a>Contact</a>
        </Link>
        <Button onClick={() => window.open("https://www.wgtn.ac.nz/", "_blank")} className='px-3'>
          Enroll
        </Button>
      </div>
    </Container>
  );
};

export default NavBar;
