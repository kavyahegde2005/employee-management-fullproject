import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Myprofile() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("IT");
    const [position, setPosition] = useState("Developer");
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("department", department);
            formData.append("position", position);
            formData.append("photo", photo);

            await axios.post(
                "http://localhost:8000/api/profile/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Profile Updated!");
            navigate("/salary");

        } catch (error) {
            console.error(error);
            alert("Error uploading profile");
        }
    };
    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">

            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm text-gray-600">Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Phone:</label>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Photo:</label>

                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Department:</label>
                    <select
                        value={department}
                        placeholder="Enter your department"
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    >
                        <option>IT</option>
                        <option>Research & Development</option>
                        <option>Finance</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm text-gray-600">Position:</label>
                    <select
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    >
                        <option>Developer</option>
                        <option>Manager</option>
                        <option>Designer</option>
                        <option>Tester</option>
                        <option>Executive</option>
                        <option>Analyst</option>
                    </select>
                </div>


                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                    Save Changes
                </button>


            </form>
        </div>
    );
}