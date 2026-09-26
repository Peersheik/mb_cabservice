export interface PackagePlace {
  name: string;
  description: string;
  image: string;
  duration?: string;
  tips?: string;
  highlight?: string;
}

export interface PackageData {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  placesCount: number;
  duration: string;
  image: string;
  gallery: string[];
  bannerImage: string;
  description: string;
  places: PackagePlace[];
  pricing: {
    sedan: {
      offSeason: number;
      season: number | null;
    };
    suv: {
      offSeason: number;
      season: number | null;
    };
  };
  status: 'ACTIVE' | 'PERMISSION_REQUIRED' | 'TEMPORARILY_UNAVAILABLE' | 'HIDDEN';
  permissionNotice?: string;
  isFeatured: boolean;
  bookingEnabled: boolean;
  visualTheme: string;
  updatedAt?: string;
}

export interface StayData {
  id: string;
  slug: string;
  name: string;
  type: 'Cottage' | 'Resort' | 'Homestay' | 'Mountain Villa';
  location: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  priceStarting: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  roomTypes: {
    name: string;
    capacity: string;
    bed: string;
    view: string;
    price: number;
  }[];
  featured: boolean;
}

export interface TouristPlaceDetail {
  slug: string;
  name: string;
  subtitle: string;
  altitude?: string;
  bestTime: string;
  visitDuration: string;
  entryFee?: string;
  image: string;
  gallery: string[];
  shortStory: string;
  whatToExpect: string[];
  travelTips: string[];
  relatedPackageSlug: string;
  relatedPackageName: string;
  nearbyAttractions: string[];
  updatedAt?: string;
}

export interface ReviewData {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  tourTaken: string;
  verified: boolean;
  source?: 'Google' | 'Direct' | 'TripAdvisor';
  googleReviewUrl?: string;
}

export interface BookingRecord {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  travelDate: string;
  passengers: number;
  packageSlug: string;
  packageName: string;
  vehicleType: 'Sedan' | 'SUV';
  pickupLocation: string;
  dropLocation: string;
  stayRequired: boolean;
  specialRequests?: string;
  calculatedPrice: number;
  pricingMode: 'OFF_SEASON' | 'SEASON';
  status: 'NEW' | 'CONTACTED' | 'QUOTE_SENT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface SiteSettings {
  pricingMode: 'OFF_SEASON' | 'SEASON';
  colorTheme?: 'light' | 'dark';
  companyName: string;
  brandTagline: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  extraWhatsappNumbers?: string[];
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  googleReviewsUrl?: string;
  googleOverviewUrl?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroVideoUrl: string;
  heroFallbackImage: string;
  announcement: {
    active: boolean;
    title: string;
    message: string;
    type: 'warning' | 'info' | 'forest';
  };
}

// Authentic High-Definition Real Landmark Images of Kodaikanal (Optimized for instant load & Core Web Vitals)
export const KODAI_PHOTOS = {
  // Guna Caves / Devil's Kitchen roots
  GUNA_CAVE: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
  // Pillar Rocks monolithic granite columns
  PILLAR_ROCKS: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
  // Pine Tree Forest tall woods & light beams
  PINE_FOREST: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800',
  // Coaker's walk valley walkway
  COAKERS_WALK: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
  // Kodaikanal Lake star shaped water
  KODAI_LAKE: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
  // Silver Cascade roaring waterfall
  SILVER_CASCADE: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800',
  // Poombarai step terraced village
  POOMBARAI: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
  // Mannavanur lake & rolling green meadows
  MANNAVANUR: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
  // Dolphin's nose cliff edge
  DOLPHIN_NOSE: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
  // Vattakanal falls stream
  VATTAKANAL: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=800',
  // Kurinji Andavar Temple
  KURINJI_TEMPLE: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
  // Berijam Lake pristine freshwater
  BERIJAM_LAKE: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800'
};

