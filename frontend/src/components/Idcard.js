import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function IDCard() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios

  .get(`${API}/profile/${id}/`)
            .then((res) => setEmployee(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const downloadID = async () => {
        const card = document.getElementById("id-card");
        const canvas = await html2canvas(card);
        const link = document.createElement("a");
        link.download = "id-card.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    if (!employee) return <p>Loading...</p>;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

            <div
                id="id-card"
                className="w-[260px] h-[420px] bg-white rounded-2xl shadow-lg text-center border"
            >
                <div className="bg-green-600 text-white py-3 font-bold text-sm">
                    Techmiya Solutions
                </div>
                <div className="flex justify-center mt-5">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500">
                        {employee.photo ? (
                            <img
                                src={`${API.replace("/api", "")}${employee.photo}`}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        ) : "👤"}
                    </div>
                </div>

                <div className="mt-4 space-y-1 px-3">
                    <h2 className="text-lg font-bold">
                        {employee.name}
                    </h2>

                    <p className="text-green-700 font-bold mt-2">
                        EMP_Id: {employee.id}
                    </p>

                    <p className="text-lg">
                        Department: {employee.department}
                    </p>

                    <p className="text-lg">
                        Position: {employee.position}
                    </p>

                    <p className="text-lg">
                        Phone: {employee.phone}
                    </p>
                </div>
            </div>
            <button
                onClick={downloadID}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Download
            </button>
            <button
                onClick={() => navigate("/admin")}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Back
            </button>

        </div>
    );
}