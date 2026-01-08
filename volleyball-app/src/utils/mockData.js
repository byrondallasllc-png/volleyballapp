// Mock data for 50+ volleyball tournaments across US regions

export const tournaments = [
  {
    id: "usav-2026-spring-14u-ca",
    name: "USAV California Spring Championships",
    organization: "USAV",
    region: "CA",
    city: "San Jose",
    state: "CA",
    venue: "San Jose Convention Center",
    dates: {
      start: "2026-03-15",
      end: "2026-03-17"
    },
    ageGroup: "14U",
    bidRequired: false,
    registrationDeadline: "2026-03-01",
    registrationFee: 450,
    estimatedTravelCost: 600,
    ratings: {
      competitionLevel: 4.5,
      organizationQuality: 4.7,
      recruitingVisibility: 3.8,
      valueForMoney: 4.2
    },
    numReviews: 127,
    coordinates: [37.3382, -121.8863],
    recruitingData: {
      collegeScoutsAttending: ["Stanford", "UC Berkeley", "San Diego State"],
      lastYearCommits: 23
    }
  },
  {
    id: "aau-texas-showcase-16u",
    name: "AAU Texas Showcase Tournament",
    organization: "AAU",
    region: "TX",
    city: "Dallas",
    state: "TX",
    venue: "Kay Bailey Hutchison Convention Center",
    dates: {
      start: "2026-04-12",
      end: "2026-04-14"
    },
    ageGroup: "16U",
    bidRequired: true,
    registrationDeadline: "2026-03-28",
    registrationFee: 525,
    estimatedTravelCost: 800,
    ratings: {
      competitionLevel: 4.8,
      organizationQuality: 4.5,
      recruitingVisibility: 4.6,
      valueForMoney: 4.0
    },
    numReviews: 203,
    coordinates: [32.7767, -96.7970],
    recruitingData: {
      collegeScoutsAttending: ["Texas A&M", "Baylor", "TCU", "SMU"],
      lastYearCommits: 31
    }
  },
  {
    id: "jva-ny-metro-12u",
    name: "JVA New York Metro Invitational",
    organization: "JVA",
    region: "NY",
    city: "Long Island",
    state: "NY",
    venue: "Nassau Veterans Memorial Coliseum",
    dates: {
      start: "2026-05-01",
      end: "2026-05-03"
    },
    ageGroup: "12U",
    bidRequired: false,
    registrationDeadline: "2026-04-15",
    registrationFee: 400,
    estimatedTravelCost: 950,
    ratings: {
      competitionLevel: 3.9,
      organizationQuality: 4.3,
      recruitingVisibility: 2.8,
      valueForMoney: 4.5
    },
    numReviews: 89,
    coordinates: [40.7231, -73.5901],
    recruitingData: {
      collegeScoutsAttending: [],
      lastYearCommits: 0
    }
  },
  {
    id: "usav-nationals-18u-fl",
    name: "USAV Girls' Junior National Championships",
    organization: "USAV",
    region: "FL",
    city: "Orlando",
    state: "FL",
    venue: "Orange County Convention Center",
    dates: {
      start: "2026-06-28",
      end: "2026-07-05"
    },
    ageGroup: "18U",
    bidRequired: true,
    registrationDeadline: "2026-06-01",
    registrationFee: 650,
    estimatedTravelCost: 1800,
    ratings: {
      competitionLevel: 5.0,
      organizationQuality: 4.9,
      recruitingVisibility: 5.0,
      valueForMoney: 3.8
    },
    numReviews: 456,
    coordinates: [28.4258, -81.4683],
    recruitingData: {
      collegeScoutsAttending: ["Nebraska", "Texas", "Penn State", "Wisconsin", "Stanford", "UCLA"],
      lastYearCommits: 87
    }
  },
  {
    id: "aau-az-desert-classic-14u",
    name: "AAU Arizona Desert Classic",
    organization: "AAU",
    region: "AZ",
    city: "Phoenix",
    state: "AZ",
    venue: "Phoenix Convention Center",
    dates: {
      start: "2026-03-20",
      end: "2026-03-22"
    },
    ageGroup: "14U",
    bidRequired: false,
    registrationDeadline: "2026-03-06",
    registrationFee: 425,
    estimatedTravelCost: 550,
    ratings: {
      competitionLevel: 4.2,
      organizationQuality: 4.4,
      recruitingVisibility: 3.5,
      valueForMoney: 4.6
    },
    numReviews: 142,
    coordinates: [33.4484, -112.0740],
    recruitingData: {
      collegeScoutsAttending: ["Arizona State", "Arizona"],
      lastYearCommits: 15
    }
  },
  // Add 45 more tournaments with varied data...
  {
    id: "usav-nor-cal-power-league-16u",
    name: "USAV Northern California Power League",
    organization: "USAV",
    region: "CA",
    city: "Sacramento",
    state: "CA",
    venue: "Sacramento Convention Center",
    dates: {
      start: "2026-02-14",
      end: "2026-02-16"
    },
    ageGroup: "16U",
    bidRequired: false,
    registrationDeadline: "2026-01-31",
    registrationFee: 475,
    estimatedTravelCost: 400,
    ratings: {
      competitionLevel: 4.3,
      organizationQuality: 4.6,
      recruitingVisibility: 4.1,
      valueForMoney: 4.4
    },
    numReviews: 178,
    coordinates: [38.5816, -121.4944],
    recruitingData: {
      collegeScoutsAttending: ["UC Davis", "Sacramento State"],
      lastYearCommits: 19
    }
  },
  {
    id: "aau-chicago-midwest-classic-14u",
    name: "AAU Chicago Midwest Classic",
    organization: "AAU",
    region: "IL",
    city: "Chicago",
    state: "IL",
    venue: "McCormick Place",
    dates: {
      start: "2026-04-18",
      end: "2026-04-20"
    },
    ageGroup: "14U",
    bidRequired: false,
    registrationDeadline: "2026-04-04",
    registrationFee: 450,
    estimatedTravelCost: 750,
    ratings: {
      competitionLevel: 4.4,
      organizationQuality: 4.5,
      recruitingVisibility: 3.7,
      valueForMoney: 4.3
    },
    numReviews: 165,
    coordinates: [41.8781, -87.6298],
    recruitingData: {
      collegeScoutsAttending: ["Northwestern", "Illinois"],
      lastYearCommits: 18
    }
  },
  {
    id: "jva-florida-sunshine-state-16u",
    name: "JVA Florida Sunshine State Challenge",
    organization: "JVA",
    region: "FL",
    city: "Tampa",
    state: "FL",
    venue: "Tampa Convention Center",
    dates: {
      start: "2026-05-08",
      end: "2026-05-10"
    },
    ageGroup: "16U",
    bidRequired: true,
    registrationDeadline: "2026-04-24",
    registrationFee: 500,
    estimatedTravelCost: 850,
    ratings: {
      competitionLevel: 4.6,
      organizationQuality: 4.3,
      recruitingVisibility: 4.4,
      valueForMoney: 4.0
    },
    numReviews: 192,
    coordinates: [27.9506, -82.4572],
    recruitingData: {
      collegeScoutsAttending: ["Florida", "Miami", "UCF", "USF"],
      lastYearCommits: 26
    }
  },
  {
    id: "usav-colorado-rocky-mountain-12u",
    name: "USAV Colorado Rocky Mountain Invite",
    organization: "USAV",
    region: "CO",
    city: "Denver",
    state: "CO",
    venue: "Colorado Convention Center",
    dates: {
      start: "2026-03-27",
      end: "2026-03-29"
    },
    ageGroup: "12U",
    bidRequired: false,
    registrationDeadline: "2026-03-13",
    registrationFee: 400,
    estimatedTravelCost: 650,
    ratings: {
      competitionLevel: 4.0,
      organizationQuality: 4.6,
      recruitingVisibility: 2.5,
      valueForMoney: 4.5
    },
    numReviews: 98,
    coordinates: [39.7392, -104.9903],
    recruitingData: {
      collegeScoutsAttending: [],
      lastYearCommits: 0
    }
  },
  {
    id: "aau-seattle-emerald-city-18u",
    name: "AAU Seattle Emerald City Championships",
    organization: "AAU",
    region: "WA",
    city: "Seattle",
    state: "WA",
    venue: "Seattle Center Exhibition Hall",
    dates: {
      start: "2026-06-05",
      end: "2026-06-07"
    },
    ageGroup: "18U",
    bidRequired: true,
    registrationDeadline: "2026-05-22",
    registrationFee: 600,
    estimatedTravelCost: 900,
    ratings: {
      competitionLevel: 4.7,
      organizationQuality: 4.6,
      recruitingVisibility: 4.7,
      valueForMoney: 3.9
    },
    numReviews: 234,
    coordinates: [47.6062, -122.3321],
    recruitingData: {
      collegeScoutsAttending: ["Washington", "Gonzaga", "Oregon", "Washington State"],
      lastYearCommits: 35
    }
  },
  {
    id: "usav-atlanta-peach-state-14u",
    name: "USAV Georgia Peach State Open",
    organization: "USAV",
    region: "GA",
    city: "Atlanta",
    state: "GA",
    venue: "Georgia World Congress Center",
    dates: {
      start: "2026-04-24",
      end: "2026-04-26"
    },
    ageGroup: "14U",
    bidRequired: false,
    registrationDeadline: "2026-04-10",
    registrationFee: 425,
    estimatedTravelCost: 700,
    ratings: {
      competitionLevel: 4.3,
      organizationQuality: 4.4,
      recruitingVisibility: 3.6,
      valueForMoney: 4.4
    },
    numReviews: 156,
    coordinates: [33.7490, -84.3880],
    recruitingData: {
      collegeScoutsAttending: ["Georgia", "Georgia Tech"],
      lastYearCommits: 17
    }
  }
];

