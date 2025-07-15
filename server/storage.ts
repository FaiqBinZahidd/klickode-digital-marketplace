import { 
  users, 
  categories, 
  assets, 
  purchases, 
  reviews, 
  likes,
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Asset,
  type InsertAsset,
  type AssetWithDetails,
  type Purchase,
  type InsertPurchase,
  type Review,
  type InsertReview,
  type Like,
  type InsertLike
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Assets
  getAssets(): Promise<AssetWithDetails[]>;
  getAsset(id: number): Promise<AssetWithDetails | undefined>;
  getAssetsBySeller(sellerId: number): Promise<AssetWithDetails[]>;
  createAsset(asset: InsertAsset): Promise<Asset>;

  // Purchases
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  
  // Reviews
  getReviewsByAsset(assetId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Likes
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(assetId: number, userId: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    // Generate slug from name if not provided
    const slug = insertCategory.slug || this.generateSlug(insertCategory.name);
    
    const [category] = await db
      .insert(categories)
      .values({
        ...insertCategory,
        slug
      })
      .returning();
    return category;
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async getAssets(): Promise<AssetWithDetails[]> {
    const assetsData = await db.select().from(assets);
    return Promise.all(assetsData.map(asset => this.enrichAsset(asset)));
  }

  async getAsset(id: number): Promise<AssetWithDetails | undefined> {
    const [asset] = await db.select().from(assets).where(eq(assets.id, id));
    if (!asset) return undefined;
    return this.enrichAsset(asset);
  }

  async getAssetsBySeller(sellerId: number): Promise<AssetWithDetails[]> {
    const assetsData = await db.select().from(assets).where(eq(assets.sellerId, sellerId));
    return Promise.all(assetsData.map(asset => this.enrichAsset(asset)));
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const [asset] = await db
      .insert(assets)
      .values({
        ...insertAsset,
        status: insertAsset.status || 'draft',
        likes: 0,
        sales: 0,
        featured: insertAsset.featured || false
      })
      .returning();
    return asset;
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const [purchase] = await db
      .insert(purchases)
      .values(insertPurchase)
      .returning();
    return purchase;
  }

  async getReviewsByAsset(assetId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.assetId, assetId));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(insertReview)
      .returning();
    return review;
  }

  async createLike(insertLike: InsertLike): Promise<Like> {
    const [like] = await db
      .insert(likes)
      .values(insertLike)
      .returning();
    return like;
  }

  async deleteLike(assetId: number, userId: number): Promise<void> {
    await db.delete(likes).where(eq(likes.assetId, assetId)).where(eq(likes.userId, userId));
  }

  private async enrichAsset(asset: Asset): Promise<AssetWithDetails> {
    const [category] = asset.categoryId ? await db.select().from(categories).where(eq(categories.id, asset.categoryId)) : [undefined];
    const [seller] = asset.sellerId ? await db.select().from(users).where(eq(users.id, asset.sellerId)) : [undefined];
    const assetReviews = await db.select().from(reviews).where(eq(reviews.assetId, asset.id));
    const avgRating = assetReviews.length > 0 
      ? assetReviews.reduce((sum, r) => sum + r.rating, 0) / assetReviews.length 
      : 0;
    
    return {
      ...asset,
      category,
      seller: seller ? { id: seller.id, username: seller.username, avatar: seller.avatar } : undefined,
      reviewCount: assetReviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
      isLiked: false // Would check against authenticated user
    };
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private assets: Map<number, Asset>;
  private purchases: Map<number, Purchase>;
  private reviews: Map<number, Review>;
  private likes: Map<number, Like>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentAssetId: number;
  private currentPurchaseId: number;
  private currentReviewId: number;
  private currentLikeId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.assets = new Map();
    this.purchases = new Map();
    this.reviews = new Map();
    this.likes = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentAssetId = 1;
    this.currentPurchaseId = 1;
    this.currentReviewId = 1;
    this.currentLikeId = 1;

    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock Users
    const mockUsers = [
      { 
        id: "1", 
        email: "john@example.com", 
        firstName: "John",
        lastName: "Developer",
        role: "seller", 
        profileImageUrl: "https://placehold.co/40x40/e53935/ffffff?text=J",
        bio: "Full-stack developer with 5+ years experience",
        isVerified: true,
        isActive: true
      },
      { 
        id: "2", 
        email: "jane@example.com", 
        firstName: "Jane",
        lastName: "Designer",
        role: "seller", 
        profileImageUrl: "https://placehold.co/40x40/e53935/ffffff?text=J",
        bio: "UI/UX designer passionate about clean interfaces",
        isVerified: true,
        isActive: true
      },
      { 
        id: "3", 
        email: "mike@example.com", 
        firstName: "Mike",
        lastName: "Creator",
        role: "buyer", 
        profileImageUrl: "https://placehold.co/40x40/e53935/ffffff?text=M",
        bio: "Creative entrepreneur and tech enthusiast",
        isVerified: false,
        isActive: true
      }
    ];

    mockUsers.forEach(user => {
      this.users.set(parseInt(user.id), { ...user, createdAt: new Date(), updatedAt: new Date() });
    });

    // Mock Categories
    const mockCategories = [
      { name: "UI Kits", slug: "ui-kits", description: "Complete UI component libraries", icon: "layers" },
      { name: "Templates", slug: "templates", description: "Ready-to-use website templates", icon: "layout" },
      { name: "Icons", slug: "icons", description: "High-quality icon sets", icon: "heart" },
      { name: "Mobile", slug: "mobile", description: "Mobile app components", icon: "smartphone" },
      { name: "Web Apps", slug: "web-apps", description: "Full web applications", icon: "globe" },
      { name: "3D Models", slug: "3d-models", description: "3D assets and models", icon: "box" }
    ];

    mockCategories.forEach(category => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...category, id, createdAt: new Date() });
    });

    // Mock Assets (using correct schema format)
    const mockAssets = [
      {
        title: "React Dashboard Template",
        description: "A modern, responsive dashboard template built with React and Tailwind CSS. Perfect for admin panels and data visualization.",
        price: "49.00",
        categoryId: 2,
        sellerId: "1",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=React+Dashboard",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/dashboard.zip"],
        tags: ["react", "tailwind", "dashboard", "admin"],
        featured: true
      },
      {
        title: "E-commerce UI Kit",
        description: "Complete e-commerce UI components including product cards, shopping cart, checkout flow, and more.",
        price: "79.00",
        categoryId: 1,
        sellerId: "2",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=E-commerce+UI",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/ecommerce-ui.zip"],
        tags: ["ui-kit", "e-commerce", "shopping", "figma"],
        featured: false
      },
      {
        title: "Mobile App Wireframe Kit",
        description: "Comprehensive wireframe kit for mobile app design with 50+ screens and components.",
        price: "35.00",
        categoryId: 4,
        sellerId: "1",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Mobile+Wireframes",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/mobile-wireframes.zip"],
        tags: ["mobile", "wireframe", "app", "sketch"],
        featured: true
      },
      {
        title: "Minimal Icon Set",
        description: "200+ minimal and clean icons perfect for modern web and mobile applications.",
        price: "25.00",
        categoryId: 3,
        sellerId: "2",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Icon+Set",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/icons.zip"],
        tags: ["icons", "minimal", "svg", "vector"],
        featured: false
      },
      {
        title: "SaaS Landing Page",
        description: "High-converting landing page template designed specifically for SaaS products.",
        price: "69.00",
        categoryId: 2,
        sellerId: "1",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=SaaS+Landing",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/saas-landing.zip"],
        tags: ["landing-page", "saas", "conversion", "html"],
        featured: true
      },
      {
        title: "3D Cube Models Pack",
        description: "Collection of 12 high-quality 3D cube models with different textures and materials.",
        price: "39.00",
        categoryId: 6,
        sellerId: "2",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=3D+Cubes",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/3d-cubes.zip"],
        tags: ["3d", "cubes", "models", "blender"],
        featured: false
      },
      {
        title: "Chat Application Template",
        description: "Real-time chat application with React, Socket.io, and modern UI design.",
        price: "59.00",
        categoryId: 5,
        sellerId: "1",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Chat+App",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/chat-app.zip"],
        tags: ["react", "socket.io", "chat", "realtime"],
        featured: true
      },
      {
        title: "Portfolio Website Template",
        description: "Clean and modern portfolio website template perfect for designers and developers.",
        price: "29.00",
        categoryId: 2,
        sellerId: "3",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Portfolio",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/portfolio.zip"],
        tags: ["portfolio", "website", "responsive", "css"],
        featured: false
      },
      {
        title: "Task Management App",
        description: "Complete task management application with kanban boards and team collaboration.",
        price: "89.00",
        categoryId: 5,
        sellerId: "2",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Task+Manager",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/task-manager.zip"],
        tags: ["productivity", "kanban", "collaboration", "vue"],
        featured: true
      },
      {
        title: "Food Delivery App UI",
        description: "Modern food delivery app UI with restaurant listings and order tracking.",
        price: "45.00",
        categoryId: 4,
        sellerId: "1",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Food+Delivery",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/food-delivery.zip"],
        tags: ["mobile", "food", "delivery", "ui"],
        featured: false
      },
      {
        title: "Animated Icons Pack",
        description: "100+ animated icons with Lottie files for modern web and mobile apps.",
        price: "39.00",
        categoryId: 3,
        sellerId: "2",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Animated+Icons",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/animated-icons.zip"],
        tags: ["icons", "animation", "lottie", "interactive"],
        featured: true
      },
      {
        title: "Crypto Trading Dashboard",
        description: "Professional cryptocurrency trading dashboard with real-time charts and portfolio tracking.",
        price: "99.00",
        categoryId: 2,
        sellerId: "1",
        thumbnail: "https://placehold.co/400x225/2d3748/e53935?text=Crypto+Dashboard",
        previews: ["https://placehold.co/800x600/2d3748/e53935?text=Preview+1"],
        files: ["/assets/crypto-dashboard.zip"],
        tags: ["crypto", "trading", "dashboard", "charts"],
        featured: true
      }
    ];

    mockAssets.forEach(asset => {
      const id = this.currentAssetId++;
      this.assets.set(id, { ...asset, id, createdAt: new Date(), updatedAt: new Date() });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { 
      ...insertCategory, 
      id, 
      createdAt: new Date() 
    };
    this.categories.set(id, category);
    return category;
  }

  async getAssets(): Promise<AssetWithDetails[]> {
    const assetsArray = Array.from(this.assets.values());
    return assetsArray.map(asset => this.enrichAsset(asset));
  }

  async getAsset(id: number): Promise<AssetWithDetails | undefined> {
    const asset = this.assets.get(id);
    if (!asset) return undefined;
    return this.enrichAsset(asset);
  }

  async getAssetsBySeller(sellerId: number): Promise<AssetWithDetails[]> {
    const assetsArray = Array.from(this.assets.values()).filter(
      asset => asset.sellerId === sellerId
    );
    return assetsArray.map(asset => this.enrichAsset(asset));
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = this.currentAssetId++;
    const asset: Asset = { 
      ...insertAsset, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.assets.set(id, asset);
    return asset;
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const id = this.currentPurchaseId++;
    const purchase: Purchase = { 
      ...insertPurchase, 
      id, 
      createdAt: new Date() 
    };
    this.purchases.set(id, purchase);
    return purchase;
  }

  async getReviewsByAsset(assetId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.assetId === assetId
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id, 
      createdAt: new Date() 
    };
    this.reviews.set(id, review);
    return review;
  }

  async createLike(insertLike: InsertLike): Promise<Like> {
    const id = this.currentLikeId++;
    const like: Like = { 
      ...insertLike, 
      id, 
      createdAt: new Date() 
    };
    this.likes.set(id, like);
    return like;
  }

  async deleteLike(assetId: number, userId: number): Promise<void> {
    const like = Array.from(this.likes.values()).find(
      l => l.assetId === assetId && l.userId === userId
    );
    if (like) {
      this.likes.delete(like.id);
    }
  }

  private enrichAsset(asset: Asset): AssetWithDetails {
    const category = this.categories.get(asset.categoryId || 0);
    const seller = this.users.get(parseInt(asset.sellerId || "0"));
    const reviews = Array.from(this.reviews.values()).filter(r => r.assetId === asset.id);
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;
    
    return {
      ...asset,
      category,
      seller: seller ? { 
        id: seller.id, 
        firstName: seller.firstName || 'Unknown', 
        lastName: seller.lastName || 'Seller', 
        profileImageUrl: seller.profileImageUrl || 'https://placehold.co/40x40/e53935/ffffff?text=U'
      } : {
        id: "0",
        firstName: 'Unknown',
        lastName: 'Seller',
        profileImageUrl: 'https://placehold.co/40x40/e53935/ffffff?text=U'
      },
      reviewCount: reviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
      isLiked: false // Would check against authenticated user
    };
  }
}

// Database initialization helper
async function ensureRequiredData() {
  try {
    const categories = await storage.getCategories();
    
    if (categories.length === 0) {
      console.log('Setting up initial categories...');
      const defaultCategories = [
        { name: "UI Kits", slug: "ui-kits", description: "Complete user interface design systems" },
        { name: "Templates", slug: "templates", description: "Ready-to-use website and app templates" },
        { name: "Icons", slug: "icons", description: "Icon sets and individual icons" },
        { name: "Mobile", slug: "mobile", description: "Mobile app components and designs" },
        { name: "Web Apps", slug: "web-apps", description: "Full web application templates" },
        { name: "3D Models", slug: "3d-models", description: "3D assets and models" }
      ];
      
      for (const category of defaultCategories) {
        await storage.createCategory(category);
      }
      console.log('Categories initialized');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to ensure required data:', error);
    return false;
  }
}

// Production-ready storage using real database
export const storage = new DatabaseStorage();

// Initialize database with essential data
(async () => {
  try {
    console.log('Initializing production database...');
    
    // Ensure categories exist
    const categories = await storage.getCategories();
    if (categories.length === 0) {
      console.log('Creating default categories...');
      const defaultCategories = [
        { name: "UI Kits", slug: "ui-kits", description: "Complete user interface design systems" },
        { name: "Templates", slug: "templates", description: "Ready-to-use website and app templates" },
        { name: "Icons", slug: "icons", description: "Icon sets and individual icons" },
        { name: "Mobile", slug: "mobile", description: "Mobile app components and designs" },
        { name: "Web Apps", slug: "web-apps", description: "Full web application templates" },
        { name: "3D Models", slug: "3d-models", description: "3D assets and models" }
      ];
      
      for (const category of defaultCategories) {
        await storage.createCategory(category);
      }
      console.log('Default categories created');
    }
    
    const finalCategories = await storage.getCategories();
    const finalAssets = await storage.getAssets();
    
    console.log('Database ready:');
    console.log('Categories loaded:', finalCategories.length);
    console.log('Assets loaded:', finalAssets.length);
    
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
})();
