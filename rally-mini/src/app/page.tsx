"use client";

import Image from "next/image";
import { EVENTS } from "./Data/Events";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [screen, setScreen] = useState("explore");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [booking, setBooking] = useState(null);
  const filters = ["All", "Tennis", "Football", "Basketball", "Most Loved"];
  const [sportFilter, setSportFilter] = useState("All");
  const [query, setQuery] = useState("");
  const headings = [
    {
      highlight: "Rally",
      text: " Your Passion in Sports",
      color: "text-red-500",
    },
    {
      highlight: "Join",
      text: " Exciting Events Nearby",
      color: "text-green-500",
    },
    {
      highlight: "Play,",
      text: " Compete & Connect",
      color: "text-purple-600",
    },
    { highlight: "Discover", text: " Fun Activities", color: "text-pink-500" },
  ];

  const [currentHeading, setCurrentHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const sports = ["All", "Tennis", "Football", "Basketball"];

  function selectEvent(e) {
    setSelectedEvent(e);
    setScreen("details");
  }

  function proceedToCheckout() {
    setBooking({ event: selectedEvent, date: selectedDate });
    setScreen("checkout");
  }

  function confirmBooking() {
    if (!booking?.event) return;
    booking.event.joining.push({
      id: "u" + Math.random().toFixed(5),
      name: "You",
    });
    setScreen("confirmation");
  }

  function resetSelection() {
    setSelectedEvent(null);
    setSelectedDate(null);
    setQuery("");
    setSportFilter("All");
    setScreen("explore");
  }
  // Compute filteredEvents only once
  let filteredEvents = (() => {
    if (sportFilter === "Most Loved") {
      // Sort by lovedCount descending
      return [...EVENTS].sort(
        (a, b) => (b.lovedCount || 0) - (a.lovedCount || 0)
      );
    } else {
      // Filter by sport + search query
      return EVENTS.filter(
        (e) =>
          (sportFilter === "All" || e.sport === sportFilter) &&
          e.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  })();

  // If "Most Loved" is selected, sort by lovedCount descending
  if (sportFilter === "Most Loved") {
    filteredEvents = [...EVENTS].sort((a, b) => b.lovedCount - a.lovedCount);
  } else {
    filteredEvents = EVENTS.filter(
      (e) =>
        (sportFilter === "All" || e.sport === sportFilter) &&
        e.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans max-w-3xl mx-auto">
      {/* Explore Page */}
      {screen === "explore" && (
        <>
          <div className="h-14 mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentHeading}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl font-bold text-center"
              >
                <span className={headings[currentHeading].color}>
                  {headings[currentHeading].highlight}
                </span>
                {headings[currentHeading].text}
              </motion.h1>
            </AnimatePresence>

            {/* optional underline */}
          </div>

          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-2 mb-3 sm:p-3"
          />

          <div className="flex gap-2 mb-4 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSportFilter(f)}
                className={`px-3 py-1 rounded-full text-sm sm:text-base whitespace-nowrap ${
                  sportFilter === f
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredEvents.map((e, i) => (
              <motion.div
                key={e.id}
                onClick={() => selectEvent(e)}
                className="bg-white rounded-2xl shadow p-3 cursor-pointer sm:p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={e.image}
                  alt={e.title}
                  width={800}
                  height={320}
                  className="rounded-xl w-full h-48 sm:h-64 object-cover"
                />
                <h2 className="text-lg sm:text-xl font-semibold mt-2">
                  {e.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                  {e.organizer} · {e.location}
                </p>
                <p className="text-sm sm:text-base text-gray-400 mt-1">
                  {e.sport}
                </p>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Event Details */}
      {screen === "details" && selectedEvent && (
        <>
          <button
            onClick={resetSelection}
            className="text-sm sm:text-base text-blue-600 mb-2"
          >
            ← Back to Explore
          </button>

          <Image
            src={selectedEvent.image}
            alt={selectedEvent.title}
            width={800}
            height={384}
            className="rounded-xl w-full h-48 sm:h-64 object-cover"
          />

          <div className="bg-white rounded-2xl shadow p-4 mt-3 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {selectedEvent.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              {selectedEvent.organizer} · {selectedEvent.location}
            </p>
            <p className="mt-3 text-gray-600">{selectedEvent.description}</p>

            <div className="mt-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-700">
                Who's joining
              </h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedEvent.joining.map((u) => (
                  <div
                    key={u.id}
                    className="px-3 py-2 bg-gray-100 rounded-full text-sm sm:text-base"
                  >
                    {u.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-700">
                Choose a date
              </h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedEvent.dates.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDate(d)}
                    className={`px-3 py-2 rounded-full text-sm sm:text-base ${
                      selectedDate?.id === d.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedDate}
              onClick={proceedToCheckout}
              className={`mt-5 w-full py-2 rounded-xl font-medium ${
                selectedDate
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Checkout
            </button>
          </div>
        </>
      )}

      {/* Checkout */}
      {screen === "checkout" && booking && (
        <div>
          <button
            onClick={() => setScreen("details")}
            className="text-sm sm:text-base text-blue-600 mb-2"
          >
            ← Back
          </button>

          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Confirm Your Booking
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              {booking?.event?.title} · {booking?.event?.location}
            </p>
            <p className="mt-3 text-gray-700">
              Selected Date:{" "}
              <span className="font-medium">{booking?.date?.label}</span>
            </p>
            <button
              onClick={confirmBooking}
              className="mt-5 w-full py-2 rounded-xl font-medium bg-green-600 text-white"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Confirmation */}
      {screen === "confirmation" && (
        <div className="text-center mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
            ✅ Booking Confirmed!
          </h2>
          <p className="mt-2 text-gray-600">
            You’ve joined <strong>{booking?.event?.title}</strong>
          </p>
          <p className="text-gray-500 mt-1">
            {booking?.date?.label} · {booking?.event?.location}
          </p>

          <button
            onClick={resetSelection}
            className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm sm:text-base"
          >
            Back to Explore
          </button>
        </div>
      )}
    </div>
  );
}
