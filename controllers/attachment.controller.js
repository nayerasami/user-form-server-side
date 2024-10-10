// const cloudinary = require("../config/cloudinary.config");
// const attachment = require("../models/attachment");
// const ApiError = require("../utilities/ErrorClass");
// const sharp = require("sharp");

// module.exports.createAttachment = async (req, res, next) => {
//   const resizedImage = await sharp(req.file.buffer)
//     .resize(200, 200)
//     .jpeg({ quality: 80 })
//     .toBuffer();

//   if (resizedImage.length > 10485760) {
//     return next(new ApiError("Compressed image size is still too large", 400));
//   }

//   cloudinary.uploader.upload_stream({ folder: "user-images" }, async (error, result) => {
//       if (error) {
//         return next(error);
//       }


//      await attachment.create({
//         attachable_type:'userPic',
//         attachable_id:user.id,
//         name: result.secure_url,
//       });


//       res.status(201).json({ message: "Image uploaded successfully", attachment });
//     }).end(resizedImage);
// };
