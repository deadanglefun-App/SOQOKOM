// Mock Firebase implementation that works without the firebase package
// This simulates Firestore functionality using in-memory storage

type Timestamp = Date;

interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

// In-memory database
const memoryDB: Record<string, any[]> = {
  tokens: [],
  ethical_scores: [],
  staking_positions: [],
  staking_pools: [],
  dao_proposals: [],
  dao_votes: [],
  marketplace_listings: [],
};

// Mock Firestore functions
export const collection = (collectionName: string) => collectionName;

export const doc = (collectionName: string, id: string) => ({ collectionName, id });

export const getDoc = async (docRef: any) => {
  const items = memoryDB[docRef.collectionName] || [];
  const item = items.find((i: any) => i.id === docRef.id);
  return {
    exists: () => !!item,
    id: docRef.id,
    data: () => item,
  };
};

export const getDocs = async (q: any) => {
  const collectionName = typeof q === 'string' ? q : q.collectionName || q;
  const items = memoryDB[collectionName] || [];

  return {
    empty: items.length === 0,
    docs: items.map((item: any) => ({
      id: item.id,
      data: () => item,
      exists: () => true,
    })),
  };
};

export const setDoc = async (docRef: any, data: any) => {
  const collectionName = docRef.collectionName;
  if (!memoryDB[collectionName]) {
    memoryDB[collectionName] = [];
  }

  const existingIndex = memoryDB[collectionName].findIndex((i: any) => i.id === docRef.id);
  if (existingIndex >= 0) {
    memoryDB[collectionName][existingIndex] = { ...data, id: docRef.id };
  } else {
    memoryDB[collectionName].push({ ...data, id: docRef.id });
  }
};

export const addDoc = async (collectionName: string, data: any) => {
  if (!memoryDB[collectionName]) {
    memoryDB[collectionName] = [];
  }

  const id = `${collectionName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newDoc = { ...data, id };
  memoryDB[collectionName].push(newDoc);

  return {
    id,
  };
};

export const updateDoc = async (docRef: any, updates: any) => {
  const items = memoryDB[docRef.collectionName] || [];
  const index = items.findIndex((i: any) => i.id === docRef.id);
  if (index >= 0) {
    memoryDB[docRef.collectionName][index] = {
      ...items[index],
      ...updates,
    };
  }
};

export const deleteDoc = async (docRef: any) => {
  const items = memoryDB[docRef.collectionName] || [];
  memoryDB[docRef.collectionName] = items.filter((i: any) => i.id !== docRef.id);
};

export const query = (collectionName: string, ...conditions: any[]) => {
  return {
    collectionName,
    conditions,
  };
};

export const where = (field: string, op: string, value: any) => ({
  type: 'where',
  field,
  op,
  value,
});

export const orderBy = (field: string, direction?: 'asc' | 'desc') => ({
  type: 'orderBy',
  field,
  direction: direction || 'asc',
});

export const limit = (count: number) => ({
  type: 'limit',
  count,
});

export const Timestamp = {
  now: () => new Date(),
  fromDate: (date: Date) => date,
};

// Mock Firebase App
let mockApp: any = null;

export const initializeApp = (config: FirebaseConfig) => {
  mockApp = { config };

  // Initialize with sample data
  initializeSampleData();

  return mockApp;
};

export const getApps = () => (mockApp ? [mockApp] : []);

export const getFirestore = () => 'mock-firestore';
export const getAuth = () => 'mock-auth';

// Initialize sample data
function initializeSampleData() {
  if (memoryDB.tokens.length === 0) {
    memoryDB.tokens = [
      {
        id: 'token_1',
        address: '0x1234567890123456789012345678901234567890',
        name: 'Green Energy Token',
        symbol: 'GRN',
        category: 'Green Energy',
        description: 'Renewable energy blockchain project',
        overall_ethical_score: 92,
        is_verified: true,
        is_active: true,
        website_url: 'https://greenenergy.example',
        logo_url: null,
        created_at: new Date(),
      },
      {
        id: 'token_2',
        address: '0x2234567890123456789012345678901234567891',
        name: 'Social Impact Fund',
        symbol: 'SIF',
        category: 'Social Impact',
        description: 'Funding social development projects',
        overall_ethical_score: 88,
        is_verified: true,
        is_active: true,
        website_url: 'https://socialimpact.example',
        logo_url: null,
        created_at: new Date(),
      },
      {
        id: 'token_3',
        address: '0x3234567890123456789012345678901234567892',
        name: 'Fair Trade Coin',
        symbol: 'FTC',
        category: 'Fair Trade',
        description: 'Supporting fair trade practices globally',
        overall_ethical_score: 85,
        is_verified: true,
        is_active: true,
        website_url: 'https://fairtrade.example',
        logo_url: null,
        created_at: new Date(),
      },
    ];
  }

  if (memoryDB.staking_pools.length === 0) {
    memoryDB.staking_pools = [
      {
        id: 'pool_1',
        pool_id: 1,
        token: 'SQCM',
        rate_apy: '8',
        total_staked: '1000000',
        min_stake: '100',
        is_active: true,
        created_at: new Date(),
      },
      {
        id: 'pool_2',
        pool_id: 2,
        token: 'SQCM',
        rate_apy: '10',
        total_staked: '800000',
        min_stake: '500',
        is_active: true,
        created_at: new Date(),
      },
      {
        id: 'pool_3',
        pool_id: 3,
        token: 'SQCM',
        rate_apy: '12',
        total_staked: '600000',
        min_stake: '1000',
        is_active: true,
        created_at: new Date(),
      },
      {
        id: 'pool_4',
        pool_id: 4,
        token: 'SQCM',
        rate_apy: '15',
        total_staked: '400000',
        min_stake: '5000',
        is_active: true,
        created_at: new Date(),
      },
    ];
  }
}

// Export db object for compatibility
export const db = 'mock-firestore';
export const auth = 'mock-auth';
export const app = mockApp;
