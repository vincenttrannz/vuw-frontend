import React from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import VicLogo from "../../public/vic-logo.svg";

type FooterProps = {
  DisplayPhone: boolean;
  PhoneNumber: string;
};

export default function Footer({ DisplayPhone, PhoneNumber }: FooterProps) {
  return (
    <Container role="contentinfo" fluid className="footer">
      <div className="footer__column">
        <Link href="/">
          <a aria-label="Back to Homepage" className="vic-logo-container">
            <VicLogo className="vic-logo" />
          </a>
        </Link>
        <p>Te Herenga Waka-Victoria University of Wellington</p>
      </div>
      <address className="footer__column">
        <p className="p2 bold">Contact</p>
        <p>
          Wellington Faculty of Architecture and Design Innovation,<br/>
          Te Herenga Waka-Victoria University of Wellington<br/>
          139 Vivian Street, Te Aro Wellington 6011
        </p>
        {
          (DisplayPhone)
          ?
          <a href={`tel:${PhoneNumber.replace(/ /g, '')}`}>{PhoneNumber}</a>
          :
          ""
        }
      </address>
      <div className="footer__column">
        <p className="p2 bold">Navigation</p>
        <ul>
          <li>
            <Link href="/">
              <a>Students Work</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__column">
        <p className="p2 bold">Links</p>
        <ul>
          <li>
            <Link href="https://www.instagram.com/wgtnfadi/">
              <a target="_blank">Instagram</a>
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/VUWArchitectureandDesign">
              <a target="_blank">Facebook</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__copyright">
        <span>All rights reserved. © 2022 VUW</span> <span><Link href="/privacy"><a>Privacy Policy</a></Link></span>
      </div>
    </Container>
  );
}