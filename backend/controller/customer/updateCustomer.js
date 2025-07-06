const CustomerModel = require("../../models/CustomerModel");

async function updateCustomer(req, res) {
  try {
    const { customerId } = req.params;
    const updatedCustomer = await CustomerModel.findOneAndUpdate(
      { customerId },
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Customer updated successfully",
      data: updatedCustomer,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Update failed",
      error: true,
      success: false,
    });
  }
}

module.exports = updateCustomer;
