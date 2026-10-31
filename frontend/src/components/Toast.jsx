
import { useEffect } from "react";
import "./Toast.css";

function Toast({ message, type = "success", onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);
    if (!message) return null;
    return (
        <div className={`toast ${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>×</button>
        </div>
    );
}

export default Toast;
