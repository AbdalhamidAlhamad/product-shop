import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler";
import path from "path";

export const uploadImageCtrl = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler("Please upload a file", 400));
  }
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
  

  res.status(201).json({
    data: path.join(baseUrl,"/public/images", req.file.filename),
  });
});