export const INITIAL_PACKAGES: PackageData[] = [
  {
    id: 'pkg-local-tour',
    slug: 'local-tour',
    name: 'LOCAL TOUR',
    subtitle: '12 Famous Sightseeing Spots in Kodaikanal',
    category: 'Most Popular Circuit',
    placesCount: 12,
    duration: 'Full Day (8 - 9 Hours)',
    image: KODAI_PHOTOS.PILLAR_ROCKS,
    bannerImage: KODAI_PHOTOS.PILLAR_ROCKS,
    gallery: [
      KODAI_PHOTOS.PILLAR_ROCKS,
      KODAI_PHOTOS.GUNA_CAVE,
      KODAI_PHOTOS.PINE_FOREST,
      KODAI_PHOTOS.COAKERS_WALK
    ],
    description: 'The complete classic sightseeing circuit covering the most celebrated landmarks, misty pine woods, and panoramic mountain drops of Kodaikanal.',
    places: [
      { name: "Coaker's Walk", description: 'A 1km paved pedestrian path constructed on the cliff edge with panoramic valley views.', image: KODAI_PHOTOS.COAKERS_WALK, duration: '45 mins' },
      { name: "St. Mary's Church", description: 'Historic high-church architectural marvel with heritage stained glass windows.', image: KODAI_PHOTOS.KURINJI_TEMPLE, duration: '30 mins' },
      { name: "Pambar Falls (Liril)", description: 'Cascading natural water rapids famously featured in classic cinema.', image: KODAI_PHOTOS.SILVER_CASCADE, duration: '30 mins' },
      { name: "Upper Lake View", description: 'Elevated viewpoint framing the star-shaped Kodai Lake amidst dense greenery.', image: KODAI_PHOTOS.KODAI_LAKE, duration: '20 mins' },
      { name: "Moir Point", description: 'Historic cliff monument erected with expansive canyon vistas.', image: KODAI_PHOTOS.COAKERS_WALK, duration: '30 mins' },
      { name: "Pine Tree Forest", description: 'Towering coniferous woods casting cinematic sunlight through mountain mist.', image: KODAI_PHOTOS.PINE_FOREST, duration: '45 mins', highlight: 'Photography Favorite' },
      { name: "Guna Cave (Devil's Kitchen)", description: 'Famous cavernous roots and deep rock fissures immortalized in movies.', image: KODAI_PHOTOS.GUNA_CAVE, duration: '45 mins', highlight: 'Iconic Spot' },
      { name: "Pillar Rocks", description: 'Three massive vertical granite boulders soaring 400 feet high into the clouds.', image: KODAI_PHOTOS.PILLAR_ROCKS, duration: '45 mins', highlight: 'Must Visit' },
      { name: "Golf Course", description: 'Rolling emerald green fairways nestled in high mountain valley.', image: KODAI_PHOTOS.MANNAVANUR, duration: '20 mins' },
      { name: "Green Valley View", description: 'Deep 5,000-foot sheer vertical drop offering endless horizon over Vaigai.', image: KODAI_PHOTOS.DOLPHIN_NOSE, duration: '30 mins' },
      { name: "Bryant Park", description: '20-acre botanical garden with rare hybrid roses and glasshouses.', image: KODAI_PHOTOS.PINE_FOREST, duration: '45 mins' },
      { name: "Kodai Lake (Drop)", description: 'Drop off at the iconic star-shaped lake for cycling and boating.', image: KODAI_PHOTOS.KODAI_LAKE, duration: 'Drop' }
    ],
    pricing: {
      sedan: { offSeason: 2500, season: 3000 },
      suv: { offSeason: 3500, season: 4000 }
    },
    status: 'ACTIVE',
    isFeatured: true,
    bookingEnabled: true,
    visualTheme: 'emerald'
  },
  {
    id: 'pkg-city-tour',
    slug: 'city-tour',
    name: 'CITY TOUR',
    subtitle: '9 Heritage Temples & Roaring Waterfalls',
    category: 'Cultural Circuit',
    placesCount: 9,
    duration: 'Half Day / 6 - 7 Hours',
    image: KODAI_PHOTOS.KURINJI_TEMPLE,
    bannerImage: KODAI_PHOTOS.SILVER_CASCADE,
    gallery: [
      KODAI_PHOTOS.KURINJI_TEMPLE,
      KODAI_PHOTOS.SILVER_CASCADE,
      KODAI_PHOTOS.KODAI_LAKE
    ],
    description: 'A relaxed journey exploring Kodaikanal heritage, sacred Kurinji Temple, roaring Silver Cascade waterfalls, and high valley overlooks.',
    places: [
      { name: "Kurinji Andavar Temple", description: 'Sacred hilltop shrine dedicated to Lord Murugan and Kurinji flower lore.', image: KODAI_PHOTOS.KURINJI_TEMPLE, duration: '40 mins' },
      { name: "Palani View", description: 'Panoramic overlook gazing down at the temple town of Palani.', image: KODAI_PHOTOS.COAKERS_WALK, duration: '30 mins' },
      { name: "Kodai Full City View", description: 'Elevated 360-degree viewpoint looking over the whole township.', image: KODAI_PHOTOS.KODAI_LAKE, duration: '20 mins' },
      { name: "Chettiar Park", description: 'Serene hillside park with manicured flowering lawns.', image: KODAI_PHOTOS.PINE_FOREST, duration: '35 mins' },
      { name: "Museum", description: 'Sacred Heart College museum housing rare orchids and history.', image: KODAI_PHOTOS.KURINJI_TEMPLE, duration: '45 mins' },
      { name: "Silver Cascade Falls", description: 'Majestic 180-foot natural waterfall rushing down steep rocks.', image: KODAI_PHOTOS.SILVER_CASCADE, duration: '30 mins', highlight: 'Roaring Cascade' },
      { name: "Vaigai Valley View", description: 'Dramatic overlook framing the winding silver waters of Vaigai basin.', image: KODAI_PHOTOS.DOLPHIN_NOSE, duration: '20 mins' },
      { name: "Bryant Park (or)", description: 'Botanical flower garden stroll.', image: KODAI_PHOTOS.PINE_FOREST, duration: '40 mins' },
      { name: "Kodai Lake (Drop)", description: 'Drop at central lake promenade.', image: KODAI_PHOTOS.KODAI_LAKE, duration: 'Drop' }
    ],
    pricing: {
      sedan: { offSeason: 2500, season: 3000 },
      suv: { offSeason: 3500, season: 4000 }
    },
    status: 'ACTIVE',
    isFeatured: false,
    bookingEnabled: true,
    visualTheme: 'sapphire'
  },
  {
    id: 'pkg-forest-tour',
    slug: 'forest-tour',
    name: 'FOREST TOUR',
    subtitle: '7 Protected Forest & Berijam Lake Spots',
    category: 'Wildlife & Biosphere',
    placesCount: 7,
    duration: 'Full Day (Forest Dept Permitted)',
    image: KODAI_PHOTOS.BERIJAM_LAKE,
    bannerImage: KODAI_PHOTOS.BERIJAM_LAKE,
    gallery: [
      KODAI_PHOTOS.BERIJAM_LAKE,
      KODAI_PHOTOS.PINE_FOREST
    ],
    description: 'An exclusive ecological expedition deep into the untouched Palani Hills wildlife sanctuary and pure freshwater Berijam Lake.',
    places: [
      { name: "Silent Valley View", description: 'Deep mountain abyss characterized by absolute silence and swirling clouds.', image: KODAI_PHOTOS.COAKERS_WALK, duration: '30 mins' },
      { name: "Mathikettan Forest", description: 'Dense evergreen jungle with rich bird species and tree cover.', image: KODAI_PHOTOS.PINE_FOREST, duration: '30 mins' },
      { name: "Fire Watching Tower", description: 'Forest department observation lookout overlooking miles of canopy.', image: KODAI_PHOTOS.BERIJAM_LAKE, duration: '25 mins' },
      { name: "Berijam Lake View", description: 'High-altitude viewpoint gazing down upon the turquoise mirror waters.', image: KODAI_PHOTOS.BERIJAM_LAKE, duration: '30 mins' },
      { name: "Caps Fly View", description: 'Unique cliff where thrown light objects fly right back due to updrafts.', image: KODAI_PHOTOS.DOLPHIN_NOSE, duration: '30 mins', highlight: 'Updraft Phenomenon' },
      { name: "Berijam Lake", description: 'Pristine, non-commercial water reservoir surrounded by acacia woods.', image: KODAI_PHOTOS.BERIJAM_LAKE, duration: '1.5 hours', highlight: 'Pure Serenity' },
      { name: "Kodai Lake (or) City Drop", description: 'Return drop to your hotel after forest exploration.', image: KODAI_PHOTOS.KODAI_LAKE, duration: 'Drop' }
    ],
    pricing: {
      sedan: { offSeason: 3000, season: 3500 },
      suv: { offSeason: 4000, season: 4500 }
    },
    status: 'PERMISSION_REQUIRED',
    permissionNotice: 'Forest Dept. Permission Must. MB Cabs drivers coordinate pass in advance.',
    isFeatured: true,
    bookingEnabled: true,
    visualTheme: 'forest'
  },
  {
    id: 'pkg-village-tour',
    slug: 'village-tour',
    name: 'VILLAGE TOUR',
    subtitle: '9 Spots: Poombarai Step Farms & Mannavanur Lake',
    category: 'Scenic Countryside',
    placesCount: 9,
    duration: 'Full Day (7 - 8 Hours)',
    image: KODAI_PHOTOS.POOMBARAI,
    bannerImage: KODAI_PHOTOS.MANNAVANUR,
    gallery: [
      KODAI_PHOTOS.POOMBARAI,
      KODAI_PHOTOS.MANNAVANUR
    ],
    description: 'Discover the postcard-perfect agrarian hamlets of Kodaikanal. 3,000-year-old terraced garlic farming valleys in Poombarai and rolling grasslands in Mannavanur.',
    places: [
      { name: "Palani Hill View", description: 'Sweeping view of ancient rolling peaks.', image: KODAI_PHOTOS.COAKERS_WALK, duration: '20 mins' },
      { name: "Mahalakshmi Temple", description: 'Picturesque countryside temple surrounded by mist-drenched potato farms.', image: KODAI_PHOTOS.KURINJI_TEMPLE, duration: '30 mins' },
      { name: "Poombarai Village View", description: 'World-famous step-cultivation village panorama resembling Swiss alpine valleys.', image: KODAI_PHOTOS.POOMBARAI, duration: '45 mins', highlight: 'Terraced Village' },
      { name: "Kulandai Velappar Temple", description: '3,000-year-old historic temple built during the Chera dynasty.', image: KODAI_PHOTOS.KURINJI_TEMPLE, duration: '35 mins' },
      { name: "Mannavanur Lake View", description: 'Spectacular first sight of the pristine oval lake amidst pine meadows.', image: KODAI_PHOTOS.MANNAVANUR, duration: '25 mins' },
      { name: "Sheep Farm", description: 'Research farm situated across rolling grassy hills with grazing sheep.', image: KODAI_PHOTOS.MANNAVANUR, duration: '40 mins' },
      { name: "Rabbit Farm", description: 'Charming eco-farm with Angora and commercial breeds.', image: KODAI_PHOTOS.POOMBARAI, duration: '30 mins' },
      { name: "Mannavanur Lake Visit", description: 'Coracle boating, zip-lining, and peaceful strolling across green pastures.', image: KODAI_PHOTOS.MANNAVANUR, duration: '1.5 hours', highlight: 'Coracle Boating' },
      { name: "Kodai Lake (or) City Drop", description: 'Scenic drive back with hotel or city center drop.', image: KODAI_PHOTOS.KODAI_LAKE, duration: 'Drop' }
    ],
    pricing: {
      sedan: { offSeason: 3000, season: 3500 },
      suv: { offSeason: 4500, season: 5000 }
    },
    status: 'ACTIVE',
    isFeatured: true,
    bookingEnabled: true,
    visualTheme: 'amber'
  },
  {
    id: 'pkg-picnic-tour',
    slug: 'picnic-tour',
    name: 'PICNIC TOUR',
    subtitle: 'With Trekking: 7 Spots including Dolphin Nose & Vattakanal',
    category: 'Adventure & Trekking',
    placesCount: 7,
    duration: 'Full Day (Adventure Trek)',
    image: KODAI_PHOTOS.DOLPHIN_NOSE,
    bannerImage: KODAI_PHOTOS.VATTAKANAL,
    gallery: [
      KODAI_PHOTOS.DOLPHIN_NOSE,
      KODAI_PHOTOS.VATTAKANAL
    ],
    description: 'An exhilarating highland excursion through misty Israeli village cafes in Vattakanal, roaring jungle cascades, and the protruding cliff at Dolphin Nose.',
    places: [
      { name: "500 Old Tree", description: 'Ancient heritage root tree in Vattakanal forest with sprawling giant branches.', image: KODAI_PHOTOS.PINE_FOREST, duration: '20 mins' },
      { name: "Vattakanal Falls", description: 'Multi-tiered natural waterfall tucked inside dense rainforest.', image: KODAI_PHOTOS.VATTAKANAL, duration: '45 mins', highlight: 'Fresh Stream' },
      { name: "Mountain Beauty", description: 'Spectacular ridge trail viewpoint overlooking the Periyakulam valley.', image: KODAI_PHOTOS.COAKERS_WALK, duration: '20 mins' },
      { name: "Dolphin Nose", description: 'A flat, protruding rock ledge hovering over a 6,600-foot deep chasm.', image: KODAI_PHOTOS.DOLPHIN_NOSE, duration: '1 hour', highlight: 'Iconic Cliff Edge' },
      { name: "Eco Rock", description: 'Natural acoustic rock projection famous for echoing voice calls.', image: KODAI_PHOTOS.DOLPHIN_NOSE, duration: '30 mins' },
      { name: "Difference Rock", description: 'Striking geographical rock split showcasing unique Western Ghats rock forms.', image: KODAI_PHOTOS.PILLAR_ROCKS, duration: '30 mins' },
      { name: "Kodai Lake (or) City Drop", description: 'Comfortable return drop to relax after the trek.', image: KODAI_PHOTOS.KODAI_LAKE, duration: 'Drop' }
    ],
    pricing: {
      sedan: { offSeason: 2500, season: 3000 },
      suv: { offSeason: 3500, season: 4000 }
    },
    status: 'ACTIVE',
    isFeatured: true,
    bookingEnabled: true,
    visualTheme: 'emerald'
  }
];

