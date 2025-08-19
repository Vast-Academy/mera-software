const { Resend } = require("resend");

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send notification to admins about new update request
 * @param {Object} updateRequest - The populated update request object
 * @param {Array|String} adminEmails - Admin email addresses
 */
const sendUpdateRequestNotification = async (updateRequest, adminEmails) => {
  try {
    // Make sure we have an array of emails
    const emails = Array.isArray(adminEmails) ? adminEmails : [adminEmails];

    // Format instructions for better readability
    const formattedInstructions =
      updateRequest.instructions && updateRequest.instructions.length > 0
        ? updateRequest.instructions
            .map((instr) => `- ${instr.text}`)
            .join("\n")
        : "No instructions provided";

    // Get file information
    const fileInfo =
      updateRequest.files && updateRequest.files.length > 0
        ? `${updateRequest.files.length} file(s) uploaded`
        : "No files uploaded";

    // Email content
    const emailData = {
      from: `${process.env.FROM_NAME || "Website Update Service"} <${process.env.FROM_EMAIL}>`,
      to: emails,
      subject: "New Website Update Request Submitted",
      html: `
        <h2>New Website Update Request</h2>
        <p><strong>Client:</strong> ${updateRequest.userId.name} (${updateRequest.userId.email})</p>
        <p><strong>Plan:</strong> ${updateRequest.updatePlanId.productId.serviceName}</p>
        <p><strong>Files:</strong> ${fileInfo}</p>
        <h3>Instructions:</h3>
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${formattedInstructions}</pre>
        <p>Please log into the admin dashboard to view the complete details and assign a developer.</p>
        <p>
          <a href="${process.env.ADMIN_DASHBOARD_URL}/update-requests" 
             style="display: inline-block; padding: 10px 15px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 5px;">
            View Request
          </a>
        </p>
      `,
    };

    // Send email
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending admin notification email:", error);
      return false;
    }

    console.log("Admin notification email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Error sending admin notification email:", error);
    return false;
  }
};

/**
 * Send confirmation email to user
 * @param {Object} updateRequest - The populated update request object
 */
const sendUserConfirmation = async (updateRequest) => {
  try {
    const emailData = {
      from: `${process.env.FROM_NAME || "Website Update Service"} <${process.env.FROM_EMAIL}>`,
      to: [updateRequest.userId.email],
      subject: "Your Website Update Request Has Been Received",
      html: `
        <h2>Update Request Confirmation</h2>
        <p>Hello ${updateRequest.userId.name},</p>
        <p>We have received your website update request for your <strong>${updateRequest.updatePlanId.productId.serviceName}</strong> plan.</p>
        <p>Our team will review your request and start working on it as soon as possible.</p>
        <p>You will receive notifications when there are updates or when your request has been completed.</p>
        <p>Thank you for your business!</p>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending user confirmation email:", error);
      return false;
    }

    console.log("User confirmation email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Error sending user confirmation email:", error);
    return false;
  }
};

/**
 * Send notification to user when developer is assigned
 * @param {Object} entity - The populated project/update object
 * @param {String} type - 'project' or 'update'
 */
const sendDeveloperAssignedNotification = async (entity, type = "update") => {
  try {
    // Content और subject को type के अनुसार set करें
    let subject, content;

    if (type === "project") {
      subject = "Developer Assigned to Your Website Project";
      content = `
        <h2>Developer Has Been Assigned</h2>
        <p>Hello ${entity.userId.name},</p>
        <p>We're pleased to inform you that a developer has been assigned to your website project.</p>
        <p><strong>Project:</strong> ${entity.productId.serviceName}</p>
        <p><strong>Developer:</strong> ${entity.assignedDeveloper.name}</p>
        <p>Your project is now in progress, and you'll receive further updates as work proceeds.</p>
        <p>Thank you for your patience!</p>
      `;
    } else {
      subject = "Update on Your Website Update Request";
      content = `
        <h2>Developer Has Been Assigned</h2>
        <p>Hello ${entity.userId.name},</p>
        <p>We're pleased to inform you that a developer has been assigned to your website update request.</p>
        <p><strong>Developer:</strong> ${entity.assignedDeveloper.name}</p>
        <p>Your request is now in progress, and you'll receive further updates as work proceeds.</p>
        <p>Thank you for your patience!</p>
      `;
    }

    const emailData = {
      from: `${process.env.FROM_NAME || "Website Service"} <${process.env.FROM_EMAIL}>`,
      to: [entity.userId.email],
      subject: subject,
      html: content,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending developer assigned notification:", error);
      return false;
    }

    console.log(
      "Developer assigned notification sent successfully to client:",
      data
    );
    return true;
  } catch (error) {
    console.error("Error sending developer assigned notification:", error);
    return false;
  }
};

/**
 * Send notification to user when update is completed
 * @param {Object} updateRequest - The populated update request object
 */
const sendUpdateCompletedNotification = async (updateRequest) => {
  try {
    const emailData = {
      from: `${process.env.FROM_NAME || "Website Update Service"} <${process.env.FROM_EMAIL}>`,
      to: [updateRequest.userId.email],
      subject: "Your Website Update Has Been Completed",
      html: `
        <h2>Update Request Completed</h2>
        <p>Hello ${updateRequest.userId.name},</p>
        <p>We're happy to inform you that your website update request has been completed successfully.</p>
        <p>Please take some time to review the changes. If you have any questions or need any adjustments, please let us know.</p>
        <p>Thank you for choosing our service!</p>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending update completed notification:", error);
      return false;
    }

    console.log("Update completed notification sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Error sending update completed notification:", error);
    return false;
  }
};

