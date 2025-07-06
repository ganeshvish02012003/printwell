const CustomerModel = require("../../models/CustomerModel");

async function addCustomer(req, res) {
  try {
    // Find last customer sorted by numeric value of customerId
    const lastCustomer = await CustomerModel.findOne().sort({ customerId: -1 });

    let nextId = 1;
    if (lastCustomer && lastCustomer.customerId) {
      nextId = parseInt(lastCustomer.customerId, 10) + 1;
    }

    const paddedCustomerId = String(nextId).padStart(4, "0"); 

    const newCustomer = new CustomerModel({
      customerId: paddedCustomerId,
      ...req.body,
    });

    const savedCustomer = await newCustomer.save();

    res.status(201).json({
      message: "Customer added successfully",
      data: savedCustomer,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error in addCustomer:", err);
    res.status(500).json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}

module.exports = addCustomer;
