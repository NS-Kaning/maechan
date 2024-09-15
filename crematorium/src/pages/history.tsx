import React, { useContext, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';


export default function HISTORY() {
    return (

        <div>
            <div className="flex flex-col pt-6 bg-white h-screen">
                <div className="flex justify-between items-center px-20 w-full max-h-6">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6af0b2fc646d407ec3b95c5514da7850482402df51d346618df500b9fee0b7d7?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                            className="object-contain shrink-0 w-10"
                            alt="Book Crematorium Logo" />
                        <div className="text-base font-bold">BOOK CREMATORIUM</div>
                    </div>
                    <div className="text-sm ">Natapipan kong</div>
                </div>

                <div className="mt-6 w-full border border-zinc-120"></div>

                {/* nav */}

                <div className="px-[82px]  mt-5 w-screen max-w-[1800px] max-md:max-w-full">
                    <div className="flex  gap-4 max-md:flex-col ">
                        <div className="flex flex-col  w-[21%]  max-md:w-48 ">
                            <div className="flex flex-col  w-full text-sm font-bold whitespace-nowrap max-md:mt-4 ">
                                <div className="flex gap-3 px-4 py-3  text-white bg-blue-700 rounded-xl">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/446a560b0f1e789d60687ba009012a4c5960ccfec7761b3a2d881c8ae4bf5f35?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                        className="object-contain shrink-0 w-5 aspect-square" style={{ width: "24px" }}
                                    />
                                    <div className="grow shrink my-auto w-[80px]">HOME</div>
                                </div>
                                <div className="flex gap-3 px-2 mt-4 ml-2.5 text-black">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1990d6879800e468960528e5a22a3636c80362dda5f85af89045cd57271a0ade?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                        className="object-contain shrink-0 w-5 aspect-square" style={{ width: "24px" }}
                                    />
                                    <div className="my-auto">HISTORY</div>
                                </div>
                            </div>
                        </div>

                        {/* munu bar */}


                        <div className="flex flex-col pr-4 pt-3.5  pb-14 pl-4 mx-auto w-full font-bold bg-white rounded-md border border-solid border-zinc-300 max-md:pr-5 max-md:pb-24 max-md:mt-5 max-md:max-w-full">

                            {/* border  */}

                            <div className="flex gap-3 ml-4 mt-2 items-center self-start text-xs text-black text-opacity-20">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3826b149906e5323de1ced14d72b5fc97e53c8a574c31c256ff965e8afabc112?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d" style={{ width: "20px" }}
                                    className="object-contain shrink-0 self-stretch w-5 aspect-square"
                                />
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2e3e8419865fb7949956f7e47de8956adcb49c205f652686a2963c2711b27c3?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                    className="object-contain shrink-0 self-stretch my-auto aspect-[0.54] w-[7px]"
                                />
                                <div className="self-stretch my-auto basis-auto">
                                    Book Crematorium
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2e3e8419865fb7949956f7e47de8956adcb49c205f652686a2963c2711b27c3?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                    className="object-contain shrink-0 self-stretch my-auto aspect-[0.54] w-[7px]"
                                />
                                <div className="self-stretch my-auto basis-auto">
                                    คำขออนุญาตฌาปณกิจศพ
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2e3e8419865fb7949956f7e47de8956adcb49c205f652686a2963c2711b27c3?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                    className="object-contain shrink-0 self-stretch my-auto aspect-[0.54] w-[7px]"
                                />
                                <div className="self-stretch my-auto text-black">
                                    Request Form
                                </div>
                            </div>

                            {/* list process */}

                            


                            <div className="text-[14px] font-bold mt-4 ml-4">ข้อมูลผู้ยื่นคำขอ</div>

                            
                            <div className="flex flex-wrap mr-36 ml-4 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5 whitespace-nowrap rounded-xl bg-zinc-100 bg-opacity-80 text-zinc-600 max-md:px-6 max-md:max-w-full">
                                <div className="flex  gap-12">
                                    <div>ลำดับ</div>
                                    <div>รายการ</div>
                                </div>
                                <div>ไฟล์เอกสาร</div>
                            </div>

                            <div className="flex flex-wrap mr-36 ml-4 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5 whitespace-nowrap rounded-xl  text-zinc-600 max-md:px-6 max-md:max-w-full">
                                <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                                    <div>1</div>
                                    <div>สําเนาใบมรณะบัตร</div>
                                </div>
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                    alt="" className="w-[24px] aspect-[1.06]" />
                            </div>

                            <div className="flex flex-wrap mr-36 pr-6 ml-4 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5  rounded-xl bg-zinc-100 bg-opacity-80 text-zinc-600 max-md:px-6 max-md:max-w-50">
                                <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                                    <div>2</div>
                                    <div>สําเนาทะเบียนบ้าน (ผู้ตาย)</div>
                                </div>
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                    alt="" className="w-[24px] aspect-[1.06]" />
                            </div>

                            <div className="flex flex-wrap mr-36 ml-4 pr-6 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5  text-zinc-600 max-md:px-6  max-md:max-w-full">
                                <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                                    <div>3</div>
                                    <div>สําเนาบัตรประจําตัวประชาชน (ผู้ยื่นคําร้อง)</div>
                                </div>
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                    alt="" className="w-[24px] aspect-[1.06]" />
                            </div>


                            <div className="flex justify-center self-center px-16 py-4 mt-8 max-w-full text-sm font-bold text-white whitespace-nowrap bg-blue-700 rounded-xl w-[150px] max-md:px-8">
                                CONFIRM
                            </div>









                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
}