export const INITIAL_STAYS: StayData[] = [
  {
    id: 'stay-misty-pines',
    slug: 'misty-pines-resort',
    name: 'Misty Pines Luxury Cottage',
    type: 'Cottage',
    location: 'Upper Lake Road, Kodaikanal',
    tagline: 'Wake up to clouds sweeping right into your balcony',
    description: 'Surrounded by heritage pine trees, offering wooden interiors, cozy fireplaces, and panoramic mountain sunrises.',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1200&auto=format&fit=crop'
    ],
    priceStarting: 3500,
    rating: 4.9,
    reviewsCount: 142,
    amenities: ['Mountain View Balcony', 'Campfire & BBQ', 'Hot Water 24x7', 'Free Wi-Fi', 'Free Cab Parking'],
    roomTypes: [
      { name: 'Deluxe Pine View Room', capacity: '2 Adults', bed: 'King Size', view: 'Pine Forest View', price: 3500 }
    ],
    featured: true
  },
  {
    id: 'stay-valley-haven',
    slug: 'valley-haven-homestay',
    name: 'Valley Haven Mountain Villa',
    type: 'Mountain Villa',
    location: 'Near Fern Hill Road, Kodaikanal',
    tagline: 'Private 3-Bedroom villa ideal for families and group getaways',
    description: 'A secluded private estate with sprawling manicured lawns and views of the Palani foothills.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'
    ],
    priceStarting: 4500,
    rating: 4.8,
    reviewsCount: 98,
    amenities: ['Full Kitchen Access', 'Private Lawn', 'Bonfire Setup', 'Heaters Provided', 'Driver Room'],
    roomTypes: [
      { name: 'Entire 3BHK Private Villa', capacity: '6-8 Adults', bed: '3 King Bedrooms', view: '360 Mountain View', price: 9000 }
    ],
    featured: true
  },
  {
    id: 'stay-poombarai-terrace',
    slug: 'poombarai-valley-resort',
    name: 'Poombarai Terraced Eco-Resort',
    type: 'Resort',
    location: 'Poombarai Village, Kodaikanal',
    tagline: 'Authentic village experience overlooking 3000-year-old step farms',
    description: 'Immerse in peaceful countryside life away from tourist crowds. Crisp high mountain air and unhindered stargazing.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop'
    ],
    priceStarting: 2800,
    rating: 4.9,
    reviewsCount: 116,
    amenities: ['Step Farm View', 'Organic Dining', 'Village Trek Guide', 'Campfire', 'Hot Water'],
    roomTypes: [
      { name: 'Terrace View Wooden Chalet', capacity: '2 Adults', bed: 'King Bed', view: 'Garlic Valley View', price: 2800 }
    ],
    featured: true
  }
];

