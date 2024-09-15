import React, { useContext, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';


export default function Doc() {
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


                        <div className="flex flex-col pr-6 pt-3.5  pb-14 pl-4 mx-auto w-full font-bold bg-white rounded-md border border-solid border-zinc-300 max-md:pr-5 max-md:pb-24 max-md:mt-5 max-md:max-w-full">

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

                            <div className="flex flex-col  lg:flex-row items-center lg:mt-4 md:mt-4 sm:mt-4">
                                <div className="text-xl ml-4 font-bold">ใบคำขออนุญาต</div>
                                <div className="text-base font-bold flex-1 min-w-[150px]  lg:ml-[215px] mt-2 sm:mt-0">เลขที่ใบคำขออนุญาต 0013487230908</div>

                                <div className="flex gap-2 mt-2.5 lg:ml-60 md:mt-[20px] md:mx-1 lg:mt-0 sm:mt-4">
                                    <div className="flex items-center p-2 bg-[#EEEEEE] rounded-md">
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/00b224098ef5d4ac611017a1bfe803154c835825b0007755a375d5465e9ca403?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                            className="object-contain w-6"
                                            alt="Print Icon" />
                                        <div className="text-xs sm:text-sm font-bold ml-2">Print</div>
                                    </div>
                                    <div className="flex items-center p-2 bg-[#EEEEEE] rounded-md">
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d4836f77bde791f267ce31a9a3d4e624482e50e8881590e3e9f038ae18dc299?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                            className="object-contain w-6"
                                            alt="Save Icon" />
                                        <div className="text-xs sm:text-sm font-bold ml-2">Save</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap-reverse justify-center mx-4 px-16 py-6 mt-4 text-sm font-bold text-white  rounded-xl bg-zinc-100 bg-opacity-80 max-md:px-5 max-md:max-w-full">
                                <div className="flex flex-wrap gap-12 max-w-full w-[487px]">

                                    <img
                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcd9eafbf033e5558caf46d578c8ae089c3e67a1bdf519635600d928d6c937fd?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                        className="object-contain grow shrink-0 aspect-[0.76] basis-0 w-fit"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mx-auto gap-3 sm:flex-row justify-center mt-6 font-bold text-xs sm:text-sm">
                                <div className="flex items-center justify-center text-center text-black bg-white rounded-md p-3 mx-2" style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}>
                                    เสร็จสิ้น
                                </div>

                                <div className="flex items-center justify-center text-center text-black bg-[#EEEEEE] rounded-md p-3 mx-2" style={{ width: "180px", height: "45px" }}>
                                    ดูประวัติการทำรายการ
                                </div>
                            </div>


                        </div>

                    </div>



                </div>

            </div>
        </div>
    );
}