import fs from 'fs';
import path from 'path';
import { INITIAL_PACKAGES, INITIAL_STAYS, INITIAL_TOURIST_PLACES, INITIAL_REVIEWS, INITIAL_SITE_SETTINGS } from '@/lib/data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      packages: INITIAL_PACKAGES,
      stays: INITIAL_STAYS,
      touristPlaces: INITIAL_TOURIST_PLACES,
      reviews: INITIAL_REVIEWS,
      settings: INITIAL_SITE_SETTINGS,
      bookings: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
  }
}

export function readDatabase() {
  try {
    ensureDb();
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading json db:', error);
    return {
      packages: INITIAL_PACKAGES,
      stays: INITIAL_STAYS,
      touristPlaces: INITIAL_TOURIST_PLACES,
      reviews: INITIAL_REVIEWS,
      settings: INITIAL_SITE_SETTINGS,
      bookings: []
    };
  }
}

export function writeDatabase(data: any) {
  try {
    ensureDb();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing json db:', error);
    return false;
  }
}
