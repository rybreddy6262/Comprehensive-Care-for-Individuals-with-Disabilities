import React from "react";
import "./CareExpertsOffer.css";

const CareExpertsOffer = () => {
  const offers = [
    {
      title: "✔ Verified & Trusted Assistance",
      description:
        "All our caregivers undergo strict background checks and certifications to ensure reliability and trust from institutions and families.",
    },
    {
      title: "✍ Trained in Exam Protocols",
      description:
        "Caregivers are trained in academic honesty, exam rules, and disability-specific needs for ethical assistance.",
    },
    {
      title: "♻ Inclusive Communication Support",
      description:
        "Trained in sign language and alternative methods to support those with visual or physical impairments.",
    },
    {
      title: "✨ Custom Assistance Based on Need",
      description:
        "Scribe, reader, mobility aid, or emotional support — caregivers are matched based on individual needs.",
    },
    {
      title: "⏰ On-Time and Reliable Support",
      description:
        "Guaranteed punctuality to reduce stress and ensure timely assistance at exam venues.",
    },
    {
      title: "🧰 Collaborative with Exam Centers",
      description:
        "We coordinate with exam centers to ensure smooth, trusted caregiver involvement.",
    },
    {
      title: "🚮 Confidential & Respectful Interaction",
      description:
        "Caregivers maintain privacy and dignity, providing sensitive and non-intrusive support.",
    },
    {
      title: "⚠ Emergency Preparedness",
      description:
        "In case of emergencies, caregivers act promptly while coordinating with authorities.",
    },
  ];

  return (
    <div className="care-offer-container">
      <h1>✅ Our Care Experts Offer</h1>
      <div className="grid-container">
        {offers.map((item, index) => (
          <div className="extra-section" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareExpertsOffer;