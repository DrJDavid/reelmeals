import { Timestamp } from "firebase/firestore";

export interface FirestoreVideo {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookingTime: number; // in minutes
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
    estimatedPrice?: number; // Price in cents
    notes?: string;
  }>;
  instructions: Array<{
    step: number;
    description: string;
    timestamp?: number; // Video timestamp where this step occurs
    duration?: number; // Estimated duration of this step
  }>;
  nutrition: {
    servings: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tags: string[];
  likes: number;
  views: number;
  uploadedByUserId: string;
  aiMetadata: {
    detectedIngredients: string[];
    detectedTechniques: string[];
    confidenceScore: number;
    suggestedHashtags: string[];
    equipmentNeeded: string[];
    skillLevel: string;
    totalTime: number; // in minutes
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    estimatedCost: {
      min: number; // in cents
      max: number; // in cents
      currency: string;
    };
    lastProcessed: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: "processing" | "active" | "failed";
  error?: string;
}

export interface FirestoreCollection {
  id: string;
  userId: string;
  name: string;
  description: string;
  videoIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreUser {
  id?: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  favoriteRecipes?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Helper function to convert timestamps
export function withTimestamps<T extends Record<string, any>>(
  data: T
): T & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
} {
  const now = Timestamp.now();
  return {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
}

// Helper function to update timestamp
export function withUpdatedTimestamp<T extends { updatedAt: Timestamp }>(
  data: T
): T {
  return {
    ...data,
    updatedAt: Timestamp.now(),
  };
}
