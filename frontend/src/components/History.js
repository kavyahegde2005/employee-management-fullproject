import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function History() {

    const [salaryHistory, setSalaryHistory] = useState([]);

    useEffect(() => {
        fetchSalary();
    }, []);

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
            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-center font-semibold mb-4">
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
            <Link to="/dashboard">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                    Back to Dashboard
                </button>
            </Link>

        </div>
    );
}
