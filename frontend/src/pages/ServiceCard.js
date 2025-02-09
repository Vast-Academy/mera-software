<<<<<<< HEAD
import React from 'react'
// import websiteImage from '../assest/website-types/portfolio-static-website-va-computers-amritsar.jpg'

const ServiceCard = () => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Dynamic Gallery</h2>
      <p style={styles.category}>Feature Categories: Starter Websites, Mobile Apps</p>
      <p style={styles.feature}>Features:</p>
      <ul>
        <li>User can add their photos to its gallery with a dynamic panel.</li>
        <li>No need for a developer to do this.</li>
      </ul>
      <p style={styles.price}>Price: ₹5999</p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto'
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold'
  },
  category: {
    fontSize: '1.1em',
    fontStyle: 'italic'
  },
  feature: {
    fontSize: '1.2em',
    margin: '10px 0 5px'
  },
  price: {
    fontSize: '1.3em',
    color: 'green',
    fontWeight: 'bold',
    marginTop: '20px'
  }
};

=======
import React, { useState } from 'react'
// import websiteImage from '../assest/website-types/portfolio-static-website-va-computers-amritsar.jpg'

const ServiceCard = () => {
    const basePrice = 40000;
    const features = [
      { name: "Lead Management", price: 5000 },
      { name: "Sales Automation", price: 7000 },
      { name: "Customer Support", price: 6000 },
      { name: "Reports & Analytics", price: 8000 },
      { name: "Email Integration", price: 4000 },
    ];
  
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const totalPrice = selectedFeatures.reduce((acc, feature) => acc + feature.price, basePrice);
  
    const handleFeatureChange = (feature) => {
      setSelectedFeatures((prev) =>
        prev.includes(feature)
          ? prev.filter((f) => f !== feature)
          : [...prev, feature]
      );
    };
  
    return (
      <div className="p-4 max-w-sm mx-auto">
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-2">Customer Relationship Management Software (CRM)</h2>
          <p className="text-sm mb-4">
            Our CRM software helps businesses manage customer interactions, track sales, and enhance customer satisfaction. 
            The base price starts at <strong>₹40,000</strong>. Additional features can be selected below, increasing the total cost.
          </p>
          <h3 className="font-semibold mb-2">Select Additional Features:</h3>
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="w-4 h-4"
                />
                <span>{feature.name} (+₹{feature.price})</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-lg font-bold">Total Price: ₹{totalPrice}</div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">Get Started</button>
        </div>
      </div>
    );
  };
>>>>>>> 83e80f3d8de498b8712c31e2fc6288d6ee5f816d
  
  export default ServiceCard;

