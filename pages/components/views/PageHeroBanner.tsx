import React from "react";
import { Container } from "react-bootstrap";
import ScrollDownIndicator from './ScrollDownIndicator';

type PageHeroBannerProps = {
  className?: string;
  OtherSide?: boolean;
  HomepageSubtitle?: boolean;
  HeroBanner: string;
  HeroTitle: string;
  HideScrollIndicator?: boolean;
};

export default function PageHeroBanner({className, OtherSide, HomepageSubtitle, HeroBanner, HeroTitle, HideScrollIndicator}: PageHeroBannerProps) {
  return (
    <div
      className={`hero-section ${OtherSide ? "otherSide" : className ? className : ""}`}
      style={{backgroundImage: `url(${HeroBanner})`}}
    >
      <div className={`hero-section__overlay ${OtherSide ? "otherSide" : ""}`}></div>
      <Container className="hero-section__title-box-container">
        <div className={`hero-section__title-box ${OtherSide ? "otherSide" : className ? className : ""}`}>
          {(HomepageSubtitle) && <span tabIndex={0} className="subtitle">Wellington Faculty of</span>}
          <h1 tabIndex={0}>{HeroTitle}</h1>
          {(HomepageSubtitle) && <span tabIndex={0} className="subtitle" lang="mi">Te Wāhanga Waihanga-Hoahoa</span>}
        </div>
      </Container>
      <div tabIndex={-1} className={`${HideScrollIndicator ? "d-none" : ""}`}>
        <ScrollDownIndicator/>
      </div>
    </div>
  );
}
