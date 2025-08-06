import React from 'react';
import "./Contact.css";
// This is a simple Contact component that displays a message

const Contact = () => {
  return (
    <section className="contact">
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__message">We would love to hear from you! Please reach out with any questions or feedback.</p>
        <form className="contact__form">
            <input type="text" placeholder="Your Name" className="contact__input" required />
            <input type="email" placeholder="Your Email" className="contact__input" required />
            <textarea placeholder="Your Message" className="contact__textarea" required></textarea>
            <button type="submit" className="contact__button">Send Message</button>
        </form>
    </section>
  )
}

export default Contact;