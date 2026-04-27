// Mock drill-down data for KPI modals - Thailand market
export const thailandDrillDownData = {
  outlets: {
    mapCenter: [13.7563, 100.5018], // Bangkok
    outlets: [
      { name: "YOLK Egg Tart Central World", type: "Bakery", lat: 13.7467, lng: 100.5398, mentions: 2840 },
      { name: "MTCH Matcha Bar Ari", type: "Cafe", lat: 13.7797, lng: 100.5414, mentions: 2650 },
      { name: "Somtum Der Sala Daeng", type: "Restaurant", lat: 13.7297, lng: 100.5347, mentions: 2340 },
      { name: "MK Suki Siam Paragon", type: "Restaurant", lat: 13.7467, lng: 100.5348, mentions: 2180 },
      { name: "Jay Fai Michelin Street Food", type: "Street Food", lat: 13.7567, lng: 100.5048, mentions: 1950 },
      { name: "Monty's Cafe Thonglor", type: "Cafe", lat: 13.7347, lng: 100.5798, mentions: 1820 },
      { name: "The Sake Room Sukhumvit", type: "Bar", lat: 13.7397, lng: 100.5598, mentions: 1670 },
      { name: "Emily's Box Noodles", type: "Delivery-Only", lat: 13.7497, lng: 100.5448, mentions: 1580 },
      { name: "Pholfoodmafia Sathorn", type: "Cafe", lat: 13.7197, lng: 100.5248, mentions: 1420 },
      { name: "After You Dessert Cafe", type: "Dessert Shop", lat: 13.7447, lng: 100.5548, mentions: 1340 },
      { name: "Baan Phadthai", type: "Restaurant", lat: 13.7267, lng: 100.5148, mentions: 1280 },
      { name: "Jua Sake Bar", type: "Bar", lat: 13.7347, lng: 100.5248, mentions: 1150 },
      { name: "Peace Oriental Tea House", type: "Cafe", lat: 13.7697, lng: 100.5498, mentions: 1090 },
      { name: "Or Tor Kor Market", type: "Food Court", lat: 13.8047, lng: 100.5548, mentions: 980 },
      { name: "Suki Chang Phueak Bangkok", type: "Restaurant", lat: 13.7547, lng: 100.5348, mentions: 890 }
    ],
    topOutlets: [
      { name: "YOLK Egg Tart Central World", type: "Bakery", location: "Pathum Wan", mentions: 2840 },
      { name: "MTCH Matcha Bar Ari", type: "Cafe", location: "Phaya Thai", mentions: 2650 },
      { name: "Somtum Der Sala Daeng", type: "Restaurant", location: "Bang Rak", mentions: 2340 },
      { name: "MK Suki Siam Paragon", type: "Restaurant", location: "Pathum Wan", mentions: 2180 },
      { name: "Jay Fai Michelin Street Food", type: "Street Food", location: "Phra Nakhon", mentions: 1950 },
      { name: "Monty's Cafe Thonglor", type: "Cafe", location: "Watthana", mentions: 1820 },
      { name: "The Sake Room Sukhumvit", type: "Bar", location: "Watthana", mentions: 1670 },
      { name: "Emily's Box Noodles", type: "Delivery-Only", location: "Central Kitchen", mentions: 1580 },
      { name: "Pholfoodmafia Sathorn", type: "Cafe", location: "Sathon", mentions: 1420 },
      { name: "After You Dessert Cafe", type: "Dessert Shop", location: "Multiple Locations", mentions: 1340 }
    ],
    outletTypes: [
      { name: "Restaurants", value: 387 },
      { name: "Cafes", value: 285 },
      { name: "Street Food", value: 198 },
      { name: "Delivery-Only", value: 156 },
      { name: "Bars", value: 124 },
      { name: "Dessert Shops", value: 90 }
    ],
    recentAdditions: [
      { name: "Namsu Shan-Izakaya", type: "Fusion", daysAgo: 3 },
      { name: "Mumutei Hidden Sake Bar", type: "Bar", daysAgo: 5 },
      { name: "YOLK Siam Paragon Branch", type: "Bakery", daysAgo: 8 },
      { name: "Brown Matcha House Ari", type: "Cafe", daysAgo: 12 },
      { name: "Ksana Matcha Store", type: "Cafe", daysAgo: 15 },
      { name: "Suki Ponsiri Delivery", type: "Delivery-Only", daysAgo: 18 }
    ]
  },
  
  mentions: {
    trendingTopics: [
      { name: "Matcha Boom", mentions: 5200, growth: 208 },
      { name: "Croissant Egg Tarts", mentions: 3800, growth: 82 },
      { name: "Sake Pairing Dinners", mentions: 980, growth: 51 },
      { name: "Box Noodle Trend", mentions: 1600, growth: 124 },
      { name: "Seaweed Pork Floss", mentions: 2400, growth: 67 },
      { name: "Thai Sukiyaki Revival", mentions: 1950, growth: 30 },
      { name: "Green Milk Tea", mentions: 1850, growth: 28 },
      { name: "Som Tam Delivery", mentions: 8100, growth: 45 },
      { name: "Plant-Based Options", mentions: 1240, growth: 89 }
    ],
    sentiment: [
      { name: "Positive", value: 68, color: "#10b981" },
      { name: "Neutral", value: 24, color: "#6b7280" },
      { name: "Negative", value: 8, color: "#ef4444" }
    ],
    platforms: [
      { name: "Instagram", mentions: 72500 },
      { name: "TikTok", mentions: 58900 },
      { name: "Facebook", mentions: 34200 },
      { name: "Twitter", mentions: 18400 },
      { name: "LINE", mentions: 3500 }
    ]
  },
  
  trends: {
    totalTrends: 156,
    allTrends: [
      { item: "Matcha Latte", category: "Beverage", growth: 208, mentions: 5200, competitors: 45 },
      { item: "Box Noodles", category: "Mains", growth: 124, mentions: 1600, competitors: 6 },
      { item: "Sake Pairing Menu", category: "Beverages", growth: 89, mentions: 980, competitors: 14 },
      { item: "Croissant Egg Tart", category: "Dessert", growth: 82, mentions: 3800, competitors: 12 },
      { item: "Seaweed Pork Floss", category: "Snacks", growth: 67, mentions: 2400, competitors: 8 },
      { item: "Som Tam Pu Pla Ra", category: "Mains", growth: 45, mentions: 8100, competitors: 287 },
      { item: "Thai Sukiyaki", category: "Mains", growth: 30, mentions: 1950, competitors: 18 },
      { item: "Green Milk Tea", category: "Beverage", growth: 28, mentions: 1850, competitors: 62 },
      { item: "Thai Fried Chicken", category: "Mains", growth: 22, mentions: 6700, competitors: 124 },
      { item: "Fried Rice", category: "Mains", growth: 12, mentions: 9200, competitors: 445 },
      { item: "Pad Thai", category: "Mains", growth: 18, mentions: 7800, competitors: 398 },
      { item: "Mango Sticky Rice", category: "Dessert", growth: 15, mentions: 4200, competitors: 156 },
      { item: "Thai Tea", category: "Beverage", growth: 13, mentions: 5600, competitors: 234 },
      { item: "Tom Yum Soup", category: "Mains", growth: 11, mentions: 6400, competitors: 312 },
      { item: "Pad Krapao", category: "Mains", growth: 9, mentions: 8900, competitors: 456 },
      { item: "Boat Noodles", category: "Mains", growth: 25, mentions: 3200, competitors: 89 },
      { item: "Khao Soi", category: "Mains", growth: 31, mentions: 2100, competitors: 67 },
      { item: "Coconut Ice Cream", category: "Dessert", growth: 19, mentions: 2800, competitors: 78 },
      { item: "Banana Pancake", category: "Dessert", growth: 8, mentions: 1900, competitors: 145 },
      { item: "Guay Teow", category: "Mains", growth: 7, mentions: 7100, competitors: 378 }
    ]
  },
  
  coverage: {
    mapCenter: [13.7563, 100.5018],
    provinces: [
      { name: "Bangkok Central", lat: 13.7563, lng: 100.5018, coverage: 92, outlets: 487 },
      { name: "Sukhumvit", lat: 13.7397, lng: 100.5598, coverage: 88, outlets: 312 },
      { name: "Thonglor", lat: 13.7347, lng: 100.5798, coverage: 85, outlets: 198 },
      { name: "Sathorn", lat: 13.7197, lng: 100.5248, coverage: 78, outlets: 145 },
      { name: "Ari", lat: 13.7797, lng: 100.5414, coverage: 74, outlets: 98 },
      { name: "Chiang Mai", lat: 18.7883, lng: 98.9853, coverage: 45, outlets: 67 },
      { name: "Phuket", lat: 7.8804, lng: 98.3923, coverage: 38, outlets: 52 },
      { name: "Pattaya", lat: 12.9236, lng: 100.8825, coverage: 31, outlets: 41 },
      { name: "Khon Kaen", lat: 16.4322, lng: 102.8236, coverage: 18, outlets: 15 },
      { name: "Udon Thani", lat: 17.4138, lng: 102.7878, coverage: 12, outlets: 8 }
    ],
    uncovered: [
      { name: "Northeastern Provinces", reason: "Limited F&B data infrastructure" },
      { name: "Southern Border Provinces", reason: "Insufficient outlet density" },
      { name: "Rural Districts", reason: "Low digital presence" },
      { name: "Island Communities", reason: "Seasonal operations only" }
    ]
  }
};

