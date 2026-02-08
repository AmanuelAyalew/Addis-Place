import React, { useEffect } from "react";

const Toast = ({
  open,
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const bg = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 ${bg} text-white px-4 py-2 rounded shadow-md`}
    >
      {message}
    </div>
  );
};

export default Toast;
