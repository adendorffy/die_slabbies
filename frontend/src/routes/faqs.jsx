// FAQs.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FAQs.css"; // Make sure to create this CSS file for styling

export default function FAQs() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What should I wear?",
      answer:
        "Dress code is semi-formal. Feel free to be comfortable and stylish.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "Your invitation will indicate if you have a plus one. Please let us know if you are unsure.",
    },
    {
      question: "Are children welcome?",
      answer:
        "We love your little ones, but this will be an adult-only celebration.",
    },
    {
      question: "Will there be vegetarian/vegan options?",
      answer:
        "Yes, please let us know about any dietary restrictions when you RSVP.",
    },
    {
      question: "Can I take pictures during the ceremony?",
      answer:
        "We kindly ask that you keep your phones away during the ceremony so our photographer can capture the moment.",
    },
    {
      question: "How can I RSVP?",
      answer: "You can RSVP directly on this website using the RSVP page.",
    },
    {
      question: "What about gifts?",
      answer:
        "We have a gift registry on our Gifting page, or you can contribute to our cash fund.",
    },
  ];

  return (
    <div className="faqs-container">
      <h1>FAQs</h1>
      <p>
        Should you have any additional questions, please please contact us! This
        is just to help you out with the super basic things.
      </p>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="home-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
