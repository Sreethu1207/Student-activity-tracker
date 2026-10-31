import { useState } from "react";
import { addActivity } from "../services/api";

function ActivityForm({ onActivityAdded }) {
    const [student_name, setName] = useState("");
    const [activity, setActivity] = useState("");
    const [hours, setHours] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!student_name.trim() || !activity.trim() || !hours) {
            setError("Please fill all fields.");
            return;
        }
        if (!Number.isInteger(Number(hours)) || Number(hours) <= 0) {
            setError("Hours must be a positive whole number.");
            return;
        }
        try {
            setLoading(true);
            setError("");
            await addActivity({
                student_name,
                activity,
                hours: Number(hours)
            });
            setName("");
            setActivity("");
            setHours("");
            onActivityAdded();
        } catch (err) {
            setError(err.response?.data? JSON.stringify(err.response.data): "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="form-container">
            <h2>Add Student Activity</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Student Name" value={student_name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Activity" value={activity} onChange={(e) => setActivity(e.target.value)}/>
                <input type="number" placeholder="Hours" min="1" step="1" value={hours} onChange={(e) => setHours(e.target.value)}/>
                {error && (
                    <p className="error">{error}</p>
                )}
                <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Activity"}</button>
            </form>
        </div>
    );
}

export default ActivityForm;