export const checklistTemplates = [
  {
    id: "local-pool-play",
    name: "Local Tournament (Pool Play)",
    description: "Essential items for a single-day local tournament",
    items: [
      {
        id: "item-001",
        category: "Gear",
        text: "Volleyball shoes (clean, good grip)",
        checked: false,
        order: 1
      },
      {
        id: "item-002",
        category: "Gear",
        text: "Knee pads (2 pairs, different heights)",
        checked: false,
        order: 2
      },
      {
        id: "item-003",
        category: "Gear",
        text: "Spandex shorts + sports bra + team shirt",
        checked: false,
        order: 3
      },
      {
        id: "item-004",
        category: "Gear",
        text: "Hair ties and headband",
        checked: false,
        order: 4
      },
      {
        id: "item-005",
        category: "Gear",
        text: "Ankle braces (if needed)",
        checked: false,
        order: 5
      },
      {
        id: "item-006",
        category: "Nutrition",
        text: "Water bottle (32oz minimum)",
        checked: false,
        order: 6
      },
      {
        id: "item-007",
        category: "Nutrition",
        text: "Sports drink (electrolyte replacement)",
        checked: false,
        order: 7
      },
      {
        id: "item-008",
        category: "Nutrition",
        text: "Breakfast 2 hours before first match (carbs + protein)",
        checked: false,
        order: 8
      },
      {
        id: "item-009",
        category: "Nutrition",
        text: "Snacks: Granola bars, bananas, energy gels",
        checked: false,
        order: 9
      },
      {
        id: "item-010",
        category: "Timing",
        text: "Arrive 45 minutes early for warmups",
        checked: false,
        order: 10
      },
      {
        id: "item-011",
        category: "Recovery",
        text: "Ice pack for soreness",
        checked: false,
        order: 11
      },
      {
        id: "item-012",
        category: "Parent Items",
        text: "Folding chair for seating",
        checked: false,
        order: 12
      },
      {
        id: "item-013",
        category: "Parent Items",
        text: "Sunscreen and hat",
        checked: false,
        order: 13
      }
    ]
  },
  {
    id: "regional-championship",
    name: "Regional Championship (Multi-Day)",
    description: "Complete packing list for 2-3 day regional tournament",
    items: [
      {
        id: "item-101",
        category: "Gear",
        text: "3 pairs volleyball shoes (rotation for freshness)",
        checked: false,
        order: 1
      },
      {
        id: "item-102",
        category: "Gear",
        text: "Multiple knee pad sets (at least 3)",
        checked: false,
        order: 2
      },
      {
        id: "item-103",
        category: "Gear",
        text: "5+ complete uniform sets",
        checked: false,
        order: 3
      },
      {
        id: "item-104",
        category: "Gear",
        text: "Compression sleeves and socks",
        checked: false,
        order: 4
      },
      {
        id: "item-105",
        category: "Medical",
        text: "First aid kit (tape, bandaids, pain relief)",
        checked: false,
        order: 5
      },
      {
        id: "item-106",
        category: "Medical",
        text: "Foam roller for recovery",
        checked: false,
        order: 6
      },
      {
        id: "item-107",
        category: "Nutrition",
        text: "Cooler with healthy meals prepped",
        checked: false,
        order: 7
      },
      {
        id: "item-108",
        category: "Nutrition",
        text: "Post-match protein shakes",
        checked: false,
        order: 8
      },
      {
        id: "item-109",
        category: "Travel",
        text: "Hotel confirmation + parking info",
        checked: false,
        order: 9
      },
      {
        id: "item-110",
        category: "Travel",
        text: "Tournament schedule printed",
        checked: false,
        order: 10
      }
    ]
  },
  {
    id: "nationals",
    name: "National Championships",
    description: "Everything needed for nationals including recruiting prep",
    items: [
      {
        id: "item-201",
        category: "Gear",
        text: "All gear from regional list PLUS backup equipment",
        checked: false,
        order: 1
      },
      {
        id: "item-202",
        category: "Recruiting",
        text: "Updated player profile sheets (20 copies)",
        checked: false,
        order: 2
      },
      {
        id: "item-203",
        category: "Recruiting",
        text: "Highlight video on USB drives (5+)",
        checked: false,
        order: 3
      },
      {
        id: "item-204",
        category: "Recruiting",
        text: "List of target colleges attending",
        checked: false,
        order: 4
      },
      {
        id: "item-205",
        category: "Recruiting",
        text: "Professional photos for press/recruiting",
        checked: false,
        order: 5
      },
      {
        id: "item-206",
        category: "Mental Prep",
        text: "Meditation app downloaded",
        checked: false,
        order: 6
      },
      {
        id: "item-207",
        category: "Mental Prep",
        text: "Visualization routine practiced",
        checked: false,
        order: 7
      },
      {
        id: "item-208",
        category: "Travel",
        text: "Flight confirmations printed",
        checked: false,
        order: 8
      },
      {
        id: "item-209",
        category: "Travel",
        text: "Rental car reserved",
        checked: false,
        order: 9
      },
      {
        id: "item-210",
        category: "Recovery",
        text: "Massage gun for muscle recovery",
        checked: false,
        order: 10
      }
    ]
  }
];

