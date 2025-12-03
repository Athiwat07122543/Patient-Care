"use client"
import React, { useEffect, useState } from 'react'
import socket from "../socket";

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
        <div className="rounded-xl shadow-2xl md:p-10 bg-white p-2">
            <div className='py-4'>
                <label className='font-bold text-2xl md:text-6xl text-left'>ข้อมูลผู้ป่วย</label>
            </div>
            <div className='flex flex-col md:justify-between'>
                <div>
                    <label>จำนวนข้อมูลผู้ป่วย:</label>
                    <label>{data.length}</label>
                </div>
                <div>
                    <label>จำนวนข้อมูลที่ส่งฟอร์มแล้ว:</label>
                    <label>{submittedCount}</label>
                </div>
                <div>
                    <label>จำนวนข้อมูลที่กำลังกรอกข้อมูลอยู่:</label>
                    <label>{activelyCount}</label>
                </div>
                <div>
                    <label>จำนวนข้อมูลที่ไม่ได้ใช้งานฟอร์ม:</label>
                    <label>{inactiveCount}</label>
                </div>
            </div>
            <ul className='md:flex md:flex-col md:gap-2 space-y-2 md:space-y-0 mt-2'>
                {data.length <= 0
                    ? <div className='flex justify-center py-4'>
                        <label className='text-xl md:text-2xl'>ไม่มีข้อมูลผู้ป่วย</label>
                    </div>
                    : (data.map((item, index) =>
                        <li className='p-2 md:p-4 border border-orange-200 rounded-md' key={index}>
                            <div>
                                <label className={`font-bold md:text-4xl ${item.status === "submitted" && "text-green-500"} ${item.status === "actively" && "text-blue-500"} ${item.status === "inactive" && "text-red-500"}`}>
                                    {item.status === "submitted" && "ส่งฟอร์มแล้ว"}
                                    {item.status === "actively" && "กำลังกรอกข้อมูลอยู่"}
                                    {item.status === "inactive" && "ไม่ได้ใช้งานฟอร์ม"}
                                </label>
                                <div className="flex gap-1 md:gap-4 flex-wrap">

                                    <div className="flex flex-col basis-[34%] md:basis-[6%]">
                                        <label>ชื่อจริง</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.firstName}</label>
                                    </div>

                                    <div className="flex flex-col basis-[34%] md:basis-[6%]">
                                        <label>นามสกุล</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.lastName}</label>
                                    </div>

                                    <div className="flex flex-col basis-[29%] md:basis-[6%]">
                                        <label>ชื่อเล่น</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.middleName}</label>
                                    </div>

                                    <div className="flex flex-col basis-[38%] md:basis-[6%]">
                                        <label className='min-w-26'>วันเดือนปีเกิด</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.birthday}</label>
                                    </div>


                                    <div className="flex flex-col basis-[20%] md:basis-[4%]">
                                        <label>เพศ</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.gender === "man" ? "ผู้ชาย" : "ผู้หญิง"}</label>
                                    </div>

                                    <div className="flex flex-col basis-[38%] md:basis-[6%]">
                                        <label>เบอร์โทรศัพท์</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.phoneNumber}</label>
                                    </div>

                                    <div className="flex flex-col basis-full md:basis-[14%]">
                                        <label>อีเมล</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.email}</label>
                                    </div>

                                    <div className="flex flex-col basis-[49%] md:basis-[6%]">
                                        <label>สัญชาติ</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.nationality}</label>
                                    </div>

                                    <div className="flex flex-col basis-[49%] md:basis-[6%]">
                                        <label className='min-w-30'>ภาษาที่ต้องการใช้</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.language}</label>
                                    </div>

                                    <div className="flex flex-col basis-full md:basis-[32%]">
                                        <label className="w-10">ที่อยู่</label>
                                        <label className="border py-1 px-2 rounded-md min-h-8.5">{item.address}</label>
                                    </div>
                                </div>
                                <div className='md:mt-2'>
                                    <label className="text-[20px] font-bold">ผู้ติดต่อกรณีฉุกเฉิน</label>
                                    <div className="flex gap-1 md:gap-4 flex-wrap">
                                        <div className="flex flex-col basis-[49%] md:basis-[6%]">
                                            <label>ชื่อ</label>
                                            <label className="border py-1 px-2 rounded-md min-h-8.5">{item.emergencyName}</label>
                                        </div>
                                        <div className="flex flex-col basis-[49%] md:basis-[6%]">
                                            <label>ความสัมพันธ์</label>
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