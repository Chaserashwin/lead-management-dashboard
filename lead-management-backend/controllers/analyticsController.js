const Lead = require("../models/Lead");

// Get analytics dashboard data
exports.getAnalytics = async (req, res) => {
  try {
    // Total leads count
    const totalLeads = await Lead.countDocuments();

    // Converted leads count
    const convertedLeads = await Lead.countDocuments({ stage: "Converted" });

    // Conversion rate
    const conversionRate =
      totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    // Leads distribution by stage
    const stageDistribution = await Lead.aggregate([
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Total value of all leads
    const totalValueResult = await Lead.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$value" },
        },
      },
    ]);
    const totalValue = totalValueResult[0]?.total || 0;

    // Leads by source
    const sourceDistribution = await Lead.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Average lead value
    const avgValue = totalLeads > 0 ? Math.round(totalValue / totalLeads) : 0;

    // Leads created in last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const leadsLast7Days = await Lead.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // High value leads (>100000)
    const highValueLeads = await Lead.countDocuments({
      value: { $gte: 100000 },
    });

    res.json({
      success: true,
      totalLeads,
      convertedLeads,
      conversionRate,
      totalValue,
      avgValue,
      stageDistribution,
      sourceDistribution,
      leadsLast7Days,
      highValueLeads,
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error: error.message,
    });
  }
};

// Get revenue analytics
exports.getRevenueAnalytics = async (req, res) => {
  try {
    // Revenue by stage
    const revenueByStage = await Lead.aggregate([
      {
        $group: {
          _id: "$stage",
          total: { $sum: "$value" },
          count: { $sum: 1 },
          avg: { $avg: "$value" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    // Revenue by source
    const revenueBySource = await Lead.aggregate([
      {
        $group: {
          _id: "$source",
          total: { $sum: "$value" },
          count: { $sum: 1 },
          avg: { $avg: "$value" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    // Top leads
    const topLeads = await Lead.find().sort({ value: -1 }).limit(10).lean();

    res.json({
      success: true,
      revenueByStage,
      revenueBySource,
      topLeads,
    });
  } catch (error) {
    console.error("Get revenue analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching revenue analytics",
      error: error.message,
    });
  }
};
