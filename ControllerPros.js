import * as prdModel from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// create Data
export const createProductController = async (req, res) => {
  try {
    let prdImageUrl = null;
    let prdImagePublicId = null;

    if (req.file) {
      const up = await new Promise((resolve, rejects) => {
        cloudinary.uploader.upload_stream(
          { folder: "imgprd" },
          (error, result) => {
            if (error) rejects(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      // https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg
      prdImageUrl = up.secure_url;
      prdImagePublicId = up.public_id;
    }

    const result = await prdModel.creatprd([
      req.body.prd_name,
      req.body.prd_qty,
      req.body.prd_price,
      prdImageUrl,
      prdImagePublicId,
    ]);

    res.status(201).json({
      messages: "Product created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      messages: "Internal server error",
      error: err.message,
    });
  }
};

//get all data
export const getAllProductController = async (req, res) => {
  try {
    const result = await prdModel.getAllPrd();

    res.status(200).json({
      messages: "Get all products successfully",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      messages: "Internal server error",
      error: err.message,
    });
  }
};

// get product_id
export const getByIdProductController = async (req, res) =>{
  try{
    const id = req.params.id;
    const result = await prdModel.getByIdprd(id);

     if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      messages: "Get id products successfully",
      data: result.rows,
    });

  }catch(err){
    res.status(500).json({
      messages: "Internal server error",
      error: err.message,
    });

  }
}

// update table
export const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const oldData = await prdModel.getByIdprd(id);


    if (oldData.rows.length === 0) {
      return res.status(404).json({
        messages: "Product not found"
      });
    }

    let prdImageUrl = oldData.rows[0].prd_image;
    let prdImagePublicId = oldData.rows[0].prd_image_publicid;

    if (req.file) {
      //  delete OLD image FIRST
      if (prdImagePublicId) {
        await cloudinary.uploader.destroy(prdImagePublicId);
      }

      //  upload NEW image
      const up = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "imgprd" },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(req.file.buffer);
      });

      //  replace with NEW image
      prdImageUrl = up.secure_url;
      prdImagePublicId = up.public_id;
    }


    const result = await prdModel.updateprd([
      req.body.prd_name,
      req.body.prd_qty,
      req.body.prd_price,
      prdImageUrl,
      prdImagePublicId,
      id,
    ]);

    res.status(200).json({
      messages: "Product updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      messages: "Internal server error",
      error: err.message,
    });
  }
};


//Delete
export const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;

    const oldData = await prdModel.getByIdprd(id);
    if (oldData.rows.length === 0) {
      return res.status(404).json({ messages: "Product not found" });
    }

    const publicId = oldData.rows[0].prd_image_publicid;

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await prdModel.deleteprd(id);

    res.status(200).json({
      messages: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      messages: "Internal server error",
      error: err.message,
    });
  }
};




