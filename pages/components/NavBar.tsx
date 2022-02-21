import React from 'react';
import Link from 'next/link';
import VicLogo from '../../public/vic-logo.svg'
import {Container, Button} from 'react-bootstrap';

const NavBar: React.FC = () => {
  return (
    <Container fluid className='navbar shadow-sm'>
      <Link href="/">
        <a className='vic-logo-container'>
          <VicLogo className="vic-logo"/>
        </a>
      </Link>
      <div className='navbar__link-container'>
        <Link href="/">
          <a className='p2'>Student Work</a>
        </Link>
        <Link href="/about">
          <a className='p2'>About</a>
        </Link>
        <Link href="/">
          <a className='p2'>Events</a>
        </Link>
        <Link href="https://www.wgtn.ac.nz/">
          <a className='p2' target="_blank">Contact</a>
        </Link>
        <Link href="https://www.wgtn.ac.nz/">
          <a className='p2' target="_blank">Enroll</a>
        </Link>
      </div>
    </Container>
  );
};

export default NavBar;