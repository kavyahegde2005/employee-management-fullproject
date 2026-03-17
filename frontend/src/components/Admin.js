import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const [profileRes, salaryRes] = await Promise.all([
                axios.get("http://localhost:8000/api/profile/"),
                axios.get("http://localhost:8000/api/salary/")
            ]);

            const profiles = profileRes.data || [];
            const salaries = salaryRes.data || [];

            if (Array.isArray(profiles) && profiles.length > 0) {
                const combinedEmployees = profiles.map((profile, index) => {
                    const sal = salaries[index];
                    return {
                        id: profile.id || index + 1,
                        name: profile.name || "N/A",
                        department: profile.department || "N/A",
                        position: profile.position || "N/A",
                        salary: sal ? sal.total : 0
                    };
                });

                setEmployees(combinedEmployees);
            } else {
                setEmployees([]);
            }
        } catch (error) {
            console.error("Failed to fetch employees", error);
        }
    };

    const deleteEmployee = async (id) => {
        const confirmDelete = window.confirm("Are you sure to delete?");

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/profile/delete/${id}/`);
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const totalSalary = employees.reduce(
        (sum, emp) => sum + Number(emp.salary || 0),
        0
    );

    return (
        <div className="p-8 bg-gray-100 min-h-screen">

            <div className="grid grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Employees</p>
                    <h2 className="text-3xl font-bold">{employees.length}</h2>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Departments</p>
                    <h2 className="text-3xl font-bold">{new Set(employees.map(e => e.department)).size}</h2>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Salary</p>
                    <h2 className="text-3xl font-bold">₹{totalSalary}</h2>
                </div>

            </div>

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-xl font-semibold mb-4">Employee List</h2>

                <table className="w-full border">

                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Department</th>
                            <th className="p-2 border">Position</th>
                            <th className="p-2 border">Salary</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {employees.map((emp, index) => (
                            <tr key={index} className="text-center">

                                <td className="border p-2">{emp.id}</td>
                                <td className="border p-2">{emp.name}</td>
                                <td className="border p-2">{emp.department}</td>
                                <td className="border p-2">{emp.position}</td>
                                <td className="border p-2">₹{emp.salary}</td>

                                <td className="border p-2">
                                    <div className="flex justify-center gap-2">
                                        <Link to={`/empdetails/${emp.id}`}>
                                            <button
                                                onClick={() => navigate(`/employee/${emp.id}`)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                View
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => navigate(`/idcard/${emp.id}`)}
                                            className="bg-purple-500 text-white px-3 py-1 rounded"
                                        >
                                            ID Card
                                        </button>

                                        <button
                                            onClick={() => deleteEmployee(emp.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}