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
  
  export default ServiceCard;

