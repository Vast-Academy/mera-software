const mongoose = require('mongoose');
const productModel = require('../models/productModel');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';

async function createYearlyUpdatePlan() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create yearly update plan product
    const yearlyUpdatePlan = new productModel({
      serviceName: "Yearly Website Updates Plan - Monthly Renewable",
      category: "website_updates",
      packageIncludes: [
        "Unlimited Updates for 1 Month",
        "Monthly Renewal Option (₹8000/month)",
        "Valid for 365 Days Total",
        "Content Updates",
        "Image Updates",
        "Text Changes",
        "Page Modifications",
        "Bug Fixes",
        "Security Updates",
        "24/7 Support",
        "Fast Response Time",
        "Professional Development Team"
      ],
      perfectFor: [
        "Businesses with Regular Updates",
        "E-commerce Websites",
        "Content-heavy Websites",
        "Growing Businesses",
        "Companies with Changing Products",
        "Seasonal Business Updates"
      ],
      serviceImage: [], // Add images as needed
      price: 100000, // ₹1,00,000 (you can adjust this)
      sellingPrice: 100000,
      formattedDescriptions: [{
        content: "Get unlimited website updates with our revolutionary yearly plan! Pay once for the yearly subscription and then renew monthly as needed. Perfect for businesses that require regular website maintenance and updates throughout the year."
      }],

      // Website update specific fields
      isWebsiteUpdate: true,
      validityPeriod: 30, // Current active period is 30 days
      updateCount: 999999, // Unlimited updates

      // Yearly renewable plan specific fields
      isMonthlyRenewablePlan: true,
      yearlyPlanDuration: 365, // Total plan duration is 365 days
      monthlyRenewalCost: 8000, // ₹8000 per month renewal
      isUnlimitedUpdates: true,

      keyBenefits: [
        "Unlimited updates per month",
        "365 days total plan validity",
        "Monthly renewal flexibility",
        "Cost-effective long-term solution",
        "Priority support",
        "Professional team"
      ],

      isHidden: false
    });

    // Save the product
    await yearlyUpdatePlan.save();
    console.log('✅ Yearly Update Plan created successfully!');
    console.log('Product ID:', yearlyUpdatePlan._id);
    console.log('Service Name:', yearlyUpdatePlan.serviceName);
    console.log('Category:', yearlyUpdatePlan.category);
    console.log('Price:', yearlyUpdatePlan.sellingPrice);
    console.log('Monthly Renewal Cost:', yearlyUpdatePlan.monthlyRenewalCost);
    console.log('Yearly Duration:', yearlyUpdatePlan.yearlyPlanDuration, 'days');

    // Close connection
    await mongoose.disconnect();
    console.log('✅ Script completed successfully!');

  } catch (error) {
    console.error('❌ Error creating yearly update plan:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  createYearlyUpdatePlan();
}

module.exports = createYearlyUpdatePlan;