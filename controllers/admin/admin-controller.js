import * as adminDao from "./admin-dao.js";

const AdminController = (app) => {
  const getAdminStats = async (req, res) => {
    try {
      const data = await adminDao.aggregateUsers([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  app.get("/stats", getAdminStats);
};

export default AdminController;
