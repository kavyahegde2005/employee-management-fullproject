import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {

    const [profile, setProfile] = useState({});
    const [salaryHistory, setSalaryHistory] = useState([]);

    useEffect(() => {
        fetchProfile();
        fetchSalary();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/profile/");
            if (res.data && res.data.length > 0) {
                setProfile(res.data[res.data.length - 1]);
            } else {
                setProfile({});
            }
        } catch (error) {
            console.error(error);
        }
    };


    const fetchSalary = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/salary/");
            setSalaryHistory(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-3xl font-bold mb-8">
                Employee Dashboard
            </h1>

            <div className="bg-white p-6 text-center rounded-xl shadow mb-8">

                <h2 className="text-center font-semibold mb-4">
                    My Profile
                </h2>
                <div className="flex justify-center mb-4">
                    {profile.photo ? (
                        <img
                            src={`http://localhost:8000${profile.photo}`}
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover border"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                            👤
                        </div>
                    )}
                </div>

                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
                <p><strong>Department:</strong> {profile.department}</p>
                <p><strong>Position:</strong> {profile.position}</p>


            </div>

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-xl font-semibold mb-4">
                    Salary History
                </h2>

                <table className="w-full border">

                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">Month</th>
                            <th className="p-2 border">Salary</th>
                            <th className="p-2 border">Bonus</th>
                            <th className="p-2 border">Deduction</th>
                            <th className="p-2 border">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {salaryHistory.map((salary, index) => (
                            <tr key={index}>
                                <td className="p-2 border">{salary.month}</td>
                                <td className="p-2 border">₹{salary.salary}</td>
                                <td className="p-2 border">₹{salary.bonus}</td>
                                <td className="p-2 border">₹{salary.deduction}</td>
                                <td className="p-2 border">₹{salary.total}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div><br></br>
            <Link to="/myprofile">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2">
                    Edit Profile
                </button>
            </Link>
            <Link to="/dashboard">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                    Back to Dashboard
                </button>
            </Link>

        </div>
    );
}