/**
 * Send notification email to developer about new assignment
 * @param {Object} entity - The populated project/update object
 * @param {String} type - 'project' or 'update'
 */
const sendDeveloperAssignmentEmail = async (entity, type = "update") => {
  try {
    // Make sure we have developer details
    if (!entity.assignedDeveloper || !entity.assignedDeveloper.email) {
      console.warn("No developer email found for sending notification");
      return false;
    }

    // Content और subject को type के अनुसार set करें
    let subject, content, dashboardUrl;

    if (type === "project") {
      subject = "New Website Project Assignment";
      dashboardUrl = "/developer-projects";
      content = `
        <h2>New Project Assignment</h2>
        <p>Hello ${entity.assignedDeveloper.name},</p>
        <p>You have been assigned to work on a new website project.</p>
        <p><strong>Client:</strong> ${entity.userId.name} (${entity.userId.email})</p>
        <p><strong>Service:</strong> ${entity.productId.serviceName}</p>
        
        <p>Please log into your developer dashboard to view the complete details and start working on this project.</p>
      `;
    } else {
      subject = "New Website Update Assignment";
      dashboardUrl = "/developer-update-requests";
      content = `
        <h2>New Update Assignment</h2>
        <p>Hello ${entity.assignedDeveloper.name},</p>
        <p>You have been assigned to work on a website update request.</p>
        <p><strong>Client:</strong> ${entity.userId.name} (${entity.userId.email})</p>
        <p><strong>Service:</strong> ${entity.updatePlanId.productId.serviceName}</p>
        
        <h3>Client Instructions:</h3>
        <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
          ${
            entity.instructions && entity.instructions.length > 0
              ? entity.instructions
                  .map((instr) => `<p>- ${instr.text}</p>`)
                  .join("")
              : "<p>No instructions provided</p>"
          }
        </div>
        
        <p>Please log into your developer dashboard to view the complete details and start working on this request.</p>
      `;
    }

    const emailData = {
      from: `${process.env.FROM_NAME || "Website Service"} <${process.env.FROM_EMAIL}>`,
      to: [entity.assignedDeveloper.email],
      subject: subject,
      html: `
        ${content}
        <p>
          <a href="${process.env.DEVELOPER_DASHBOARD_URL}${dashboardUrl}" 
             style="display: inline-block; padding: 10px 15px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 5px;">
            View Assignment
          </a>
        </p>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending developer assignment email:", error);
      return false;
    }

    console.log(
      "Developer assignment email sent successfully to:",
      entity.assignedDeveloper.email,
      data
    );
    return true;
  } catch (error) {
    console.error("Error sending developer assignment email:", error);
    return false;
  }
};

/**
 * Send purchase confirmation email to user
 * @param {Object} order - The populated order object with user and product details
 * @param {Object} paymentDetails - Information about the payment
 * @returns {Promise<Boolean>} - Success status
 */
const sendPurchaseConfirmationEmail = async (order, paymentDetails) => {
  try {
    if (!order.userId || !order.userId.email) {
      console.warn("No user email found for sending purchase confirmation");
      return false;
    }

    // Get discount information if available
    const discount = order.discountAmount || 0;
    const originalPrice = order.originalPrice || order.price;
    const finalPrice = order.price;
    const couponApplied = order.couponApplied || "None";

    // Payment method info
    const paymentMethod = paymentDetails.method || "Wallet";

    // Format for partial payment information if applicable
    let paymentInfo = "";
    if (order.isPartialPayment) {
      paymentInfo = `
        <div style="margin-top: 15px; margin-bottom: 15px; background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
          <h3 style="margin-top: 0; color: #333;">Installment Plan</h3>
          <p>This purchase is being made under an installment plan.</p>
          <p><strong>Current Payment:</strong> ₹${(order.paidAmount || 0).toLocaleString()}</p>
          <p><strong>Remaining Amount:</strong> ₹${(order.remainingAmount || 0).toLocaleString()}</p>
          <p><strong>Total Value:</strong> ₹${(order.totalAmount || 0).toLocaleString()}</p>
        </div>
      `;
    }

    const emailData = {
      from: `${process.env.FROM_NAME || "Your Company"} <${process.env.FROM_EMAIL}>`,
      to: [order.userId.email],
      subject: "Thank You for Your Purchase!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Purchase Confirmation</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hello ${order.userId.name},</p>
            
            <p>Thank you for your purchase! We're excited to confirm your order details:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #333;">${order.productId.serviceName}</h2>
              <p><strong>Category:</strong> ${order.productId.category?.split("_").join(" ") || "Service"}</p>
              <p><strong>Quantity:</strong> ${order.quantity}</p>
              <p><strong>Original Price:</strong> ₹${originalPrice.toLocaleString()}</p>
              <p><strong>Coupon Applied:</strong> ${couponApplied}</p>
              ${discount > 0 ? `<p><strong>Discount:</strong> ₹${discount.toLocaleString()}</p>` : ""}
              <p><strong>Final Price:</strong> ₹${finalPrice.toLocaleString()}</p>
              <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            </div>
                        
            ${paymentInfo}
            
            <p>We've attached an invoice to this email for your records.</p>
            
            <p>If you have any questions about your purchase, please don't hesitate to contact our support team.</p>
            
            <p>Thank you for choosing our services!</p>
            
            <p>Best regards,<br>Your Company Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Invoice-${order._id}.pdf`,
          content: paymentDetails.invoiceBuffer,
        },
      ],
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending purchase confirmation email:", error);
      return false;
    }

    console.log(
      "Purchase confirmation email sent successfully to:",
      order.userId.email,
      data
    );
    return true;
  } catch (error) {
    console.error("Error sending purchase confirmation email:", error);
    return false;
  }
};

