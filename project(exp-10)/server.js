
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve existing plant photos
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

// Convert text watering frequencies into numbers
function getWateringDays(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.min(365, Math.max(1, Math.floor(value)));
  }

  const text = String(value ?? "").toLowerCase().trim();

  if (
    text === "every day" ||
    text === "daily" ||
    text === "everyday"
  ) {
    return 1;
  }

  if (text === "weekly" || text === "every week") {
    return 7;
  }

  if (text === "every two weeks") {
    return 14;
  }

  const match = text.match(/\d+/);

  if (match) {
    const days = Number(match[0]);
    return Math.min(365, Math.max(1, days));
  }

  return 3;
}

// Plant schema
const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      default: "Houseplant"
    },

    species: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: ""
    },

    wateringFrequency: {
      type: Number,
      default: 3,
      min: 1,
      max: 365
    },

    nextWateringDate: {
      type: Date,
      default: null
    },

    photoUrl: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      default: ""
    },

    healthStatus: {
      type: String,
      enum: [
        "Healthy",
        "Needs Attention",
        "Recovery In Progress"
      ],
      default: "Healthy"
    },

    lastWateredAt: {
      type: Date,
      default: null
    },

    wateringHistory: {
      type: [
        {
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

// Reuse the model if it already exists in this server
const Plant =
  mongoose.models.Plant ||
  mongoose.model("Plant", plantSchema);

// Image upload settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeExtension = /^\.[a-z0-9]{1,10}$/.test(extension)
      ? extension
      : ".jpg";

    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`
    );
  }
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image file."));
    }
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "PlantCareTracker backend is running"
  });
});

// Get all plants
app.get("/api/plants", async (req, res, next) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (error) {
    next(error);
  }
});

// Add a plant
app.post(
  "/api/plants",
  upload.single("photo"),
  async (req, res, next) => {
    try {
      const body = req.body;

      if (!body.name || !String(body.name).trim()) {
        return res.status(400).json({
          message: "Plant name is required."
        });
      }

      const wateringDays = getWateringDays(
        body.wateringFrequency ??
        body.wateringDays
      );

      let nextWateringDate = null;

      if (body.nextWateringDate) {
        const suppliedDate = new Date(body.nextWateringDate);

        if (Number.isNaN(suppliedDate.getTime())) {
          return res.status(400).json({
            message: "Invalid next watering date."
          });
        }

        nextWateringDate = suppliedDate;
      } else {
        nextWateringDate = new Date(
          Date.now() + wateringDays * 24 * 60 * 60 * 1000
        );
      }

      const plantData = {
        name: String(body.name).trim(),
        category: body.category || "Houseplant",
        species: body.species || "",
        location: body.location || "",
        wateringFrequency: wateringDays,
        nextWateringDate,
        photoUrl: body.photoUrl || "",
        notes: body.notes || "",
        healthStatus: body.healthStatus || "Healthy"
      };

      if (req.file) {
        plantData.photoUrl = `/uploads/${req.file.filename}`;
      }

      const plant = await Plant.create(plantData);

      res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  }
);

// Mark a plant as watered
app.post("/api/plants/:id/water", async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found."
      });
    }

    const now = new Date();

    const wateringDays = getWateringDays(
      plant.wateringFrequency
    );

    plant.wateringFrequency = wateringDays;
    plant.lastWateredAt = now;

    plant.wateringHistory.push({
      date: now
    });

    plant.nextWateringDate = new Date(
      now.getTime() + wateringDays * 24 * 60 * 60 * 1000
    );

    await plant.save();

    res.json({
      message: "Plant watered successfully.",
      plant
    });
  } catch (error) {
    next(error);
  }
});

// Update a plant
app.put(
  "/api/plants/:id",
  upload.single("photo"),
  async (req, res, next) => {
    try {
      const plant = await Plant.findById(req.params.id);

      if (!plant) {
        return res.status(404).json({
          message: "Plant not found."
        });
      }

      const body = req.body;

      const allowedFields = [
        "name",
        "category",
        "species",
        "location",
        "notes",
        "healthStatus"
      ];

      for (const field of allowedFields) {
        if (body[field] !== undefined) {
          plant[field] = body[field];
        }
      }

      if (
        body.wateringFrequency !== undefined ||
        body.wateringDays !== undefined
      ) {
        const value =
          body.wateringFrequency ?? body.wateringDays;

        plant.wateringFrequency = getWateringDays(value);

        if (!body.nextWateringDate) {
          plant.nextWateringDate = new Date(
            Date.now() +
              plant.wateringFrequency * 24 * 60 * 60 * 1000
          );
        }
      }

      if (body.nextWateringDate !== undefined) {
        if (body.nextWateringDate === "") {
          plant.nextWateringDate = null;
        } else {
          const date = new Date(body.nextWateringDate);

          if (Number.isNaN(date.getTime())) {
            return res.status(400).json({
              message: "Invalid next watering date."
            });
          }

          plant.nextWateringDate = date;
        }
      }

      if (body.photoUrl !== undefined) {
        plant.photoUrl = body.photoUrl;
      }

      if (req.file) {
        plant.photoUrl = `/uploads/${req.file.filename}`;
      }

      await plant.save();

      res.json({
        message: "Plant updated successfully.",
        plant
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete a plant record
app.delete("/api/plants/:id", async (req, res, next) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);

    if (!plant) {
      return res.status(404).json({
        message: "Plant not found."
      });
    }

    res.json({
      message: "Plant deleted successfully."
    });
  } catch (error) {
    next(error);
  }
});

// Get plant problem solutions
app.get("/api/problems", (req, res, next) => {
  try {
    const problemsPath = path.join(__dirname, "problems.json");

    if (!fs.existsSync(problemsPath)) {
      return res.status(404).json({
        message: "problems.json was not found in the backend folder."
      });
    }

    const problems = JSON.parse(
      fs.readFileSync(problemsPath, "utf8")
    );

    res.json(problems);
  } catch (error) {
    next(error);
  }
});

// Handle errors
app.use((error, req, res, next) => {
  console.error("Backend error:", error.message);

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Image must be 5 MB or smaller."
          : error.message
    });
  }

  if (error.name === "ValidationError" ||
      error.name === "CastError") {
    return res.status(400).json({
      message: error.message
    });
  }

  res.status(500).json({
    message: error.message || "Internal server error."
  });
});

// Connect to MongoDB and start server once
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");
    console.log(`Database: ${mongoose.connection.name}`);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not start backend:", error.message);
    process.exit(1);
  }
}

startServer();
