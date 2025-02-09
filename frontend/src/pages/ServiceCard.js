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

  
  export default ServiceCard;

