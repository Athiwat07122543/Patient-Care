"use client"
import { useEffect, useState } from "react"
import socket from "../socket";
import { toast } from 'react-toastify';
import { Monda } from 'next/font/google';

const monda = Monda({
    weight: ['400', '700'],
    subsets: ['latin'],
});

type Data = {
    id: string | undefined,
    firstName: string,
    middleName: string,
    lastName: string,
    birthday: string,
    gender: string,
    phoneNumber: string,
    email: string,
    address: string,
    language: string,
    nationality: string,
    emergencyName: string,
    emergencyRelation: string,
    status: string
}

const initialData: Data = {
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    gender: "man",
    phoneNumber: "",
    email: "",
    address: "",
    language: "",
    nationality: "",
    emergencyName: "",
    emergencyRelation: "",
    status: "actively"
}

export default function Form() {
    const [data, setData] = useState<Data>(initialData)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const update = { ...data, status: "submitted" }
        socket.emit("form", update)
        setData(initialData)
        toast.success("Patient information submitted successfully.")
        socket.disconnect();
        socket.connect();
    }

    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const update = { ...data, [e.target.name]: e.target.value, status: "actively" }
        setData((perv) => ({ ...perv, [e.target.name]: e.target.value }))
        socket.emit("form", update)
    }


    useEffect(() => {
        const firstData = async () => {
            const update = await { ...data, id: socket.id }
            setData(update)
            socket.emit("form", update)
        }
        firstData()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            const update = { ...data, status: "inactive" }
            socket.emit("form", update)
        }, 30000);

        return () => clearTimeout(timer);
    }, [data]);


    return (
        <div className={`bg-white p-2 md:mt-0 md:p-10 rounded-xl shadow-2xl min-w-[300px] md:w-[550px] ${monda.className}`}>
            <label className="font-bold text-xl md:text-4xl text-center block w-full">Patient Information Form</label>
            <form onSubmit={handleSubmit} className="flex flex-col md:gap-4 md:p-4">
                <div className="md:flex md:gap-4">
                    <div className="flex flex-col">
                        <label><label className="text-red-500">*</label>First name</label>
                        <input name="firstName" type="text" onChange={handleForm} value={data.firstName} className="border py-1 px-2 rounded-md" required />
                    </div>
                    <div className="flex flex-col">
                        <label><label className="text-red-500">*</label>Last name</label>
                        <input name="lastName" type="text" onChange={handleForm} value={data.lastName} className="border py-1 px-2 rounded-md" required />
                    </div>
                </div>
                <div className="md:flex gap-4">
                    <div className="flex flex-col">
                        <label>Middle name (Option)</label>
                        <input name="middleName" type="text" onChange={handleForm} value={data.middleName} className="border py-1 px-2 rounded-md" />
                    </div>
                    <div className="flex flex-col md:w-full">
                        <label><label className="text-red-500">*</label>Date of Birth</label>
                        <input name="birthday" type="Date" onChange={handleForm} value={data.birthday} className="border py-1 px-2 rounded-md" required />
                    </div>
                </div>
                <div className="md:flex gap-4">
                    <div className="flex flex-col md:w-full">
                        <label><label className="text-red-500">*</label>Gender</label>
                        <select name="gender" onChange={handleForm} className="border py-[6.4] px-2 rounded-md" value={data.gender}>
                            <option value="man">Man</option>
                            <option value="girl">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label><label className="text-red-500">*</label>Phone number</label>
                        <input name="phoneNumber" type="text" inputMode="numeric" pattern="0[0-9]{9}" onChange={handleForm} value={data.phoneNumber} className="border py-1 px-2 rounded-md" required />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label><label className="text-red-500">*</label>Email</label>
                    <input name="email" type="email" onChange={handleForm} value={data.email} className="border py-1 px-2 rounded-md" required />
                </div>
                <div className="flex flex-col">
                    <label className="w-10"><label className="text-red-500">*</label>Address</label>
                    <textarea name="address" onChange={handleForm} value={data.address} className="border py-1 px-2 rounded-md md:w-full" rows={2} required />
                </div>


                <div className="md:flex gap-4">
                    <div className="flex flex-col">
                        <label><label className="text-red-500">*</label>Nationlity</label>
                        <input name="nationality" type="text" onChange={handleForm} value={data.nationality} className="border py-1 px-2 rounded-md" required />
                    </div>
                    <div className="flex flex-col">
                        <label><label className="text-red-500">*</label>Preferred Language</label>
                        <input name="language" type="text" onChange={handleForm} value={data.language} className="border py-1 px-2 rounded-md" required />
                    </div>
                </div>

                <div className=" mt-2 md:mt-0">
                    <label className="text-[20px] font-bold">Emergency Contact</label>
                    <div className="md:flex gap-4">
                        <div className="flex flex-col">
                            <label>Name</label>
                            <input name="emergencyName" type="text" onChange={handleForm} value={data.emergencyName} className="border py-1 px-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label>Relationshop</label>
                            <input name="emergencyRelation" type="text" onChange={handleForm} value={data.emergencyRelation} className="border py-1 px-2 rounded-md" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg-green-500 w-fit p-2 mt-2 rounded-md text-white hover:cursor-pointer hover:bg-green-600">Send</button>


            </form>
            <div className="block md:hidden items-center text-center">

            </div>
        </div >
    )
}
