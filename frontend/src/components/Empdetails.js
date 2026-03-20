import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import API from "../api";
export default function EmployeeDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
           const res = await axios.get(`${API}/profile/${id}/`);
            setEmployee(res.data);
        } catch (err) {
            console.error("Error fetching employee", err);
        }
    };

    if (!employee) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">

            <h2 className="text-xl font-bold mb-4 text-center">
                Employee Profile
            </h2>

            <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    {employee.photo ? (
                        <img
                            src={`${API.replace("/api","")}${employee.photo}`}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="flex items-center justify-center h-full text-gray-400 text-2xl">
                            👤
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-2 text-sm text-center">
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Emp_ID:</strong> {employee.id} </p>
                <p><strong>Phone:</strong> {employee.phone}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Position:</strong> {employee.position}</p>
            </div>
            <Link to="/admin">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Back</button>
            </Link>

        </div>

    );
}