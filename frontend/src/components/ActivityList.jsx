
import { useEffect, useState } from "react";

import {
    getActivities,
    deleteActivity
} from "../services/api";

function ActivityList({ refresh, onActivityDeleted, showToast }) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchActivities = async () => {
        try {
            setLoading(true);

            const response = await getActivities();

            setActivities(response.data);
            setError("");
        } catch (err) {
            setError("Unable to fetch activities.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, [refresh]);

    // Delete activity
    const handleDelete = async (id) => {
        if (!id) {
            showToast("Activity ID is missing.", "error");
            return;
        }

        try {
            await deleteActivity(id);

            await fetchActivities();

            if (onActivityDeleted) {
                onActivityDeleted();
            }
        } catch (err) {
            showToast("Unable to delete activity.", "error");
        }
    };

    if (loading) {
        return <p>Loading activities...</p>;
    }
    return (
        <div className="list-container">
            <h2>Student Activities</h2>

            {error && <p className="error">{error}</p>}

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Activity</th>
                            <th>Hours</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activities.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.student_name}</td>
                                <td>{item.activity}</td>
                                <td>{item.hours}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {activities.length === 0 && (
                            <tr>
                                <td colSpan="5">
                                    No activities found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ActivityList;
