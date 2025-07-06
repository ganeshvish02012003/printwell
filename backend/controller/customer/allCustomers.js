const CustomerModel = require("../../models/CustomerModel");

async function allCustomers(req, res) {
  try {
    const allCustomers = await CustomerModel.find().sort({ customerId: 1 }); // Optional: sort by customerId

    res.json({
      message: "All Customers", 
      data: allCustomers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allCustomers;
