// const Business = require('../models/business.js'); // Import the Business model

// const createBusiness = async (req, res) => {
//   try {
//     const { image, business_name, mobile_number, address } = req.body;

//     // Create a new business record using the Business model
//     const business = await Business.create({
//       image,
//       businessName: business_name,
//       mobileNumber: mobile_number,
//       address,
//     });

//     // Respond with the newly created business
//     res.status(201).json({
//       message: 'Business created successfully',
//       data: business,
//     });
//   } catch (error) {
//     console.error('Error creating business:', error);
//     res.status(500).json({ message: 'Failed to create business', error });
//   }
// };

// module.exports = { createBusiness };
