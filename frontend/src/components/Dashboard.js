import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const role = localStorage.getItem("role");

    return (
        <div
            className="min-h-screen flex items-center px-20"
            style={{
                backgroundImage: "url('/images/img.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="px-20 py-24 ">
                {role === "admin" && (
                    <div>

                        <h1 className="text-3xl font-bold mb-8">
                            Admin Dashboard
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link to="/admin">
                                <div className="bg-white p-6 rounded-xl shadow">

                                    <h2 className="text-lg font-semibold mb-2">
                                        Manage Employees
                                    </h2>

                                    <p className="text-gray-500">
                                        Easily view and manage employees in the system
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                {role === "employee" && (
                    <div>
                        <h1 className="text-3xl font-bold mb-8">
                            Employee Dashboard
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link to="/employee">
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h2 className="text-lg font-semibold mb-2">
                                        My Profile
                                    </h2>
                                    <p className="text-gray-500">
                                        View and update your personal details
                                    </p>
                                </div>
                            </Link>
                            <Link to="/salary">
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Add Salary
                                    </h2>
                                    <p className="text-gray-500">
                                        Add your salary information
                                    </p>
                                </div>
                            </Link>

                            <Link to="/history">
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Salary History
                                    </h2>
                                    <p className="text-gray-500">
                                        Check your salary history
                                    </p>
                                </div>
                            </Link>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <h2 className="text-lg font-semibold mb-2">
                                    ID Card
                                </h2>
                                <p className="text-gray-500">
                                    View and download your ID card here.
                                </p>
                            </div>



                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}