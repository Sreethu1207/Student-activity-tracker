import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

function Summary({ refresh }) {
    const [summary, setSummary] = useState({
        total_entries: 0,
        total_hours: 0,
        most_active_user: null
    });
    const [loading, setLoading] = useState(true);
    const fetchSummary = async () => {
        try {
            setLoading(true);
            const response = await getSummary();
            setSummary(response.data);
        } catch (error) {
            console.error("Summary error:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSummary();
    }, [refresh]);
    if (loading) return <p>Loading summary...</p>;
    return (
        <div className="summary-container">
            <h2>Activity Summary</h2>
            <div className="summary-cards">
                <div className="card">
                    <h3>Total Entries</h3>
                    <p>{summary.total_entries}</p>
                </div>
                <div className="card">
                    <h3>Total Hours</h3>
                    <p>{summary.total_hours}</p>
                </div>
                <div className="card">
                    <h3>Most Active Student</h3>
                    <p>{summary.most_active_user || "No data"}</p>
                </div>
            </div>
        </div>
    );
}
export default Summary;