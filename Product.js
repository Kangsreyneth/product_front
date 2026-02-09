import conn from "../config/db.js";

// Insert Data 
export const creatprd = async (prd) => {
  const sql = `INSERT INTO product_tb (prd_name, prd_qty, prd_price, prd_image, prd_image_publicid)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`
  return await conn.query(sql, prd);
}

// get All table
export const getAllPrd = async (prd) => {
  const sql = `
      SELECT * FROM product_tb
      ORDER BY prd_id ASC`
  return await conn.query(sql, prd);
}

// GET BY ID in table database
export const getByIdprd = async (id) => {
  const sql = `SELECT * FROM product_tb WHERE prd_id = $1`;
  return await conn.query(sql, [id]);
};

//update Data
export const updateprd = async (prd) => {
  const sql = `
    UPDATE product_tb 
    SET 
      prd_name = $1,
      prd_qty = $2,
      prd_price = $3,
      prd_image = $4,
      prd_image_publicid = $5
    WHERE prd_id = $6
    RETURNING *
  `;
  return await conn.query(sql, prd);
};
// Delete Data 
export const deleteprd = async (id) => {
  const sql = `DELETE FROM product_tb WHERE prd_id = $1`;
  return await conn.query(sql, [id]);
};
