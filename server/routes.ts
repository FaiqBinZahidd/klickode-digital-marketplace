import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertAssetSchema, insertUserSchema, insertCategorySchema } from "@shared/schema";
import { generateLearningContent, generateCodeExplanation, processAITool } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Learn API - AI Learning Assistant powered by Gemini
  app.post("/api/learn", async (req, res) => {
    try {
      const { topic, level, language } = req.body;
      
      if (!topic || !level || !language) {
        return res.status(400).json({ message: "Missing required fields: topic, level, and language" });
      }
      
      const response = await generateLearningContent(topic, level, language);
      res.json(response);
    } catch (error) {
      console.error("Error in learn API:", error);
      res.status(500).json({ message: "Failed to generate learning content" });
    }
  });

  // Code explanation API
  app.post("/api/explain-code", async (req, res) => {
    try {
      const { code, language } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({ message: "Missing required fields: code and language" });
      }
      
      const explanation = await generateCodeExplanation(code, language);
      res.json({ explanation });
    } catch (error) {
      console.error("Error in code explanation API:", error);
      res.status(500).json({ message: "Failed to explain code" });
    }
  });

  // AI Chat API
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, language = 'javascript', context = 'general' } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Missing required field: message" });
      }
      
      // Use the existing Gemini integration for chat
      const { generateLearningContent } = await import('./gemini');
      
      // Format as a learning/assistance request
      const response = await generateLearningContent(
        message,
        'intermediate', // Default level
        language
      );
      
      res.json({ response });
    } catch (error) {
      console.error("Error in AI chat:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // AI Code Tools API
  app.post("/api/ai-tools", async (req, res) => {
    try {
      const { tool, input, language } = req.body;
      
      if (!tool || !input) {
        return res.status(400).json({ message: "Missing required fields: tool and input" });
      }
      
      const result = await processAITool(tool, input, language);
      res.json({ result });
    } catch (error) {
      console.error("Error in AI tools API:", error);
      res.status(500).json({ message: "Failed to process AI tool request" });
    }
  });

  // User synchronization endpoint for Supabase auth
  app.post("/api/users/sync", async (req, res) => {
    try {
      const { id, email, firstName, lastName, profileImageUrl } = req.body;
      
      if (!id || !email) {
        return res.status(400).json({ message: "Missing required fields: id and email" });
      }

      // Check if user exists
      const existingUser = await storage.getUser(id);
      
      if (!existingUser) {
        // Create new user
        const newUser = await storage.createUser({
          id,
          email,
          firstName,
          lastName,
          profileImageUrl,
          role: "buyer",
          isActive: true,
        });
        
        res.status(201).json({ user: newUser, created: true });
      } else {
        // User exists, optionally update profile
        res.json({ user: existingUser, created: false });
      }
    } catch (error) {
      console.error("Error syncing user:", error);
      res.status(500).json({ message: "Failed to sync user" });
    }
  });

  // Admin/Development seed endpoint
  app.post("/api/seed-assets", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      const existingAssets = await storage.getAssets();
      
      if (existingAssets.length > 0) {
        return res.status(400).json({ message: "Assets already exist" });
      }
      
      // Create sample production assets
      const sampleAssets = [
        {
          title: "Modern Dashboard UI Kit",
          description: "Complete dashboard interface with dark theme and responsive design. Includes 50+ components and multiple layout options.",
          price: "2999",
          categoryId: 1,
          sellerId: "1",
          status: "published",
          featured: true,
          tags: ["dashboard", "ui", "dark", "modern", "responsive"],
          thumbnail: "https://placehold.co/400x300/2d3748/e53935?text=Dashboard+UI+Kit",
          previews: ["https://placehold.co/800x600/2d3748/e53935?text=Dashboard+Preview"],
          files: ["/assets/dashboard-ui-kit.zip"]
        },
        {
          title: "E-commerce React Template",
          description: "Full-featured online store template with shopping cart, payment integration, and admin panel.",
          price: "4999",
          categoryId: 2,
          sellerId: "1",
          status: "published",
          featured: true,
          tags: ["react", "ecommerce", "template", "responsive", "shopping"],
          thumbnail: "https://placehold.co/400x300/2d3748/e53935?text=E-commerce+Template",
          previews: ["https://placehold.co/800x600/2d3748/e53935?text=E-commerce+Preview"],
          files: ["/assets/ecommerce-template.zip"]
        },
        {
          title: "Minimalist Icon Set",
          description: "200+ clean line icons for modern applications. Available in SVG, PNG, and web font formats.",
          price: "1499",
          categoryId: 3,
          sellerId: "1",
          status: "published",
          featured: false,
          tags: ["icons", "minimalist", "line", "svg", "web-font"],
          thumbnail: "https://placehold.co/400x300/2d3748/e53935?text=Icon+Set",
          previews: ["https://placehold.co/800x600/2d3748/e53935?text=Icons+Preview"],
          files: ["/assets/icon-set.zip"]
        },
        {
          title: "Mobile App UI Components",
          description: "Comprehensive mobile UI component library with native iOS and Android designs.",
          price: "3499",
          categoryId: 4,
          sellerId: "1",
          status: "published",
          featured: true,
          tags: ["mobile", "ui", "components", "ios", "android"],
          thumbnail: "https://placehold.co/400x300/2d3748/e53935?text=Mobile+UI",
          previews: ["https://placehold.co/800x600/2d3748/e53935?text=Mobile+Preview"],
          files: ["/assets/mobile-ui.zip"]
        }
      ];
      
      let created = 0;
      for (const asset of sampleAssets) {
        try {
          await storage.createAsset(asset);
          created++;
        } catch (error) {
          console.error("Error creating asset:", error);
        }
      }
      
      res.json({ message: `${created} assets created successfully` });
    } catch (error) {
      console.error("Error seeding assets:", error);
      res.status(500).json({ message: "Failed to seed assets" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Assets
  app.get("/api/assets", async (req, res) => {
    try {
      const assets = await storage.getAssets();
      // Only return published assets for public API
      const publishedAssets = assets.filter(asset => asset.status === 'published');
      res.json(publishedAssets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.get("/api/assets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const asset = await storage.getAsset(id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      // Only return published assets for public API
      if (asset.status !== 'published') {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.json(asset);
    } catch (error) {
      console.error("Error fetching asset:", error);
      res.status(500).json({ message: "Failed to fetch asset" });
    }
  });

  app.post("/api/assets", async (req, res) => {
    try {
      const validatedData = insertAssetSchema.parse(req.body);
      const asset = await storage.createAsset(validatedData);
      res.status(201).json(asset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create asset" });
    }
  });

  // Seller assets
  app.get("/api/seller/assets", async (req, res) => {
    try {
      // In a real app, get seller ID from authenticated user
      const sellerId = 1; // Mock seller ID
      const assets = await storage.getAssetsBySeller(sellerId);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch seller assets" });
    }
  });

  // Users
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Purchases
  app.post("/api/purchases", async (req, res) => {
    try {
      const { assetId, amount } = req.body;
      // In a real app, get buyer ID from authenticated user
      const buyerId = 1; // Mock buyer ID
      
      const purchase = await storage.createPurchase({
        buyerId,
        assetId,
        amount,
        status: "completed"
      });
      res.status(201).json(purchase);
    } catch (error) {
      res.status(500).json({ message: "Failed to create purchase" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