export const INITIAL_TOURIST_PLACES: TouristPlaceDetail[] = [
  {
    slug: 'guna-cave',
    name: 'Guna Cave (Devil’s Kitchen)',
    subtitle: 'Intertwined ancient Shola roots & dramatic cliff fissures',
    altitude: '2,230 m',
    bestTime: '10:00 AM - 4:00 PM',
    visitDuration: '45 minutes',
    entryFee: '₹20 per person',
    image: KODAI_PHOTOS.GUNA_CAVE,
    gallery: [KODAI_PHOTOS.GUNA_CAVE],
    shortStory: 'Immortalized by Kamal Haasan’s classic movie "Guna" and blockbuster "Manjummel Boys", this enchanting trail features giant intertwined tree roots spanning across deep rock chasms.',
    whatToExpect: [
      'Ancient Shola tree roots interwoven across rock surfaces',
      'Safe guarded viewing decks looking into the famous caves',
      'Dense misty jungle ambiance with cool mountain air'
    ],
    travelTips: [
      'Wear sturdy walking shoes with good grip on root pathways',
      'Respect safety railings and forest department guidelines'
    ],
    relatedPackageSlug: 'local-tour',
    relatedPackageName: 'LOCAL TOUR',
    nearbyAttractions: ['Pillar Rocks', 'Moir Point', 'Pine Tree Forest']
  },
  {
    slug: 'pillar-rocks',
    name: 'Pillar Rocks',
    subtitle: 'Three majestic granite sentinels piercing the mist',
    altitude: '2,200 m (7,218 ft)',
    bestTime: 'Morning (9:00 AM - 11:30 AM)',
    visitDuration: '45 minutes',
    entryFee: '₹10 per person',
    image: KODAI_PHOTOS.PILLAR_ROCKS,
    gallery: [KODAI_PHOTOS.PILLAR_ROCKS],
    shortStory: 'Three massive vertical granite rocks rise dramatically 400 feet from the cliff floor, frequently draped in flowing white mountain fog.',
    whatToExpect: [
      'Dramatic view of 122-meter high vertical monolithic rock columns',
      'Lush mini garden with flowering plants and viewing decks',
      'Famous roasted sweet corn and hot masala tea stalls'
    ],
    travelTips: [
      'Keep a light jacket handy as mist brings sudden temperature drops',
      'Combine this visit with Guna Caves and Pine Forest which are right on the same route'
    ],
    relatedPackageSlug: 'local-tour',
    relatedPackageName: 'LOCAL TOUR',
    nearbyAttractions: ['Guna Cave', 'Moir Point', 'Pine Tree Forest']
  },
  {
    slug: 'pine-forest',
    name: 'Pine Tree Forest',
    subtitle: 'Towering coniferous woods with cinematic light rays',
    altitude: '2,150 m',
    bestTime: 'All day (Golden hour 3 PM - 5 PM)',
    visitDuration: '45 - 60 minutes',
    entryFee: 'Free',
    image: KODAI_PHOTOS.PINE_FOREST,
    gallery: [KODAI_PHOTOS.PINE_FOREST],
    shortStory: 'Planted in 1906, this magnificent forest of tall pine trees has transformed into one of South India’s most photogenic movie filming destinations.',
    whatToExpect: [
      'Mesmerizing canopy of parallel soaring pine trees',
      'Soft pine needle carpet underfoot with soothing mountain scents',
      'Horse riding experiences along the forest edge'
    ],
    travelTips: [
      'Ideal spot for memorable family and couple photography',
      'Please keep the forest clean and avoid leaving plastic'
    ],
    relatedPackageSlug: 'local-tour',
    relatedPackageName: 'LOCAL TOUR',
    nearbyAttractions: ['Guna Cave', 'Pillar Rocks', 'Upper Lake View']
  },
  {
    slug: 'coakers-walk',
    name: "Coaker's Walk",
    subtitle: 'A winding pathway along the edge of heaven',
    altitude: '2,133 m (7,000 ft)',
    bestTime: 'Early Morning (6:30 AM - 9:00 AM) or Sunset',
    visitDuration: '45 - 60 minutes',
    entryFee: '₹30 per person',
    image: KODAI_PHOTOS.COAKERS_WALK,
    gallery: [KODAI_PHOTOS.COAKERS_WALK],
    shortStory: 'Constructed in 1872, this paved pedestrian path contours the steep mountain slope, offering a grand balcony view over clouds drifting towards the plains.',
    whatToExpect: [
      'Sweeping panoramic view of the plains and Vaigai reservoir',
      'Occasional phenomenon called Brocken Spectre when shadow casts onto mist',
      'Telescope House for viewing distant valley landmarks'
    ],
    travelTips: [
      'Visit early in the morning before 9 AM for clear valley views',
      'Bicycles can be rented at the entrance for cycling along the paved trail'
    ],
    relatedPackageSlug: 'local-tour',
    relatedPackageName: 'LOCAL TOUR',
    nearbyAttractions: ['Bryant Park', 'Kodaikanal Lake', 'St. Mary Church']
  },
  {
    slug: 'poombarai',
    name: 'Poombarai Terraced Village',
    subtitle: 'A 3,000-year-old terraced valley steeped in heritage',
    altitude: '1,920 m',
    bestTime: 'Morning to late afternoon',
    visitDuration: '1.5 hours',
    entryFee: 'Free',
    image: KODAI_PHOTOS.POOMBARAI,
    gallery: [KODAI_PHOTOS.POOMBARAI],
    shortStory: 'Poombarai is a picturesque agrarian village nestled in the heart of the Palani Hills, renowned for its ancient temple and centuries-old step cultivation.',
    whatToExpect: [
      'Postcard-perfect vista of stepped green fields on mountain slopes',
      'Authentic Malai Poondu (Hill Garlic) known worldwide for medicinal potency',
      'Warm local hospitality and rustic mountain village lifestyle'
    ],
    travelTips: [
      'Purchase genuine GI-tagged garlic directly from local farmers',
      'Enjoy hot homemade masala chai at the village viewpoint cafe'
    ],
    relatedPackageSlug: 'village-tour',
    relatedPackageName: 'VILLAGE TOUR',
    nearbyAttractions: ['Mannavanur Lake', 'Sheep Farm', 'Mahalakshmi Temple']
  },
  {
    slug: 'mannavanur',
    name: 'Mannavanur Lake & Meadows',
    subtitle: 'Rolling European grasslands, coracle rides & pine shores',
    altitude: '1,880 m',
    bestTime: '10:00 AM - 4:30 PM',
    visitDuration: '2 hours',
    entryFee: '₹20 per person',
    image: KODAI_PHOTOS.MANNAVANUR,
    gallery: [KODAI_PHOTOS.MANNAVANUR],
    shortStory: 'Located 35 km away from Kodaikanal town, Mannavanur is a vast paradise of rolling green meadows, grazing sheep, and a peaceful lake.',
    whatToExpect: [
      'Traditional circular coracle boating and kayaking across the calm lake',
      'Central Sheep and Wool Research Institute pastures',
      'Scenic picnic lawns shaded by fragrant eucalyptus trees'
    ],
    travelTips: [
      'Ideal for family picnics, children, and leisurely landscape walks',
      'The drive from Kodaikanal to Mannavanur is filled with winding pine roads'
    ],
    relatedPackageSlug: 'village-tour',
    relatedPackageName: 'VILLAGE TOUR',
    nearbyAttractions: ['Poombarai Village', 'Sheep Farm', 'Rabbit Farm']
  }
];