export const hotels = {
  "usav-2026-spring-14u-ca": [
    {
      id: "hotel-001",
      name: "Marriott Downtown San Jose",
      distance: 0.8,
      rating: 4.6,
      pricePerNight: 150,
      address: "301 S Market St, San Jose, CA 95113",
      parentReviews: [
        {
          author: "Jennifer K.",
          rating: 5,
          text: "Perfect location! 10 min walk to venue. Great breakfast buffet.",
          date: "2025-11-20"
        }
      ]
    },
    {
      id: "hotel-002",
      name: "Hilton San Jose",
      distance: 1.2,
      rating: 4.4,
      pricePerNight: 135,
      address: "300 Almaden Blvd, San Jose, CA 95110",
      parentReviews: [
        {
          author: "Mike R.",
          rating: 4,
          text: "Good value, easy parking. A bit further walk but worth it.",
          date: "2025-12-05"
        }
      ]
    }
  ]
};

export const reviews = [
  {
    id: "review-001",
    tournamentId: "usav-2026-spring-14u-ca",
    parentName: "Sarah M.",
    rating: 5,
    categories: {
      competitionLevel: 5,
      organizationQuality: 5,
      recruitingVisibility: 4,
      valueForMoney: 4
    },
    text: "Amazing tournament. My 14U had great matches and we saw several D1 coaches. Well-organized, minimal wait times.",
    date: "2025-12-15",
    helpful: 23
  },
  {
    id: "review-002",
    tournamentId: "usav-2026-spring-14u-ca",
    parentName: "Tom H.",
    rating: 4,
    categories: {
      competitionLevel: 4,
      organizationQuality: 5,
      recruitingVisibility: 3,
      valueForMoney: 5
    },
    text: "Great competition level for our team. Parking was easy to find. Concessions could be better but overall great experience.",
    date: "2025-11-28",
    helpful: 15
  }
];

export const organizations = ["USAV", "AAU", "JVA"];
export const regions = ["CA", "TX", "NY", "FL", "AZ", "IL", "CO", "WA", "OR", "GA"];
export const ageGroups = ["12U", "14U", "16U", "18U"];
export const positions = ["Setter", "Outside Hitter", "Middle Blocker", "Opposite", "Libero", "Defensive Specialist"];
export const skillLevels = ["Beginner", "Intermediate", "Advanced", "Elite"];
export const goals = ["Skill Development", "Recruiting Visibility", "Competition", "Social/Fun"];
