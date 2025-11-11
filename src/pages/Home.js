import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-overlay" />

      <motion.header
        className="cyber-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to="/" className="logo">
          Todo<span>.Management</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <Link to="/todos" className="nav-link">
            Todos
          </Link>
        </nav>
      </motion.header>

      <motion.main
        className="home-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="hero-icon">
          <Zap size={48} />
        </div>
        <h1 className="hero-title">Organize. Focus. Dominate.</h1>
        <p className="hero-subtitle">
          Your futuristic task manager — built for speed, clarity, and control.
        </p>
        <Link to="/todos" className="cyber-btn-glow big">
          <span>Start Managing Tasks</span>
          <ArrowRight size={18} />
        </Link>
      </motion.main>

      <div className="background-lines">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="moving-line" style={{ left: `${i * 20}%` }} />
        ))}
      </div>
    </div>
  );
}
