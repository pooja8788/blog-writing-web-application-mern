// middlewares/isSuperAdmin.js

export const isSuperAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({
        error: "Access denied. Only SuperAdmin can access this resource.",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isSuperAdmin middleware:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
