import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Paynow Webhook Placeholder
  app.post("/api/webhooks/paynow", (req, res) => {
    console.log("Paynow Webhook Received:", req.body);
    // Logic to update transaction status in Firestore
    res.sendStatus(200);
  });

  // SOS Notification (Africa's Talking)
  app.post("/api/sos", (req, res) => {
    const { userId, location, jobDetails, emergencyContact } = req.body;
    console.log(`[AFRICA_TALKING_SMS] Sending SOS to ${emergencyContact}: 
      "ZimGo EMERGENCY: User ${userId} triggered SOS at ${location.lat}, ${location.lng}. 
      Driver: ${jobDetails.driverName}, Vehicle: ${jobDetails.vehicleReg}"`);
    
    // Integration logic for Africa's Talking SDK would go here
    res.json({ status: "SMS_SENT" });
  });

  // Manual Match Trigger (Simulating Matching Engine 1 & 2)
  app.post("/api/match", (req, res) => {
    const { requestId, type } = req.body;
    console.log(`[MATCHING_ENGINE] Finding best ${type === 'RIDE' ? 'Driver' : 'Courier'} for request ${requestId}...`);
    // Here we would run the logic from matchingService.ts
    res.json({ status: "MATCHING_IN_PROGRESS" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
