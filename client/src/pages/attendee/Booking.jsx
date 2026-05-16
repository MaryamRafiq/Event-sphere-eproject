import { motion } from "framer-motion";
import {
  Ticket,
  Calendar,
  MapPin,
  CheckCircle,
  Download,
  Eye,
  Trash2,
} from "lucide-react";

import "./Booking.css";

export default function Bookings() {

  const bookings = [
    {
      title: "AI & Future Tech",
      date: "12 June 2026",
      time: "10:00 AM",
      location: "Hall A",
      status: "Confirmed",
      ticket: "#AI2026",
    },
    {
      title: "Startup Growth Hacks",
      date: "12 June 2026",
      time: "12:00 PM",
      location: "Hall B",
      status: "Pending",
      ticket: "#SG4501",
    },
    {
      title: "Web3 Workshop",
      date: "12 June 2026",
      time: "2:00 PM",
      location: "Hall C",
      status: "Confirmed",
      ticket: "#WB8877",
    },
  ];

  // ================= ACTIONS =================

  const handleView = (title) => {
    alert(`🎟️ Viewing booking details for "${title}"`);
  };

  const handleDownload = (title) => {
    alert(`⬇️ Ticket for "${title}" downloaded successfully`);
  };

  const handleCancel = (title) => {
    alert(`❌ "${title}" booking cancelled`);
  };

  return (
    <div className="booking-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="booking-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>My Bookings 🎟️</h1>

        <p>
          View your registered sessions, tickets, and event schedule
        </p>
      </motion.div>

      {/* ================= STATS ================= */}

      <div className="booking-stats">

        <div className="stat-card">
          <h2>03</h2>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <h2>02</h2>
          <p>Confirmed</p>
        </div>

        <div className="stat-card">
          <h2>01</h2>
          <p>Pending</p>
        </div>

      </div>

      {/* ================= GRID ================= */}

      <div className="booking-grid">

        {bookings.map((b, i) => (
          <motion.div
            key={i}
            className="booking-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >

            {/* TOP */}

            <div className="card-top">

              <div className="ticket-badge">
                <Ticket size={16} />
                Ticket
              </div>

              <div className={`status ${b.status.toLowerCase()}`}>
                <CheckCircle size={14} />
                {b.status}
              </div>

            </div>

            {/* TITLE */}

            <h2>{b.title}</h2>

            {/* INFO */}

            <div className="info">

              <span>
                <Calendar size={15} />
                {b.date} • {b.time}
              </span>

              <span>
                <MapPin size={15} />
                {b.location}
              </span>

            </div>

            {/* TICKET NUMBER */}

            <div className="ticket-number">
              Ticket ID: <strong>{b.ticket}</strong>
            </div>

            {/* ACTION BUTTONS */}

            <div className="booking-actions">

              <button
                className="view-btn"
                onClick={() => handleView(b.title)}
              >
                <Eye size={16} />
                View
              </button>

              <button
                className="download-btn"
                onClick={() => handleDownload(b.title)}
              >
                <Download size={16} />
                Download
              </button>

              <button
                className="cancel-btn"
                onClick={() => handleCancel(b.title)}
              >
                <Trash2 size={16} />
                Cancel
              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}