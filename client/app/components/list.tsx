"use client"
import React, { useEffect, useState } from 'react'
import socket from "../socket";
import { Monda } from 'next/font/google';

const monda = Monda({
    weight: ['400', '700'],
    subsets: ['latin'],
});

type Data = {
    id: string,
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

export default function List() {
    const [data, setData] = useState<Data[]>([])
    const activelyCount = data.filter((item) => item.status === "actively").length;
    const submittedCount = data.filter((item) => item.status === "submitted").length;
    const inactiveCount = data.filter((item) => item.status === "inactive").length;

    const getData = (msg: Data) => {
        setData(prev => {
            const exists = prev.find(item => item.id === msg.id);
            if (exists) {
                return prev.map(item =>
                    item.id === msg.id ? msg : item
                );
            } else {
                return [...prev, msg];
            }
        });
    };

    useEffect(() => {
        socket.on("data", getData)
        return () => {
            socket.off("data", getData)
        }
    }, [])

    return (
        <div className={`rounded-xl shadow-2xl md:p-10 bg-white p-2 ${monda.className}`}>
            <div className='py-4'>
                <label className='font-bold text-2xl md:text-6xl text-left'>Patient Information</label>
            </div>

            {/* mobile */}
            <div className='block md:hidden'>
                <div className='flex flex-col md:justify-between'>
                    <div>
                        <label>Total Patients:</label>
                        <label>{data.length}</label>
                    </div>
                    <div>
                        <label>Submitted Forms:</label>
                        <label>{submittedCount}</label>
                    </div>
                    <div>
                        <label>Forms In Progress:</label>
                        <label>{activelyCount}</label>
                    </div>
                    <div>
                        <label>Inactive Forms:</label>
                        <label>{inactiveCount}</label>
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className='hidden md:block'>
                <div className='flex justify-center gap-4'>
                    <div className='border p-2 border-orange-500 bg-orange-500 text-white text-xl rounded-md'>
                        <label>Total Patients:</label>
                        <label>{data.length}</label>
                    </div>
                    <div className='border p-2 border-green-600 bg-green-600 text-white text-xl rounded-md'>
                        <label>Submitted Forms:</label>
                        <label>{submittedCount}</label>
                    </div>
                    <div className='border p-2 border-blue-500 bg-blue-500 text-white text-xl rounded-md'>
                        <label>Forms In Progress:</label>
                        <label>{activelyCount}</label>
                    </div>
                    <div className='border p-2 border-red-500 bg-red-500 text-white text-xl rounded-md'>
                        <label>Inactive Forms:</label>
                        <label>{inactiveCount}</label>
                    </div>
                </div>
            </div>

            <ul className='md:flex md:flex-col md:gap-2 space-y-2 md:space-y-0 mt-2'>
                {data.length <= 0
                    ? <div className='flex justify-center py-4'>
                        <label className='text-xl md:text-2xl'>No patient data available.</label>
                    </div>
                    : (data.map((item, index) =>
                        <li className='p-2 md:p-4 border border-orange-200 rounded-md' key={index}>
                            <div>
                                <label className={`font-bold md:text-4xl ${item.status === "submitted" && "text-green-500"} ${item.status === "actively" && "text-blue-500"} ${item.status === "inactive" && "text-red-500"}`}>
                                    {item.status === "submitted" && "Form submitted"}
                                    {item.status === "actively" && "Form in progress"}
                                    {item.status === "inactive" && "Form inactive"}

                                </label>
                                <div className="flex gap-1 md:gap-4 flex-wrap">

                                    <div className="flex flex-col basis-[34%] md:basis-[6%]">
                                        <label>First name</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.firstName}</label>
                                    </div>

                                    <div className="flex flex-col basis-[34%] md:basis-[6%]">
                                        <label>Last name</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.lastName}</label>
                                    </div>

                                    <div className="flex flex-col basis-[29%] md:basis-[6%]">
                                        <label>Middle name</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.middleName}</label>
                                    </div>

                                    <div className="flex flex-col basis-[38%] md:basis-[6%]">
                                        <label className='min-w-26'>Date of Birth</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.birthday}</label>
                                    </div>


                                    <div className="flex flex-col basis-[20%] md:basis-[4%]">
                                        <label>Gender</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.gender === "man" ? "Man" : "Female"}</label>
                                    </div>

                                    <div className="flex flex-col basis-[38%] md:basis-[10%]">
                                        <label>Phone number</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.phoneNumber}</label>
                                    </div>

                                    <div className="flex flex-col basis-full md:basis-[14%]">
                                        <label>Email</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.email}</label>
                                    </div>

                                    <div className="flex flex-col basis-[49%] md:basis-[6%]">
                                        <label>Nationality</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.nationality}</label>
                                    </div>

                                    <div className="flex flex-col basis-[49%] md:basis-[8%]">
                                        <label className='min-w-30'>Preferred Language</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.language}</label>
                                    </div>

                                    <div className="flex flex-col basis-full md:basis-[26%]">
                                        <label className="w-10">Address</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.address}</label>
                                    </div>
                                </div>
                                <div className='md:mt-2'>
                                    <label className="text-[20px] font-bold">Emergency Contact</label>
                                    <div className="flex gap-1 md:gap-4 flex-wrap">
                                        <div className="flex flex-col basis-[49%] md:basis-[6%]">
                                            <label>Name</label>
                                            <label className="border py-1 px-2 rounded-md min-h-8.5">{item.emergencyName}</label>
                                        </div>
                                        <div className="flex flex-col basis-[49%] md:basis-[6%]">
                                            <label>Relationshop</label>
                                            <label className="border py-1 px-2 rounded-md min-h-8.5">{item.emergencyRelation}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}