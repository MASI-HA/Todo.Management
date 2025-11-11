// === DARK CYBER UI KIT ===

import Swal from "sweetalert2";
import { BarLoader } from "react-spinners";
import React from "react";

// ⚙️ Toast Alert Example
export const cyberToast = (title = "Task completed!") => {
  Swal.fire({
    title,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#0d1117",
    color: "#e6edf3",
    customClass: {
      popup: "cyber-toast",
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

// ⚙️ Main Alert Example
export const cyberAlert = (title, text, icon = "info") => {
  Swal.fire({
    title,
    text,
    icon,
    background: "#0d1117",
    color: "#e6edf3",
    customClass: {
      popup: "cyber-alert",
      confirmButton: "cyber-btn",
    },
    confirmButtonText: "OK",
  });
};

// ⚙️ Bar Loader Component
export const CyberLoader = ({ loading }) => {
  return (
    <div className={`cyber-loader-wrapper ${loading ? "show" : "hide"}`}>
      <BarLoader
        height={2.5}
        speedMultiplier={1.8}
        width={130}
        color="#0dcaf0"
      />
    </div>
  );
};