/**
 * Generate invoice PDF for an order
 * @param {Object} order - The populated order object
 * @param {Object} paymentDetails - Payment method information
 * @returns {Promise<Buffer>} - PDF buffer
 */
const generateInvoicePdf = async (order, paymentDetails) => {
  try {
    // For this implementation, you would use a PDF generation library like PDFKit
    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    // Add company information
    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

    // Add company logo if available
    // doc.image('path_to_logo.png', 50, 45, { width: 100 });

    doc.fontSize(10);
    doc.text("VA Computers", { align: "right" });
    doc.text("VA Computers, Near New Bus Stand", { align: "right" });
    doc.text("Majitha, 143601 ", { align: "right" });
    doc.text("Email: vacomputers.com@gmail.com", { align: "right" });

    doc.moveDown();

    // Customer Information
    doc.fontSize(12).text("Bill To:");
    doc.fontSize(10);
    doc.text(`Customer: ${order.userId.name}`);
    doc.text(`Email: ${order.userId.email}`);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Invoice #: INV-${order._id}`);

    doc.moveDown();

    // Invoice Items Table
    const tableTop = 200;
    const itemCodeX = 50;
    const descriptionX = 150;
    const quantityX = 350;
    const priceX = 400;
    const amountX = 450;

    doc
      .fontSize(10)
      .text("Item", itemCodeX, tableTop)
      .text("Description", descriptionX, tableTop)
      .text("Qty", quantityX, tableTop)
      .text("Price", priceX, tableTop)
      .text("Amount", amountX, tableTop);

    // Draw a line
    doc
      .moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke();

    const productName = order.productId.serviceName;
    const itemY = tableTop + 25;

    doc
      .text(order.productId._id.toString().substring(0, 8), itemCodeX, itemY)
      .text(productName, descriptionX, itemY)
      .text(order.quantity.toString(), quantityX, itemY)
      .text(`₹${order.price.toLocaleString()}`, priceX, itemY)
      .text(
        `₹${(order.price * order.quantity).toLocaleString()}`,
        amountX,
        itemY
      );

    doc
      .moveTo(50, itemY + 20)
      .lineTo(550, itemY + 20)
      .stroke();

    // Handle discount if applicable
    let currentY = itemY + 30;

    if (order.discountAmount > 0) {
      doc
        .text("Discount:", 350, currentY)
        .text(`-₹${order.discountAmount.toLocaleString()}`, amountX, currentY);
      currentY += 15;
    }

    // Draw the total
    doc
      .fontSize(12)
      .text("Total:", 350, currentY)
      .text(`₹${order.price.toLocaleString()}`, amountX, currentY);

    currentY += 30;

    // Payment information
    doc
      .fontSize(10)
      .text("Payment Method:", 50, currentY)
      .text(paymentDetails.method || "Wallet", 150, currentY);

    currentY += 15;

    doc
      .text("Payment Status:", 50, currentY)
      .text(order.paymentComplete ? "Paid" : "Partially Paid", 150, currentY);

    // If partial payment, show payment plan
    if (order.isPartialPayment) {
      currentY += 30;
      doc.fontSize(12).text("Payment Plan", 50, currentY);
      currentY += 15;

      // Payment plan table header
      doc
        .fontSize(10)
        .text("Installment", 50, currentY)
        .text("Amount", 150, currentY)
        .text("Due Date", 250, currentY)
        .text("Status", 350, currentY);

      currentY += 15;

      // Draw a line
      doc.moveTo(50, currentY).lineTo(550, currentY).stroke();

      currentY += 15;

      // List installments
      order.installments.forEach((installment, index) => {
        doc
          .text(
            `#${installment.installmentNumber} (${installment.percentage}%)`,
            50,
            currentY
          )
          .text(`₹${installment.amount.toLocaleString()}`, 150, currentY)
          .text(
            installment.dueDate
              ? new Date(installment.dueDate).toLocaleDateString()
              : "N/A",
            250,
            currentY
          )
          .text(installment.paid ? "Paid" : "Pending", 350, currentY);

        currentY += 20;
      });
    }

    // Footer
    const footerTop = 700;
    doc
      .fontSize(10)
      .text("Thank you for your business!", 50, footerTop, { align: "center" })
      .text(`Generated on ${new Date().toLocaleString()}`, 50, footerTop + 15, {
        align: "center",
      });

    // Handle document streaming properly
    return new Promise((resolve, reject) => {
      const chunks = [];

      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        const result = Buffer.concat(chunks);
        console.log("PDF generation complete, size:", result.length);
        resolve(result);
      });

      doc.on("error", (err) => {
        console.error("PDF generation error:", err);
        reject(err);
      });

      // End the document to finalize it
      doc.end();
    });
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    throw error;
  }
};