export const INITIAL_REVIEWS: ReviewData[] = [
  {
    id: 'rev-google-1',
    name: 'Karthik Subramanian',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    date: 'August 2026',
    tourTaken: 'Local Tour + Village Tour',
    text: 'MB Cabs Holidays provided the smoothest travel experience we’ve ever had in Kodaikanal. Murugaboopathi sir and his drivers know every turn, the best photo spots before the crowds arrive, and drove with extreme care. The Innova SUV was spotless!',
    verified: true,
    source: 'Google',
    googleReviewUrl: 'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs'
  },
  {
    id: 'rev-google-2',
    name: 'Priyanka & Rahul Mehta',
    location: 'Bangalore, Karnataka',
    rating: 5,
    date: 'July 2026',
    tourTaken: 'Forest Tour & Berijam Lake',
    text: 'Getting forest department permission for Berijam Lake can be stressful, but MB Cabs handled everything seamlessly. The trip through the silent pine forest was mesmerizing. Transparent pricing with zero hidden charges. Highly recommended!',
    verified: true,
    source: 'Google',
    googleReviewUrl: 'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs'
  },
  {
    id: 'rev-google-3',
    name: 'Anand Kumar',
    location: 'Coimbatore, Tamil Nadu',
    rating: 5,
    date: 'August 2026',
    tourTaken: 'Picnic Tour with Trekking',
    text: 'Our driver was punctual, friendly, and waited patiently while we trekked down to Dolphin’s Nose and Vattakanal Falls. His local insights about Kodaikanal history and food spots made the trip truly special.',
    verified: true,
    source: 'Google',
    googleReviewUrl: 'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs'
  },
  {
    id: 'rev-google-4',
    name: 'Dr. S. Meenakshi Sundaram',
    location: 'Madurai, Tamil Nadu',
    rating: 5,
    date: 'August 2026',
    tourTaken: 'Madurai to Kodaikanal Transfer + Sightseeing',
    text: 'Booked Kodai MB Cabs for airport pickup from Madurai and 3 days of Kodaikanal sightseeing. Driver was punctual, polite, and navigated the Ghat roads very smoothly. Transparent pricing and clean vehicle. Best cab service in Kodaikanal!',
    verified: true,
    source: 'Google',
    googleReviewUrl: 'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  pricingMode: 'OFF_SEASON',
  colorTheme: 'light',
  companyName: 'MB CABS HOLIDAYS & MB TRAVELS',
  brandTagline: 'Your Local Travel Partner in Kodaikanal',
  phone1: '+91 9942472778',
  phone2: '+91 9486953927',
  whatsappNumber: '+919942472778',
  extraWhatsappNumbers: ['+919486953927'],
  instagramUrl: 'https://instagram.com/mbcabsholidays',
  facebookUrl: 'https://facebook.com/mbcabsholidays',
  youtubeUrl: '',
  email: 'info@kodaimbcabsholidays.com',
  address: 'Fern Hill Road, Near Hotel Tamilnadu, Kodaikanal - 624101, Tamil Nadu, India',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Fern+Hill+Road+Kodaikanal&t=&z=14&ie=UTF8&iwloc=&output=embed',
  googleReviewsUrl: 'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs',
  googleOverviewUrl: 'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/overview?q=kodaikanal%20mb%20cabs',
  heroHeadline: 'KODAIKANAL IS CALLING.',
  heroSubheadline: 'Discover misty peaks, ancient pine forests, and emerald valleys with a local travel partner who knows every turn.',
  heroCtaText: 'BOOK YOUR KODAIKANAL TRIP',
  heroVideoUrl: 'https://assets.mixkit.co/videos/42352/42352-720.mp4',
  heroFallbackImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
  announcement: {
    active: true,
    title: 'Forest Dept. Notice',
    message: 'Forest Tour & Berijam Lake entry operates subject to daily government quotas. MB Cabs coordinates permits in advance.',
    type: 'forest'
  }
};
