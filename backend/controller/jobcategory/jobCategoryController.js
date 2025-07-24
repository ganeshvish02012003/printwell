// const JobCategory = require("../../models/JobCategory");

// // ✅ Add Job Category
// const AddJobCategory = async (req, res) => {
//   try {
//     const { label, value } = req.body;

//     if (!label || !value) {
//       return res.status(400).json({ error: "Label and Value are required." });
//     }

//     const existing = await JobCategory.findOne({ $or: [{ label }, { value }] });
//     if (existing) {
//       return res.status(409).json({ error: "Category already exists." });
//     }

//     const newCategory = new JobCategory({ label, value });
//     await newCategory.save();
//     res.status(201).json({ message: "Category added successfully", category: newCategory });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add job category", details: error.message });
//   }
// };

// const AllJobCategory = async (req, res) => {
//     try {
//       const categories = await JobCategory.find().sort({ label: 1 });
//       res.status(200).json({
//         success: true,
//         data: categories,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         error: "Failed to fetch job categories",
//         details: error.message,
//       });
//     }
//   };
  

// // ✅ Update Job Category
// const UpdateJobCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { label, value } = req.body;

//     const updated = await JobCategory.findByIdAndUpdate(
//       id,
//       { label, value },
//       { new: true, runValidators: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Category not found" });
//     }

//     res.status(200).json({ message: "Category updated", category: updated });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update category", details: error.message });
//   }
// };

// // ✅ Delete Job Category
// const DeleteJobCategory = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       const deleted = await JobCategory.findByIdAndDelete(id);
  
//       if (!deleted) {
//         return res.status(404).json({ error: "Category not found" });
//       }
  
//       res.status(200).json({ message: "Category deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete category", details: error.message });
//     }
//   };
  

// module.exports = {
//   AddJobCategory,
//   AllJobCategory,
//   UpdateJobCategory,
//   DeleteJobCategory,
// };



const JobCategory = require("../../models/JobCategory");

// ✅ Add Job Category
const AddJobCategory = async (req, res) => {
  try {
    const { label, value } = req.body;

    if (!label || !value) {
      return res.status(400).json({
        success: false,
        message: "Label and Value are required.",
      });
    }

    const existing = await JobCategory.findOne({ $or: [{ label }, { value }] });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const newCategory = new JobCategory({ label, value });
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add job category",
      error: error.message,
    });
  }
};

// ✅ Get All Job Categories
const AllJobCategory = async (req, res) => {
  try {
    const categories = await JobCategory.find().sort({ label: 1 });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job categories",
      error: error.message,
    });
  }
};

// ✅ Update Job Category
const UpdateJobCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, value } = req.body;

    if (!label || !value) {
      return res.status(400).json({
        success: false,
        message: "Label and Value are required.",
      });
    }

    const updated = await JobCategory.findByIdAndUpdate(
      id,
      { label, value },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// ✅ Delete Job Category
const DeleteJobCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await JobCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

module.exports = {
  AddJobCategory,
  AllJobCategory,
  UpdateJobCategory,
  DeleteJobCategory,
};