/**
 * Send wallet recharge confirmation email
 * @param {Object} user - User object with name and email
 * @param {Object} transaction - Transaction details
 * @returns {Promise<Boolean>} - Success status
 */
const sendWalletRechargeConfirmationEmail = async (user, transaction) => {
  try {
    if (!user || !user.email) {
      console.warn(
        "No user email found for sending wallet recharge confirmation"
      );
      return false;
    }

    const emailData = {
      from: `${process.env.FROM_NAME || "Your Company"} <${process.env.FROM_EMAIL}>`,
      to: [user.email],
      subject: "Wallet Recharge Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Wallet Recharge Confirmation</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hello ${user.name},</p>
            
            <p>We're pleased to confirm that your wallet has been successfully recharged!</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #333;">Recharge Details</h2>
              <p><strong>Transaction ID:</strong> ${transaction.transactionId}</p>
              <p><strong>Amount:</strong> ₹${transaction.amount.toLocaleString()}</p>
              <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleString()}</p>
              <p><strong>Payment Method:</strong> ${transaction.paymentMethod || "UPI"}</p>
              ${transaction.upiTransactionId ? `<p><strong>UPI Reference:</strong> ${transaction.upiTransactionId}</p>` : ""}
            </div>
            
            <p>Your updated wallet balance is now reflected in your account.</p>
            
            <p>If you have any questions about this transaction, please contact our support team.</p>
            
            <p>Thank you for choosing our services!</p>
            
            <p>Best regards,<br>Your Company Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending wallet recharge confirmation email:", error);
      return false;
    }

    console.log(
      "Wallet recharge confirmation email sent successfully to:",
      user.email,
      data
    );
    return true;
  } catch (error) {
    console.error("Error sending wallet recharge confirmation email:", error);
    return false;
  }
};

