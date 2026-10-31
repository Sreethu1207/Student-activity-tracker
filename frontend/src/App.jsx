
import { useState } from "react";
import Sidebar from "./components/Sidebartemp";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import Summary from "./components/Summary";
import Toast from "./components/Toast";

import "./App.css";
function App() {
    const [activePage, setActivePage] = useState("Dashboard");
    const [refresh, setRefresh] = useState(0);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    // Show popup message
    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    // Close popup message
    const closeToast = () => {
        setToast({
            message: "",
            type: "success"
        });
    };

    // After adding an activity
    const handleActivityAdded = () => {
        setRefresh(prev => prev + 1);
        showToast("Activity added successfully!", "success");
    };

    // After deleting an activity
    const handleActivityDeleted = () => {
        setRefresh(prev => prev + 1);
        showToast("Activity deleted successfully!", "success");
    };

    return (
        <>
            <Sidebar setActivePage={setActivePage} />

            <main className="app">
                <header>
                    <h1>Student Activity Tracker</h1>
                    <p>Manage and track student activities</p>
                </header>


                {activePage === "Dashboard" && (
                    <>
                        <Summary refresh={refresh} />

                        <ActivityForm
                            onActivityAdded={handleActivityAdded}
                        />

                        <ActivityList
                            refresh={refresh}
                            onActivityDeleted={handleActivityDeleted}
                            showToast={showToast}
                        />
                    </>
                )}

                {activePage === "Student Activities" && (
                    <ActivityList
                        refresh={refresh}
                        onActivityDeleted={handleActivityDeleted}
                        showToast={showToast}
                    />
                )}

          
                {activePage === "Add Activity" && (
                    <ActivityForm
                        onActivityAdded={() => {
                            handleActivityAdded();
                            setActivePage("Student Activities");
                        }}
                    />
                )}

   
                {activePage === "Summary" && (
                    <Summary refresh={refresh} />
                )}
            </main>


            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        </>
    );
}
export default App;
