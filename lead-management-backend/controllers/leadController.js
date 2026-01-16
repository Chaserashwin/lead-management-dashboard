const Lead = require("../models/Lead");

// Get all leads with search, filter, sort, pagination
exports.getLeads = async (req, res) => {
  try {
    const {
      search,
      stage,
      source,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by stage
    if (stage && stage !== "All") {
      query.stage = stage;
    }

    // Filter by source
    if (source) {
      query.source = source;
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    // Execute query
    const leads = await Lead.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Count total documents
    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      leads,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Get leads error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leads",
      error: error.message,
    });
  }
};

// Get single lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Get lead by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lead",
      error: error.message,
    });
  }
};

// Create new lead
exports.createLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      stage,
      value,
      source,
      notes,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !company) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: firstName, lastName, email, phone, company",
      });
    }

    // Check if email already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "Lead with this email already exists",
      });
    }

    // Create new lead
    const lead = new Lead({
      firstName,
      lastName,
      email,
      phone,
      company,
      stage: stage || "New",
      value: value || 0,
      source: source || "Website",
      notes,
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.error("Create lead error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating lead",
      error: error.message,
    });
  }
};

// Update lead
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      stage,
      value,
      source,
      notes,
    } = req.body;

    // Check if lead exists
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Check if email is being changed and if new email already exists
    if (email && email !== lead.email) {
      const existingLead = await Lead.findOne({ email });
      if (existingLead) {
        return res.status(409).json({
          success: false,
          message: "Lead with this email already exists",
        });
      }
    }

    // Update fields
    if (firstName) lead.firstName = firstName;
    if (lastName) lead.lastName = lastName;
    if (email) lead.email = email;
    if (phone) lead.phone = phone;
    if (company) lead.company = company;
    if (stage) lead.stage = stage;
    if (value !== undefined) lead.value = value;
    if (source) lead.source = source;
    if (notes !== undefined) lead.notes = notes;

    lead.updatedAt = new Date();

    await lead.save();

    res.json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error("Update lead error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating lead",
      error: error.message,
    });
  }
};

// Delete lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      message: "Lead deleted successfully",
      lead,
    });
  } catch (error) {
    console.error("Delete lead error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting lead",
      error: error.message,
    });
  }
};

// Get lead statistics
exports.getLeadStats = async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const byStage = await Lead.countDocuments({ stage: "New" });
    const contacted = await Lead.countDocuments({ stage: "Contacted" });
    const qualified = await Lead.countDocuments({ stage: "Qualified" });
    const negotiation = await Lead.countDocuments({ stage: "Negotiation" });
    const converted = await Lead.countDocuments({ stage: "Converted" });

    res.json({
      success: true,
      stats: {
        total,
        new: byStage,
        contacted,
        qualified,
        negotiation,
        converted,
      },
    });
  } catch (error) {
    console.error("Get lead stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lead statistics",
      error: error.message,
    });
  }
};
