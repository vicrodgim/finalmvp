const pool = require("../config/db");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const multer = require("multer");
const upload = multer({ dest: "public/img/" });

const addImage = async (req, res) => {
  const { email } = req.body;
  // file is available at req.file

  const imagefile = req.file;

  // check the extension of the file
  const extension = mime.extension(imagefile.mimetype);

  // create a new random name for the file
  const filename = uuidv4() + "." + extension;

  // grab the filepath for the temporary file
  const tmp_path = imagefile.path;

  // construct the new path for the final file
  const target_path = path.join(__dirname, "../public/img/") + filename;

  console.log(target_path);
  try {
    // rename the file

    await fs.rename(tmp_path, target_path);

    // store image in the DB
    const [result] = await pool.query(
      `UPDATE users SET imageUrl = "${filename}" WHERE email = "${email}";`
    );

    res.status(201).send({ message: "Picture loaded successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Failed to add profile picture",
    });
  }
};

module.exports = {
  addImage,
};
