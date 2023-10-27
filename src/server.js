require("dotenv/config");

require("express-async-errors");

const express = require("express");

const AppError = require("./utils/AppError");
const app = express();
const uploadConfig = require("./configs/upload");

const routes = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(express.static("public")); //recommended by stripe
app.use(cors());
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

app.use(routes);

const PORT = process.env.PORT || 3301;

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  };

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
})

app.listen(PORT, () => console.log(`Server is UP. Running on PORT: ${PORT}`));