import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import { PlatesDAO } from './dao/fs/plates.js';
import {auth } from './middlewares/auth.js';

process.loadEnvFile();

const __dirname = path.resolve();
const app = express();

//Cors Options
const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS || '[]'); 
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
app.use(cors(corsOptions));

//Middlewares
// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/meals', auth , async (req, res) => {
    const dao = new PlatesDAO();
    const data = await dao.getPlates();
    data === null 
    ? res.status(201).send({message: "No data found" })
    : res.status(201).send({message:"Success!", data})
    }
);
app.get('/meals/:id', auth, async (req, res) => {
    const id = parseInt(req.params.id);
    const dao = new PlatesDAO();
    const data = await dao.getPlate(id);
    data === null 
    ? res.status(404).send({message:"Not Found"}) 
    : res.status(201).send({message:"Success!", data})
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ports ${process.env.PORT}`);
    }
);