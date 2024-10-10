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
    console.log(data);

    const openInNewTab = (name: string) => {
        window.open(`${window.location.origin}/print/${name}`);
    };

    const openFile = (fileUrl) => {
        // Open the file in a new tab or trigger a download
        window.open(fileUrl, '_blank');
    };


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

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

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
                                        <div>หลักฐานการโอน</div>
                                        <div>เอกสารแนบ</div>
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
                                                    {crematorium[27]}
                                                </div>
                                            </div>
                                            <div className="flex gap-[45px] mr-7">
                                                <img onClick={() => openInNewTab(crematorium[0])}
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/137d2199165f7c4c97e97844916fbd7771e08903d41e8c9fd6084a00ab18ece3?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                                    alt="Icon 1"
                                                    className="w-[25px] aspect-[1.06] cursor-pointer"
                                                />
                                                <img onClick={() => openFile(crematorium[26])}
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa856e2e2e09a6d6cb1b65fe5cc75f690c2f506becc22c00978eb13a9642d5b4?placeholderIfAbsent=true&apiKey=bf0b86e0707a42aa8acd2aa478f17610"
                                                    alt="Icon 2"
                                                    className="w-[25px] aspect-[1.06] cursor-pointer"
                                                />
                                                {/* dropdown */}
                                                <div className="relative">
                                                    <img
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                                        alt="Icon 3"
                                                        className="w-[25px] aspect-[1.06] cursor-pointer"
                                                        onClick={() => toggleDropdown(index)}
                                                    />
                                                    {openDropdownIndex === index && (
                                                        <div className="absolute right-0 mt-2 min-w-[200px] max-w-[300px] bg-white border border-gray-300 rounded shadow-lg z-10">
                                                            <ul className="py-1">
                                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => openFile(crematorium[23])}>สําเนาใบมรณะบัตร</li>
                                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => openFile(crematorium[24])}>สําเนาทะเบียนบ้าน (ผู้ตาย)</li>
                                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => openFile(crematorium[25])}>สําเนาบัตรประจําตัวประชาชน (ผู้ยื่นคําร้อง)</li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
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