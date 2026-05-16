import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react";

import { useState } from "react";
import "./Session.css";

export default function Session() {
  const [openModal, setOpenModal] = useState(false);

  const sessions = [
    {
      title: "AI & Future Tech",
      time: "10:00 AM - 11:30 AM",
      location: "Hall A",
      speaker: "Dr. Ahmed Khan",
      attendees: 120,
      category: "Technology",
      status: "Live",
    },
    {
      title: "Startup Growth Hacks",
      time: "12:00 PM - 1:00 PM",
      location: "Hall B",
      speaker: "Sara Ali",
      attendees: 85,
      category: "Business",
      status: "Upcoming",
    },
    {
      title: "Web3 & Blockchain",
      time: "2:00 PM - 3:30 PM",
      location: "Hall C",
      speaker: "John Smith",
      attendees: 150,
      category: "Innovation",
      status: "Popular",
    },
  ];

  // ================= ALERT FUNCTIONS =================

  const handleJoin = (title) => {
    alert(`🎉 You successfully joined "${title}" session!`);
  };

  const handleSave = (title) => {
    alert(`💾 "${title}" session saved successfully!`);
  };

  return (
    <div className="session-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="session-topbar"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Explore Sessions 🎤</h1>
          <p>
            Discover live talks, workshops, and networking sessions
          </p>
        </div>

        <button
          className="create-btn"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={18} />
          Create Session
        </button>
      </motion.div>

      {/* ================= SEARCH ================= */}

      <motion.div
        className="session-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search sessions..." />
        </div>

        <button className="filter-btn">
          <Filter size={16} />
          Filter
        </button>
      </motion.div>

      {/* ================= SESSION GRID ================= */}

      <div className="session-grid">
        {sessions.map((s, i) => (
          <motion.div
            key={i}
            className="session-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >

            <div className="card-top">
              <span className="category">{s.category}</span>

              <span className={`status ${s.status.toLowerCase()}`}>
                {s.status}
              </span>
            </div>

            <h2>{s.title}</h2>

            <div className="info">
              <span>
                <Clock size={15} />
                {s.time}
              </span>

              <span>
                <MapPin size={15} />
                {s.location}
              </span>

              <span>
                <Users size={15} />
                {s.attendees} Attendees
              </span>
            </div>

            <div className="speaker-box">
              <div className="avatar">
                {s.speaker.charAt(0)}
              </div>

              <div>
                <p>Speaker</p>
                <h4>{s.speaker}</h4>
              </div>
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="card-buttons">

              <button
                className="join-btn"
                onClick={() => handleJoin(s.title)}
              >
                Join Session
              </button>

              <button
                className="save-btn"
                onClick={() => handleSave(s.title)}
              >
                Save
              </button>

            </div>

          </motion.div>
        ))}
      </div>

      {/* ================= MODAL ================= */}

      <AnimatePresence>
        {openModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="session-modal"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >

              {/* CLOSE BUTTON */}

              <button
                className="close-btn"
                onClick={() => setOpenModal(false)}
              >
                <X size={20} />
              </button>

              <h2>Create New Session 🎤</h2>

              <p>
                Fill in session details and invite attendees
              </p>

              {/* FORM */}

              <form className="session-form">

                <div className="form-group">
                  <label>Session Title</label>

                  <input
                    type="text"
                    placeholder="Enter session title"
                  />
                </div>

                <div className="form-group">
                  <label>Speaker Name</label>

                  <input
                    type="text"
                    placeholder="Enter speaker name"
                  />
                </div>

                <div className="form-row">

                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" />
                  </div>

                  <div className="form-group">
                    <label>Location</label>

                    <input
                      type="text"
                      placeholder="Hall A"
                    />
                  </div>

                </div>

                <div className="form-group">
                  <label>Category</label>

                  <select>
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Marketing</option>
                    <option>Startup</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                    rows="4"
                    placeholder="Write session details..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  Create Session
                </button>

              </form>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}