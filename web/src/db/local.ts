import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { IncidentData, IncidentEvent } from '../types/incident';

interface MaydayDB extends DBSchema {
  incidents: {
    key: string;
    value: IncidentData;
  };
  events: {
    key: string;
    value: IncidentEvent & { incidentId: string; id: string };
    indexes: { 'by-incident': string };
  };
  test_runs: {
    key: string;
    value: {
      id: string;
      incidentId: string;
      timestamp: number;
      passed: boolean;
      output: string;
      invariants: Record<string, boolean>;
    };
    indexes: { 'by-incident': string };
  };
  postmortems: {
    key: string;
    value: {
      incidentId: string;
      title: string;
      markdown: string;
      createdAt: number;
    };
  };
}

const DB_NAME = 'mayday_warroom_v1';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<MaydayDB>> | null = null;

export function getMaydayDB(): Promise<IDBPDatabase<MaydayDB>> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('IndexedDB is only accessible in the browser.'));
  }

  if (!dbPromise) {
    dbPromise = openDB<MaydayDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('incidents')) {
          db.createObjectStore('incidents', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('events')) {
          const eventStore = db.createObjectStore('events', { keyPath: 'id' });
          eventStore.createIndex('by-incident', 'incidentId');
        }
        if (!db.objectStoreNames.contains('test_runs')) {
          const testStore = db.createObjectStore('test_runs', { keyPath: 'id' });
          testStore.createIndex('by-incident', 'incidentId');
        }
        if (!db.objectStoreNames.contains('postmortems')) {
          db.createObjectStore('postmortems', { keyPath: 'incidentId' });
        }
      },
    });
  }

  return dbPromise;
}

export async function saveIncidentToLocal(incident: IncidentData) {
  try {
    const db = await getMaydayDB();
    await db.put('incidents', incident);
  } catch (err) {
    console.warn('Failed to save incident to IndexedDB:', err);
  }
}

export async function getIncidentFromLocal(id: string): Promise<IncidentData | undefined> {
  try {
    const db = await getMaydayDB();
    return await db.get('incidents', id);
  } catch {
    return undefined;
  }
}

export async function getAllLocalIncidents(): Promise<IncidentData[]> {
  try {
    const db = await getMaydayDB();
    return await db.getAll('incidents');
  } catch {
    return [];
  }
}
