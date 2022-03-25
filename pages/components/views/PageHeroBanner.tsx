import React from "react";
import { Container } from "react-bootstrap";

type PageHeroBannerProps = {
  className?: string;
  OtherSide?: boolean;
  HomepageSubtitle?: boolean;
  HeroBanner: string;
  HeroTitle: string;
};

export default function PageHeroBanner({className, OtherSide, HomepageSubtitle, HeroBanner, HeroTitle}: PageHeroBannerProps) {
  return (
    <div
      className={`hero-section ${OtherSide ? "otherSide" : className ? className : ""}`}
      style={{backgroundImage: `url(${HeroBanner})`}}
    >
      <div className={`hero-section__overlay ${OtherSide ? "otherSide" : ""}`}></div>
      <Container className="hero-section__title-box-container">
        <div className={`hero-section__title-box ${OtherSide ? "otherSide" : className ? className : ""}`}>
          {(HomepageSubtitle) && <span className="subtitle">Wellington Faculty of</span>}
          <h1>{HeroTitle}</h1>
          {(HomepageSubtitle) && <span className="subtitle" lang="mi">Te Wāhanga Waihanga-Hoahoa</span>}
        </div>
      </Container>
    </div>
  );
}
