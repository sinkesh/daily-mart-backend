const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
    destination: "public/brand_doc/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

module.exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 500, // 10
    },

    fileFilter: (req, files, cb) => {
        if (
            files.mimetype == "video/mp4" ||
            files.mimetype == "video/x-flv" ||
            files.mimetype == "video/MP2T" ||
            files.mimetype == "video/3gpp" ||
            files.mimetype == "video/quicktime" ||
            files.mimetype == "video/x-msvideo" ||
            files.mimetype == "video/x-ms-wmv" ||
            files.mimetype == "audio/mpeg3" ||
            files.mimetype == "audio/mp3" ||
            files.mimetype == "audio/mpeg" ||
            files.mimetype == "audio/x-mpeg-3" ||
            files.mimetype == "audio/basic" ||
            files.mimetype == "audio/mp4" ||
            files.mimetype == "audio/x-aiff" ||
            files.mimetype == "image/png" ||
            files.mimetype == "image/jpg" ||
            files.mimetype == "image/jpeg" ||
            files.mimetype == "image/gif" ||
            files.mimetype == "image/PNG" ||
            files.mimetype == "image/JPG" ||
            files.mimetype == "image/JPEG" ||
            files.mimetype == "image/GIF" ||
            files.mimetype == "application/msword" ||
            files.mimetype == "application/vnd.openxmlformats" ||
            files.mimetype == "application/pdf" ||
            files.mimetype == "application/msword" ||
            files.mimetype == "text/csv" ||
            files.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            files.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (xlsx)" ||
            files.mimetype == "application/xhtml+xml" ||
            files.mimetype.includes("excel") ||
            files.mimetype.includes("spreadsheetml")
        ) {
            cb(null, true);
        } else {
            cb("Sorry, pick valid file ", false);
        }
    },
});