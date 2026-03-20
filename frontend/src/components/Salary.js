import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "./api";
export default function Save() {

    const [salary, setSalary] = useState("");
    const [bonus, setBonus] = useState("");
    const [deduction, setDeduction] = useState("");
    const [month, setMonth] = useState("January");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const base = parseFloat(salary) || 0;
        const b = parseFloat(bonus) || 0;
        const d = parseFloat(deduction) || 0;
        const total = (base + b - d).toString();

        try {
            await axios.post(`${API}/salary/`, {
    salary,
    bonus,
    deduction,
    month,
    total,
});
            console.log({ salary, bonus, deduction, month, total });
            alert("Salary Added!");
            navigate("/employee");
        } catch (error) {
            console.error("Failed to add salary", error);
            alert("Failed to add salary: " + (error.response?.data ? JSON.stringify(error.response.data) : error.message));
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Add Salary Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm text-gray-600">Basic Salary:</label>
                    <input
                        type="text"
                        placeholder="Enter your salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Bonus:</label>
                    <input
                        type="text"
                        placeholder="Enter your bonus"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Deduction:</label>
                    <input
                        value={deduction}
                        placeholder="Enter your deduction"
                        onChange={(e) => setDeduction(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    >

                    </input>
                </div>

                <div>
                    <label className="text-sm text-gray-600">Month:</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>
                </div>


                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md "
                >
                    Add Salary
                </button>

                <Link to="/dashboard">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mt-2">Back to Dashboard</button>
                </Link>
            </form>
        </div>

    );
}