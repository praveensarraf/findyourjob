const notFound = (req, res, next) => {
  res.status(404).json({
    message: "Route does not exist!",
    success: false,
  });
};

export default notFound;
