import "./Contact.css";
import React, { useState } from 'react';
import { toast } from "react-toastify";
// This is a simple Contact component that displays a message

const Contact = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Process contact logic
    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      toast.success("Message sent successfully!");

      // Clear form fields after successful submission
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  }

  return (
    <section className="contact">
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__message">We would love to hear from you! Please reach out with any questions or feedback.</p>
        <form className="contact__form">
            <input type="text" placeholder="Your Name" className="contact__input" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Your Email" className="contact__input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <textarea placeholder="Your Message" className="contact__textarea" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            <button onClick={handleSendMessage} type="submit" className="contact__button">Send Message</button>
        </form>
    </section>
  )
}

export default Contact;