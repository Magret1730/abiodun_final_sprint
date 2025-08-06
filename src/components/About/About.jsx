import React from 'react';
import "./About.css";

const About = () => {
  return (
    <div>
      <section className="about">
        <h1 className="about__title">About Us</h1>
        <p className="about__description">
          Welcome to Magret's e-commerce platform! We are dedicated to providing you
          with the best online shopping experience. Our team works tirelessly to
          curate a wide range of products that cater to your needs and preferences.
        </p>
        <p className="about__mission">
          Our mission is to offer high-quality products at competitive prices while
          ensuring exceptional customer service. We believe in building lasting
          relationships with our customers and are committed to your satisfaction.
        </p>
      </section>
    </div>
  )
}

export default About;