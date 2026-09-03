export const AdminAuth = (req, res, next) => {
  console.log("Checking Admin Auth");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized User");
  } else {
    next();
  }
};

export const UserAuth = (req, res, next) => {
  console.log("Checking User Auth");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized User");
  } else {
    next();
  }
};
