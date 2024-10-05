import React, { useContext, useEffect, useState } from 'react'
import { useFrappeAuth, FrappeContext, useFrappeGetDocList } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';
import Nav from './component/nav';

interface CrematoriumDocument {
    [key: string]: any;
}

export default function HISTORY() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const { data, error, isValidating, mutate } = useFrappeGetDocList<CrematoriumDocument>(
        'Crematorium',
        {
            fields: ['*'],
            filters: [],
            limit_start: 0,
            limit: 10,
            orderBy: {
                field: 'creation',
                order: 'desc',
            },
            asDict: false,
        }
    );

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp + 'Z');
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${day}/${month}/${year}`;
    };


    if (error) {
        console.error("Error fetching documents:", error);
        return (
            <div className="text-red-600">
                <h2>Error fetching documents</h2>
                <p>{error.message || JSON.stringify(error)}</p>
            </div>
        );
    }

    if (data && data.length > 0) {
        return (

            <div>
                <div className="flex flex-col pt-6 bg-white h-screen">
                    <Nav></Nav>
                    <div className="mt-6 w-full border border-zinc-120"></div>

                    {/* munu bar */}
                    <div className="px-[82px]  mt-5 w-screen max-w-[1800px] max-md:max-w-full">
                        <div className="flex  gap-4 max-md:flex-col ">
                            <div className="flex flex-col  w-[21%]  max-md:w-48 ">
                                <div className="flex flex-col  w-full text-sm font-bold whitespace-nowrap max-md:mt-4 ">
                                    <div onClick={() => handleNavigate('/home')} className="flex gap-3 px-2 ml-2.5 text-black">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/17e5395adb75fd8542f16d22deff8774e86e1eb5a190d8bd049c5fcccf4f7f30?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                            className="object-contain shrink-0 w-5 aspect-square" style={{ width: "24px" }}
                                        />
                                        <div className="my-auto">หน้าหลัก</div>
                                    </div>

                                    <div onClick={() => handleNavigate('/history')} className="flex gap-3 px-4 py-3 mt-4 text-white bg-blue-700 rounded-xl">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a160c4bafba445c2e57b052a0f4a9d5c4be4928f3fd2335762f4595141429d64?placeholderIfAbsent=true&apiKey=bf0b86e0707a42aa8acd2aa478f17610"
                                            className="object-contain shrink-0 w-5 aspect-square" style={{ width: "24px" }}
                                        />
                                        <div className="grow shrink my-auto w-[80px]">ประวัติ</div>
                                    </div>

                                </div>
                            </div>

                            {/* border  */}
                            <div className="flex flex-col  pt-3.5 pr-4 pb-14 pl-4 mx-auto w-full font-bold bg-white rounded-md border border-solid border-zinc-300 max-md:pr-5 max-md:pb-24 max-md:mt-5 max-md:max-w-full">


                                <div className="flex gap-3 ml-4 mt-2 items-center self-start text-xs text-black text-opacity-20">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bb901bb268f738ad59c0a5677b3f53a3bfb65ffc65e65bd17cb6aa7eec34130?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d" style={{ width: "20px" }}
                                        className="object-contain shrink-0 self-stretch w-5 aspect-square"
                                    />
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2e3e8419865fb7949956f7e47de8956adcb49c205f652686a2963c2711b27c3?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                        className="object-contain shrink-0 self-stretch my-auto aspect-[0.54] w-[7px]"
                                    />
                                    <div className="self-stretch my-auto basis-auto">
                                        History
                                    </div>
                                </div>
                                {/* list process */}




                                <div className="text-[18px] font-bold mt-4 ml-4">ประวัติทำรายการ</div>


                                <div className="flex flex-wrap mr-36 ml-4 px-6 text-[12px] justify-between self-stretch p-6 mt-5 whitespace-nowrap rounded-xl bg-zinc-100 bg-opacity-80 text-zinc-600 max-md:px-6 max-md:max-w-full">
                                    <div className="flex gap-10 flex-1">
                                        <div className="font-medium">ลำดับ</div>
                                        <div className="font-medium">วันที่ทำรายการ</div>
                                        <div className="font-medium">สถานะ</div>
                                    </div>
                                    <div className="flex  gap-3 ml-36">
                                        <div>คำขอ</div>
                                        <div>เอกสารแนบ</div>
                                        <div>หลักฐานการโอน</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {data.map((crematorium, index) => (
                                        <div
                                            key={`${crematorium.id}-${index}`}
                                            className="flex flex-wrap mr-36 ml-4 px-6 text-[12px] justify-between self-stretch p-6 whitespace-nowrap rounded-xl text-zinc-600 max-md:px-6 max-md:max-w-full"
                                        >
                                            <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                                                <div>{index + 1}</div>
                                                {/* Format crematorium[22] to display only date */}
                                                <div>{crematorium[2] ? formatDate(crematorium[2]) : 'Date Not Available'}</div>
                                                <div className={`${crematorium.status ? 'text-green-600' : 'text-red-600'}`}>
                                                    {crematorium[28]}
                                                </div>
                                            </div>
                                            <div className="flex gap-[45px] mr-7">
                                                <img
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/137d2199165f7c4c97e97844916fbd7771e08903d41e8c9fd6084a00ab18ece3?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                                    alt="Icon 1"
                                                    className="w-[25px] aspect-[1.06]"
                                                />
                                                <img
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/42ab84ac8b073b2f2b2efc92fc4012a7c7060a87e3b3d3e8d35b47e3c9b7f796?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                                    alt="Icon 2"
                                                    className="w-[25px] aspect-[1.06]"
                                                />
                                                <img
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                                    alt="Icon 3"
                                                    className="w-[25px] aspect-[1.06]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }


}