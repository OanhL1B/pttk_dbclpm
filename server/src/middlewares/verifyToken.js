import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({
      success: false,
      mes: "Missing access token",
    });

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({
        success: false,
        mes: "Access token expired",
      });

    req.user = user;
    next();
  });
};

const isAdminOrEmployee = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin" && role !== "employee")
    return res.status(401).json({
      success: false,
      mes: " REQUIRE ADMIN ROLE OR EMPLOYEE ROLE",
    });
  next();
};

const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(401).json({
      success: false,
      mes: "REQUIRE ADMIN ROLE",
    });
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isAdminOrEmployee,
};
