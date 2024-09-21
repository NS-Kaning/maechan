import React, { useContext, useEffect, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';


export default function Menubar() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="px-[82px]  mt-5 w-screen max-w-[1800px] max-md:max-w-full">
            <div className="flex  gap-4 max-md:flex-col ">
                <div className="flex flex-col  w-[21%]  max-md:w-48 ">
                    <div className="flex flex-col  w-full text-sm font-bold whitespace-nowrap max-md:mt-4 ">
                        <div onClick={() => handleNavigate('/home')} className="flex gap-3 px-4 py-3  text-white bg-blue-700 rounded-xl">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/446a560b0f1e789d60687ba009012a4c5960ccfec7761b3a2d881c8ae4bf5f35?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                className="object-contain shrink-0 w-5 aspect-square" style={{ width: "24px" }}
                            />
                            <div className="grow shrink my-auto w-[80px]">HOME</div>
                        </div>
                        <div onClick={() => handleNavigate('/history')} className="flex gap-3 px-2 mt-4 ml-2.5 text-black">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1990d6879800e468960528e5a22a3636c80362dda5f85af89045cd57271a0ade?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                className="object-contain shrink-0 w-5 aspect-square" style={{ width: "24px" }}
                            />
                            <div className="my-auto">HISTORY</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}
