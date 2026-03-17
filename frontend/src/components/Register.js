import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [role, setRole] = useState("admin");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("full_name", fullName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("department", department);
            formData.append("designation", designation);
            formData.append("joining_date", joiningDate);
            formData.append("photo", photo);
            formData.append("password", password);
            formData.append("role", role.toLowerCase());

            await axios.post("http://localhost:8000/api/register/", formData);

            alert("Registration successful!");
            navigate("/login");

        } catch (error) {
            const msg = error.response?.data
                ? JSON.stringify(error.response.data)
                : error.message;
            alert("Registration failed: " + msg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border">

                <h2 className="text-2xl text-center font-bold mb-6">Register</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            className="input"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            className="input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Department</label>
                        <select
                            className="input"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="Developer">Developer</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div>
                        <label className="label">Designation</label>
                        <input
                            type="text"
                            placeholder="Enter designation"
                            className="input"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Date of Joining</label>
                        <input
                            type="date"
                            className="input"
                            value={joiningDate}
                            onChange={(e) => setJoiningDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Photo</label>
                        <div className="flex items-center gap-4 mt-2">

                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {photo ? (
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-xl">👤</span>
                                )}
                            </div>

                            <label className="cursor-pointer bg-white border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50">
                                Change
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                />
                            </label>

                        </div>
                    </div>

                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="input"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Role</label>
                        <select
                            className="input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                        Register →
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}