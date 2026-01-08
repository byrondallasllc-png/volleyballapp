# Phase 2 Build Guide: Game Day Command Center

## Overview
This guide provides step-by-step instructions for building Phase 2 features after MVP validation.

---

## Feature 2.1: Pre-Game Checklists

### Implementation Steps

1. **Create ChecklistBuilder Component**
   \`\`\`bash
   # Create component files
   mkdir -p src/components/GameDayCenter
   touch src/components/GameDayCenter/ChecklistBuilder.jsx
   touch src/components/GameDayCenter/ChecklistBuilder.css
   \`\`\`

2. **State Management for Checklists**
   \`\`\`javascript
   // Add to src/context/ChecklistContext.js
   import React, { createContext, useState, useContext } from 'react';
   
   const ChecklistContext = createContext();
   
   export function ChecklistProvider({ children }) {
     const [checklists, setChecklists] = useState([]);
     
     const addChecklist = (checklist) => {
       setChecklists(prev => [...prev, checklist]);
       localStorage.setItem('checklists', JSON.stringify([...checklists, checklist]));
     };
     
     return (
       <ChecklistContext.Provider value={{ checklists, addChecklist }}>
         {children}
       </ChecklistContext.Provider>
     );
   }
   \`\`\`

3. **PDF Export Feature**
   \`\`\`bash
   npm install jspdf
   \`\`\`
   
   \`\`\`javascript
   import jsPDF from 'jspdf';
   
   const exportToPDF = (checklist) => {
     const doc = new jsPDF();
     doc.text(checklist.name, 10, 10);
     // Add checklist items...
     doc.save(\`\${checklist.name}.pdf\`);
   };
   \`\`\`

### Estimated Time: 8-12 hours

---

## Feature 2.2: Venue Information Hub

### Implementation Steps

1. **Google Maps Integration**
   \`\`\`bash
   npm install @googlemaps/react-wrapper
   \`\`\`

2. **Get Google Maps API Key**
   - Go to https://console.cloud.google.com
   - Create project
   - Enable Maps JavaScript API
   - Create API key
   - Add to `.env`:
     \`\`\`
     REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here
     \`\`\`

3. **Create VenueMap Component**
   \`\`\`javascript
   // src/components/GameDayCenter/VenueMap.jsx
   import { Wrapper, Status } from "@googlemaps/react-wrapper";
   
   export default function VenueMap({ venue, parkingLocations }) {
     return (
       <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
         <MapComponent venue={venue} parking={parkingLocations} />
       </Wrapper>
     );
   }
   \`\`\`

### Estimated Time: 6-8 hours

---

## Feature 2.3: Match Schedule Tracker

### Implementation Steps

1. **Create Schedule Component**
   - Display match times
   - Show opponent info
   - Countdown timers
   - Break time calculator

2. **Add Real-Time Updates**
   \`\`\`bash
   npm install date-fns
   \`\`\`
   
   \`\`\`javascript
   import { intervalToDuration, formatDuration } from 'date-fns';
   
   const calculateCountdown = (matchTime) => {
     const duration = intervalToDuration({
       start: new Date(),
       end: new Date(matchTime)
     });
     return formatDuration(duration);
   };
   \`\`\`

### Estimated Time: 8-10 hours

---

## Feature 2.4: Nutrition Timing Guide

### Implementation Steps

1. **Create NutritionGuide Component**
   - Timeline display
   - Hydration calculator
   - Dietary restriction filters
   - Meal recommendations

2. **Hydration Calculator Logic**
   \`\`\`javascript
   const calculateHydration = (weightLbs, activityLevel) => {
     // Weight in lbs × 30ml = daily water intake
     const baseWater = weightLbs * 30;
     const activityMultiplier = activityLevel === 'high' ? 1.5 : 1.2;
     return Math.round(baseWater * activityMultiplier);
   };
   \`\`\`

### Estimated Time: 6-8 hours

---

## Feature 2.5: Mental Preparation

### Implementation Steps

1. **Create MentalPrep Component**
   - Breathing exercises with timer
   - Visualization scripts
   - Affirmations library
   - Post-match reflection journal

2. **Audio/Timer Feature**
   \`\`\`javascript
   import { useState, useEffect } from 'react';
   
   const BreathingExercise = () => {
     const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
     const [countdown, setCountdown] = useState(4);
     
     useEffect(() => {
       // Timer logic for 4-7-8 breathing
     }, []);
     
     return <BreathingTimer phase={phase} countdown={countdown} />;
   };
   \`\`\`

### Estimated Time: 8-10 hours

---

## Testing Phase 2

### Unit Tests
\`\`\`bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
\`\`\`

### Test Checklist
- [ ] Checklist CRUD operations work
- [ ] PDF export generates correct format
- [ ] Google Maps displays correctly
- [ ] Schedule countdown updates every minute
- [ ] Hydration calculator accurate
- [ ] Breathing timer follows 4-7-8 pattern

---

## Integration with MVP

1. **Update Navigation**
   \`\`\`javascript
   // In Layout.jsx, Game Day link should be active
   const navItems = [
     { path: '/', label: 'Tournament Hub', icon: '🏐' },
     { path: '/gameday', label: 'Game Day', icon: '📋' }, // Now functional!
     { path: '/profile', label: 'Profile', icon: '👤' }
   ];
   \`\`\`

2. **Update GameDay.jsx**
   - Remove "coming soon" placeholder
   - Add tabs for each sub-feature
   - Integrate all 5 components

---

## Phase 2 Total Estimate

- **Development Time**: 36-48 hours (1-2 weeks full-time)
- **Testing**: 8-12 hours
- **Deployment**: 2-4 hours
- **Total**: 46-64 hours

---

## Budget for Phase 2

### APIs & Services
- Google Maps API: $0-$200/month (depends on usage)
- Firebase (if adding backend): $0-$25/month
- Hosting: Still free on Vercel

### Optional Enhancements
- Premium fonts: $0-$50 one-time
- Stock photos: $0-$30/month (Unsplash is free)
- Analytics (Mixpanel/Amplitude): $0-$50/month

---

## Phase 2 Launch Checklist

Pre-Launch:
- [ ] All 5 features tested on mobile
- [ ] PDF export works in Safari & Chrome
- [ ] Google Maps loads without errors
- [ ] Nutrition recommendations reviewed by expert (optional)
- [ ] Privacy policy updated (if storing user data)

Post-Launch:
- [ ] User feedback form live
- [ ] Analytics tracking Game Day usage
- [ ] Monitor Google Maps API usage/costs
- [ ] A/B test checklist templates

---

## Pro Tips

1. **Start with Checklists** - Highest value, lowest complexity
2. **Google Maps Last** - Most complex, may need API troubleshooting
3. **Test on Actual Tournament Day** - Bring your laptop to a local tournament, test in real conditions
4. **Get Parent Feedback Early** - Show checklist prototype to 5 parents before building everything

---

## Success Metrics for Phase 2

- [ ] 50%+ of users use checklist feature
- [ ] 30%+ export PDF at least once
- [ ] Avg session duration increases to 4+ minutes
- [ ] Net Promoter Score (NPS) 8+/10

---

## Need Help?

If you get stuck:
1. Check React docs: https://react.dev
2. Google Maps React docs: https://github.com/googlemaps/react-wrapper
3. Stack Overflow (tag: reactjs, google-maps-api)
4. AI coding assistants (Claude, GitHub Copilot)

Good luck building Phase 2! 🏐
