import NavigateButton from "@/component/atoms/NavigateButton";
import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./HeroSection.module.css";

const HeroSection = ({ data }) => {
  return (
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <div className={classes.heroLeft}>
            <Image
              src={data?.topIcon}
              fill
              className={classes.tap2Image}
              alt="app img"
            />
            <h1>
              {data?.title}
              <span>{data?.spanText}</span>
            </h1>
            <p>{data?.description}</p>
            <div className={classes.storeImages}>
              <Image
                src={data?.appImage}
                fill
                className={classes.appImage}
                alt="app img"
              />
              <Image
                src={data?.googleImage}
                fill
                className={classes.storeImage}
                alt="app img"
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.heroRightDiv}>
            <div className={classes.rightImg}>
              <Image src={data?.imageRight} fill alt="hero img" />
            </div>
          </div>
        </Col>
        <Col md={12}>
          <div className={classes.navigate}>
            <NavigateButton />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