/**
 * Send payment rejection email
 * @param {Object} user - User object with name and email
 * @param {Object} transaction - Transaction details
 * @param {Object} order - Order details if applicable
 * @param {String} rejectionReason - Reason for rejection
 * @returns {Promise<Boolean>} - Success status
 */
const sendPaymentRejectionEmail = async (
  user,
  transaction,
  order,
  rejectionReason
) => {
  try {
    if (!user || !user.email) {
      console.warn(
        "No user email found for sending payment rejection notification"
      );
      return false;
    }

    // Different content based on whether this is an order payment or wallet recharge
    let subject, heading, details;

    if (order) {
      // For order payment rejections
      subject = "Order Payment Rejected";
      heading = "Order Payment Rejected";
      details = `
        <p>We regret to inform you that your payment for the following order has been rejected:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #333;">Order Details</h2>
          <p><strong>Product:</strong> ${order.productId.serviceName}</p>
          <p><strong>Transaction ID:</strong> ${transaction.transactionId}</p>
          <p><strong>Amount:</strong> ₹${transaction.amount.toLocaleString()}</p>
          <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleString()}</p>
        </div>
      `;
    } else {
      // For wallet recharge rejections
      subject = "Wallet Recharge Rejected";
      heading = "Wallet Recharge Rejected";
      details = `
        <p>We regret to inform you that your wallet recharge transaction has been rejected:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #333;">Transaction Details</h2>
          <p><strong>Transaction ID:</strong> ${transaction.transactionId}</p>
          <p><strong>Amount:</strong> ₹${transaction.amount.toLocaleString()}</p>
          <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleString()}</p>
        </div>
      `;
    }

    const emailData = {
      from: `${process.env.FROM_NAME || "Your Company"} <${process.env.FROM_EMAIL}>`,
      to: [user.email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e74c3c; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">${heading}</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hello ${user.name},</p>
            
            ${details}
            
            <div style="background-color: #fff4f4; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #e74c3c;">
              <h3 style="margin-top: 0; color: #e74c3c;">Reason for Rejection</h3>
              <p>${rejectionReason}</p>
            </div>
            
            <p>Please make a new payment if you wish to complete your transaction. If you believe this is an error, please contact our support team.</p>
            
            <p>Thank you for your understanding.</p>
            
            <p>Best regards,<br>Your Company Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending payment rejection email:", error);
      return false;
    }

    console.log(
      "Payment rejection email sent successfully to:",
      user.email,
      data
    );
    return true;
  } catch (error) {
    console.error("Error sending payment rejection email:", error);
    return false;
  }
};

/**
 * Send wallet recharge rejection email
 * @param {Object} user - User object with name and email
 * @param {Object} transaction - Transaction details
 * @param {String} rejectionReason - Reason for rejection
 * @returns {Promise<Boolean>} - Success status
 */
const sendWalletRechargeRejectionEmail = async (
  user,
  transaction,
  rejectionReason
) => {
  // Use the generic payment rejection function with null order
  return sendPaymentRejectionEmail(user, transaction, null, rejectionReason);
};

/**
 * Send confirmation email to user who submitted contact form
 * @param {Object} contactData - The contact request data
 * @returns {Promise<Boolean>} - Success status
 */
const sendContactFormConfirmation = async (contactData) => {
  try {
    const emailData = {
      from: `${process.env.FROM_NAME || "Mera Software"} <${process.env.FROM_EMAIL}>`,
      to: [contactData.email],
      subject: "Thank You for Contacting Us",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e74c3c; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Thank You for Contacting Us</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hello ${contactData.name},</p>
            
            <p>Thank you for reaching out to us. We have received your request for account creation.</p>
            
            <p>Our team will review your information and contact you shortly to help set up your account.</p>
            
            <p>If you have any urgent questions, please feel free to call us directly.</p>
            
            <p>Best regards,<br>Mera Software Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Mera Software. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending contact form confirmation email:", error);
      return false;
    }

    console.log(
      "Contact form confirmation email sent successfully to:",
      contactData.email,
      data
    );
    return true;
  } catch (error) {
    console.error("Error sending contact form confirmation email:", error);
    return false;
  }
};

/**
 * Send notification to admin about new contact request
 * @param {Object} contactData - The contact request data
 * @param {Array|String} adminEmails - Admin email addresses
 * @returns {Promise<Boolean>} - Success status
 */
const sendContactRequestNotification = async (contactData, adminEmails) => {
  try {
    // Make sure we have an array of emails
    const emails = Array.isArray(adminEmails) ? adminEmails : [adminEmails];

    const productInfo = contactData.productId
      ? `<p><strong>Related Product ID:</strong> ${contactData.productId}</p>`
      : "<p><strong>Related Product:</strong> None</p>";

    const emailData = {
      from: `${process.env.FROM_NAME || "Mera Software"} <${process.env.FROM_EMAIL}>`,
      to: emails,
      subject: "New Account Creation Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Account Creation Request</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>A new account creation request has been submitted through the contact form:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #333;">Contact Details</h2>
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Phone:</strong> ${contactData.phone}</p>
              <p><strong>Request Type:</strong> Account Creation</p>
              ${productInfo}
              <p><strong>Message:</strong> ${contactData.message}</p>
              <p><strong>Date Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>Please reach out to this customer to complete their account setup process.</p>
            
            <p>You can also manage this request from the admin dashboard.</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Mera Software. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending admin notification email:", error);
      return false;
    }

    console.log("Admin notification email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Error sending admin notification email:", error);
    return false;
  }
};

/**
 * Send project update email when a checkpoint is completed
 * @param {Object} user - User object with name and email
 * @param {Object} updateData - Update data including checkpoint and message
 * @param {Object} project - The project object
 * @returns {Promise<Boolean>} - Success status
 */
const sendProjectUpdateEmail = async (user, updateData, project) => {
  try {
    // Process link buttons in message
    const processedMessage = processMessageForEmail(updateData.message);

    const emailData = {
      from: `${process.env.FROM_NAME || "Website Service"} <${process.env.FROM_EMAIL}>`,
      to: [user.email],
      subject: `Project Update: ${updateData.projectName} - Milestone Completed`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Project Update</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hello ${updateData.clientName},</p>
            
            <p>We have an exciting update on your website project <strong>${updateData.projectName}</strong>!</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #333;">Milestone Completed</h2>
              <p><strong>${updateData.checkpointName}</strong> is now complete!</p>
              <p>${processedMessage}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <p><strong>Project Progress:</strong> ${updateData.projectProgress}% complete</p>
              <div style="background-color: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #4CAF50; height: 100%; width: ${updateData.projectProgress}%;"></div>
              </div>
            </div>
            
            <p>${updateData.developerName} is working diligently to move your project forward. If you have any questions or need clarification, please don't hesitate to reach out.</p>
            
            <p>You can log in to your account to view detailed updates and provide feedback.</p>
            
            <p>Thank you for your continued collaboration!</p>
            
            <p>Best regards,<br>The Website Service Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending project update email:", error);
      return false;
    }

    console.log("Project update email sent successfully to:", user.email, data);
    return true;
  } catch (error) {
    console.error("Error sending project update email:", error);
    return false;
  }
};

/**
 * Message में special link markup और new line को process करता है
 * @param {string} message - Process करने के लिए message
 * @returns {string} - HTML button और break tag के साथ processed message
 */
const processMessageForEmail = (message) => {
  if (!message) return message;

  // पहले link button process करें
  // [[Text||URL]] pattern को match करें
  const linkPattern = /\[\[(.+?)\|\|(.+?)\]\]/g;

  // इस pattern को HTML button से replace करें
  let processedMessage = message.replace(linkPattern, (match, text, url) => {
    // सुनिश्चित करें कि URL सही है
    let safeUrl = url.trim();
    if (!safeUrl.startsWith("http://") && !safeUrl.startsWith("https://")) {
      safeUrl = "https://" + safeUrl;
    }

    // HTML button बनाएं
    return `
    <div>
      <a href="${safeUrl}" style="background-color: #4A90E2; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">${text.trim()}</a>
    </div>
    `;
  });

  // फिर new line character को <br> tag से replace करें
  processedMessage = processedMessage.replace(/\n/g, "<br>");

  return processedMessage;
};

/**
 * Send project message email when admin sends a message
 * @param {Object} user - User object with name and email
 * @param {Object} messageData - Message data
 * @param {Object} project - The project object
 * @returns {Promise<Boolean>} - Success status
 */
const sendProjectMessageEmail = async (user, messageData, project) => {
  try {
    const processedMessage = processMessageForEmail(messageData.message);

    const emailData = {
      from: `${process.env.FROM_NAME || "Website Service"} <${process.env.FROM_EMAIL}>`,
      to: [user.email],
      subject: `New Message About Your Project: ${messageData.projectName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Project Message</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hello ${messageData.clientName},</p>
            
            <p>You have received a new message regarding your website project <strong>${messageData.projectName}</strong>:</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4A90E2;">
              <p>${processedMessage}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <p><strong>Current Progress:</strong> ${messageData.projectProgress}% complete</p>
              <div style="background-color: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #4CAF50; height: 100%; width: ${messageData.projectProgress}%;"></div>
              </div>
            </div>
            
            <p>To view all messages and updates, please log in to your account dashboard.</p>
            
            <p>If you have any questions or need to respond to this message, you can do so through your account or by replying to this email.</p>
            
            <p>Thank you for your continued collaboration!</p>
            
            <p>Best regards,<br>${messageData.developerName}<br>Website Service Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p>If you have any issues, please contact our support team.</p>
          </div>
        </div>
      `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending project message email:", error);
      return false;
    }

    console.log(
      "Project message email sent successfully to:",
      user.email,
      data
    );
    return true;
  } catch (error) {
    console.error("Error sending project message email:", error);
    return false;
  }
};

// MultipleFiles/emailService.js
// ... (existing code)

/**
 * Send notification to admin about new website requirement submission
 * @param {Object} formData - The website requirement form data
 * @param {Array|String} adminEmails - Admin email addresses
 * @returns {Promise<Boolean>} - Success status
 */
const sendWebsiteRequirementNotification = async (formData, adminEmails) => {
  try {
    const emails = Array.isArray(adminEmails) ? adminEmails : [adminEmails];

    const emailData = {
      from: `${process.env.FROM_NAME || "Mera Software"} <${process.env.FROM_EMAIL}>`,
      to: emails,
      subject: "New Website Requirement Submission",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">New Website Requirement Submitted</h1>
              </div>

              <div style="padding: 20px;">
                <p>A new website development requirement has been submitted:</p>

                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h2 style="margin-top: 0; color: #333;">Client Details</h2>
                  <p><strong>Full Name:</strong> ${formData.fullName}</p>
                  <p><strong>Email:</strong> ${formData.emailAddress}</p>
                  <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
                  ${formData.companyName ? `<p><strong>Company Name:</strong> ${formData.companyName}</p>` : ""}
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h2 style="margin-top: 0; color: #333;">Website Requirements</h2>
                  <p><strong>Business Category:</strong> ${formData.businessCategory}</p>
                  <p><strong>Business Sub-Category:</strong> ${formData.businessType}</p>
                  <p><strong>Update Plan:</strong> ${formData.updatePlan}</p>
                  ${formData.whoUpdates ? `<p><strong>Who Updates:</strong> ${formData.whoUpdates}</p>` : ""}
                  <p><strong>Budget Range:</strong> ${formData.budgetRange}</p>
                  <p><strong>Contact Preference:</strong> ${formData.contactPreference}</p>
                  <p><strong>Requirements:</strong><br>${formData.requirements.replace(/\n/g, "<br>")}</p>
                  <p><strong>Date Submitted:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <p>Please review these details and contact the client as per their preference.</p>
              </div>

              <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                <p>© ${new Date().getFullYear()} Mera Software. All rights reserved.</p>
              </div>
            </div>
          `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error(
        "Error sending website requirement admin notification email:",
        error
      );
      return false;
    }

    console.log(
      "Website requirement admin notification email sent successfully:",
      data
    );
    return true;
  } catch (error) {
    console.error(
      "Error sending website requirement admin notification email:",
      error
    );
    return false;
  }
};

/**
 * Send confirmation email to user after website requirement submission
 * @param {Object} formData - The website requirement form data
 * @returns {Promise<Boolean>} - Success status
 */
const sendWebsiteRequirementConfirmation = async (formData) => {
  try {
    const emailData = {
      from: `${process.env.FROM_NAME || "Mera Software"} <${process.env.FROM_EMAIL}>`,
      to: [formData.emailAddress],
      subject: "Your Website Requirement Submission Received",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Thank You for Your Submission!</h1>
              </div>

              <div style="padding: 20px;">
                <p>Hello ${formData.fullName},</p>

                <p>We have successfully received your website development requirements.</p>

                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h2 style="margin-top: 0; color: #333;">Your Submission Summary</h2>
                  <p><strong>Business Category:</strong> ${formData.businessCategory}</p>
                  <p><strong>Business Sub-Category:</strong> ${formData.businessType}</p>
                  <p><strong>Update Plan:</strong> ${formData.updatePlan}</p>
                  <p><strong>Budget Range:</strong> ${formData.budgetRange}</p>
                  <p><strong>Contact Preference:</strong> ${formData.contactPreference}</p>
                </div>

                <p>Our team will review your details and contact you within 24 hours to discuss your project further.</p>
                <p>We look forward to helping you build your perfect website!</p>

                <p>Best regards,<br>Mera Software Team</p>
              </div>

              <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                <p>© ${new Date().getFullYear()} Mera Software. All rights reserved.</p>
              </div>
            </div>
          `,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error(
        "Error sending website requirement user confirmation email:",
        error
      );
      return false;
    }

    console.log(
      "Website requirement user confirmation email sent successfully to:",
      formData.emailAddress,
      data
    );
    return true;
  } catch (error) {
    console.error(
      "Error sending website requirement user confirmation email:",
      error
    );
    return false;
  }
};

module.exports = {
  sendUpdateRequestNotification,
  sendUserConfirmation,
  sendDeveloperAssignedNotification,
  sendUpdateCompletedNotification,
  sendDeveloperAssignmentEmail,
  // Purchase related exports
  sendPurchaseConfirmationEmail,
  generateInvoicePdf,
  // Wallet related exports
  sendWalletRechargeConfirmationEmail,
  sendPaymentRejectionEmail,
  sendWalletRechargeRejectionEmail,
  // Contact form exports
  sendContactFormConfirmation,
  sendContactRequestNotification,
  // Project related exports
  sendProjectUpdateEmail,
  sendProjectMessageEmail,
  sendWebsiteRequirementNotification,
  sendWebsiteRequirementConfirmation
};
