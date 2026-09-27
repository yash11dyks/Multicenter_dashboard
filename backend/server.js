const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running' });
});

// Create a new participant (enrollment)
app.post('/api/participants', async (req, res) => {
  try {
    const { siteId, consentStatus } = req.body;

    if (!siteId || !consentStatus) {
      return res.status(400).json({ error: 'siteId and consentStatus are required' });
    }

    const participant = await prisma.participant.create({
      data: { siteId, consentStatus },
    });

    res.status(201).json(participant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create participant' });
  }
});

// List all participants
app.get('/api/participants', async (req, res) => {
  try {
    const participants = await prisma.participant.findMany({
      include: { site: true },
    });
    res.json(participants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
});

// List all sites (for dropdown)
app.get('/api/sites', async (req, res) => {
  try {
    const sites = await prisma.siteMaster.findMany();
    res.json(sites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));