export const singaporeDrillDownData = {
  outlets: {
    mapCenter: [1.3521, 103.8198],
    outlets: [
      { name: "PS.Cafe Ann Siang Hill", type: "Cafe", lat: 1.2805, lng: 103.8445, mentions: 1240 },
      { name: "Burnt Ends BBQ", type: "Restaurant", lat: 1.2789, lng: 103.8456, mentions: 1180 },
      { name: "Odette Restaurant", type: "Fine Dining", lat: 1.2902, lng: 103.8519, mentions: 1120 },
      { name: "Tiong Bahru Bakery", type: "Bakery", lat: 1.2855, lng: 103.8303, mentions: 980 }
    ],
    topOutlets: [
      { name: "PS.Cafe Ann Siang Hill", type: "Cafe", location: "Chinatown", mentions: 1240 },
      { name: "Burnt Ends BBQ", type: "Restaurant", location: "Chinatown", mentions: 1180 },
      { name: "Odette Restaurant", type: "Fine Dining", location: "CBD", mentions: 1120 },
      { name: "Tiong Bahru Bakery", type: "Bakery", location: "Tiong Bahru", mentions: 980 }
    ],
    outletTypes: [
      { name: "Restaurants", value: 245 },
      { name: "Cafes", value: 189 },
      { name: "Hawker Centers", value: 156 },
      { name: "Cloud Kitchens", value: 98 },
      { name: "Bars", value: 87 },
      { name: "Bakeries", value: 72 }
    ],
    recentAdditions: [
      { name: "Cloudstreet", type: "Fine Dining", daysAgo: 4 },
      { name: "Nouri", type: "Fusion", daysAgo: 7 },
      { name: "Burnt Ends", type: "BBQ", daysAgo: 11 }
    ]
  },
  mentions: {
    trendingTopics: [
      { name: "Yuzu Drinks", mentions: 2340, growth: 47 },
      { name: "Truffle Everything", mentions: 1890, growth: 38 },
      { name: "Ube Craze", mentions: 1560, growth: 35 }
    ],
    sentiment: [
      { name: "Positive", value: 72, color: "#10b981" },
      { name: "Neutral", value: 21, color: "#6b7280" },
      { name: "Negative", value: 7, color: "#ef4444" }
    ],
    platforms: [
      { name: "Instagram", mentions: 45800 },
      { name: "TikTok", mentions: 32400 },
      { name: "Facebook", mentions: 28900 },
      { name: "Twitter", mentions: 14200 },
      { name: "Xiaohongshu", mentions: 4300 }
    ]
  },
  trends: {
    totalTrends: 143,
    allTrends: [
      { item: "Yuzu Lemon Tea", category: "Beverage", growth: 47, mentions: 234, competitors: 8 },
      { item: "Truffle Fries", category: "Sides", growth: 38, mentions: 189, competitors: 12 },
      { item: "Ube Latte", category: "Beverage", growth: 35, mentions: 156, competitors: 6 }
    ]
  },
  coverage: {
    mapCenter: [1.3521, 103.8198],
    provinces: [
      { name: "Central Business District", lat: 1.2902, lng: 103.8519, coverage: 95, outlets: 234 },
      { name: "Orchard Road", lat: 1.3048, lng: 103.8318, coverage: 92, outlets: 198 },
      { name: "Chinatown", lat: 1.2805, lng: 103.8445, coverage: 88, outlets: 156 }
    ],
    uncovered: [
      { name: "Industrial Areas", reason: "Limited food retail presence" }
    ]
  }
};
