const { uploadFile } = require("../model/s3");
const sharp = require("sharp");
const variables = require("../variables");

exports.uploadImage = async ctx => {
  try {
    const uploadedFile = ctx.req.file;

    // Use sharp to process the image with minimal changes
    const processedImageBuffer = await sharp(uploadedFile.buffer)
      .modulate({ brightness: 1.1, saturation: 0.8 }) // Adjust brightness and saturation
      .gamma(1.1) // Apply a slight gamma correction
      .toBuffer();

    // Upload the processed image
    await uploadFile(
      processedImageBuffer,
      uploadedFile.originalname,
      uploadedFile.mimetype
    );

    const imageUrl = `${variables.s3Configs.awsLocalEndPoint}/ui/${variables.s3Configs.bucketName}/${uploadedFile.originalname}`;
    return (ctx.body = { data: imageUrl });
  } catch (e) {
    console.log("error", e);
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
};
