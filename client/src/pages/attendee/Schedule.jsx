import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  User,
  Plus,
  CalendarDays,
  Bell,
  X,
} from "lucide-react";

import { useState } from "react";
import "./Schedule.css";

export default function Schedule() {
  const [openModal, setOpenModal] = useState(false);

  const schedule = [
    {
      time: "10:00 AM",
      title: "AI & Future Tech",
      speaker: "Dr. Ahmed Khan",
      location: "Hall A",
      status: "Upcoming",
    },
    {
      time: "12:00 PM",
      title: "Startup Growth Hacks",
      speaker: "Sara Ali",
      location: "Hall B",
      status: "Live",
    },
    {
      time: "2:00 PM",
      title: "Web3 Workshop",
      speaker: "John Smith",
      location: "Hall C",
      status: "Popular",
    },
    {
      time: "4:00 PM",
      title: "Networking Session",
      speaker: "Panel Team",
      location: "Main Hall",
      status: "Networking",
    },
  ];

  // ================= ALERTS =================

  const handleAddSchedule = (title) => {
    alert(`📅 "${title}" added to your personal schedule!`);
  };

  const handleReminder = (title) => {
    alert(`⏰ Reminder set for "${title}"`);
  };

  return (
    <div className="schedule-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="schedule-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <div>
          <h1>My Event Schedule 📅</h1>
          <p>
            Organize your sessions and create your personal agenda
          </p>
        </div>

        <button
          className="create-schedule-btn"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={18} />
          Create Schedule
        </button>

      </motion.div>

      {/* ================= TIMELINE ================= */}

      <div className="timeline">

        {schedule.map((item, i) => (
          <motion.div
            key={i}
            className="schedule-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >

            {/* TOP */}

            <div className="card-top">

              <div className="time">
                <Clock size={16} />
                {item.time}
              </div>

              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>

            </div>

            {/* TITLE */}

            <h2>{item.title}</h2>

            {/* META */}

            <div className="meta">

              <span>
                <User size={14} />
                {item.speaker}
              </span>

              <span>
                <MapPin size={14} />
                {item.location}
              </span>

            </div>

            {/* ACTION BUTTONS */}

            <div className="schedule-actions">

              <button
                className="add-btn"
                onClick={() => handleAddSchedule(item.title)}
              >
                <CalendarDays size={16} />
                Add Schedule
              </button>

              <button
                className="reminder-btn"
                onClick={() => handleReminder(item.title)}
              >
                <Bell size={16} />
                Reminder
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
              className="schedule-modal"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >

              {/* CLOSE */}

              <button
                className="close-btn"
                onClick={() => setOpenModal(false)}
              >
                <X size={20} />
              </button>

              <h2>Create Personal Schedule 📅</h2>

              <p>
                Plan your event journey and never miss important sessions
              </p>

              {/* FORM */}

              <form className="schedule-form">

                <div className="form-group">
                  <label>Schedule Name</label>

                  <input
                    type="text"
                    placeholder="My Tech Schedule"
                  />
                </div>

                <div className="form-group">
                  <label>Select Event Day</label>

                  <select>
                    <option>Day 1</option>
                    <option>Day 2</option>
                    <option>Day 3</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Sessions</label>

                  <textarea
                    rows="4"
                    placeholder="Add sessions you want to attend..."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Reminder Time</label>

                  <input type="time" />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  Save Schedule
                </button>

              </form>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}