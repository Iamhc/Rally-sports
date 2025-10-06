export const EVENTS = [
  {
    id: 1,
    title: "Morning Tennis Doubles",
    sport: "Tennis",
    organizer: "Coach Arjun",
    location: "Rally Arena, Delhi",
    description:
      "Join our fun social tennis doubles every weekend morning. Beginners and intermediates welcome!",
    joining: [{ id: "u1", name: "Aman" }, { id: "u2", name: "Riya" }],
    dates: [
      { id: "d1", label: "Sat, Oct 12 – 7:00 AM" },
      { id: "d2", label: "Sun, Oct 13 – 7:00 AM" },
    ],
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lovedCount: 25, // optional, for "Most Loved"
  },
  {
    id: 2,
    title: "Evening Football Match",
    sport: "Football",
    organizer: "PlayNow Club",
    location: "Greenfield Turf, Mumbai",
    description:
      "Friendly 7-a-side match — great for casual players. Join solo or bring your friends!",
    joining: [
      { id: "u3", name: "Kabir" },
      { id: "u4", name: "Dev" },
      { id: "u5", name: "Zara" },
    ],
    dates: [
      { id: "d1", label: "Fri, Oct 11 – 6:00 PM" },
      { id: "d2", label: "Sun, Oct 13 – 5:30 PM" },
    ],
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=60",
    lovedCount: 40,
  },
  {
    id: 3,
    title: "Basketball Beginners Class",
    sport: "Basketball",
    organizer: "Coach Meena",
    location: "SkyCourt Gym, Bengaluru",
    description:
      "Learn dribbling, shooting, and teamwork skills. A fun intro session for all ages.",
    joining: [{ id: "u6", name: "Neha" }, { id: "u7", name: "Rohan" }],
    dates: [
      { id: "d1", label: "Wed, Oct 9 – 4:00 PM" },
      { id: "d2", label: "Fri, Oct 11 – 5:00 PM" },
    ],
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=60",
    lovedCount: 30,
  },
];
