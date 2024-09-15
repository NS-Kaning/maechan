import React, { useContext, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';


export default function Line() {
    return (
      <div>
        <div className="flex flex-col pt-6 bg-white h-screen">
          <div className="flex justify-between items-center px-20 w-full max-h-6">
            <div className="flex items-center gap-10">
              <div className="text-base font-bold">HOME</div>
              <div className="text-sm ">HISTORY</div>
            </div>
            <div className="text-sm">For Officer</div>
          </div>
  
          <div className="mt-6 w-full border border-zinc-120"></div>
  
          <div className="flex flex-col items-center justify-center bg-zinc-100 bg-opacity-100" style={{ width: "100%", height: "100%" }}>
            <div className="flex items-center justify-center mt-[-80px]">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6af0b2fc646d407ec3b95c5514da7850482402df51d346618df500b9fee0b7d7?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                style={{ width: "65px" }}
                className="aspect-square" alt="" />
            </div>
  
            <div className="text-center text-sm font-bold mt-3 text-black">
              LOGIN TO BOOK CREMATORIUM
  
              <div className="flex flex-col self-stretch px-9 py-11 mt-6 bg-white rounded-xl">
  
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-4 pointer-events-none">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b961fc12893165df6e5aa85bebc932ef8ead11595d4ef16d8266eae41c4a1c3d?"
                    alt="User Icon"
                  />
                </div>
                <input
                  type="text"
                  id="codeid-input"
                  aria-describedby="helper-text-explanation"
                  className="flex flex-col justify-center px-7 py-2.5 rounded-md bg-gray-200 bg-opacity-70"
                  style={{ paddingLeft: '40px' }}
                  placeholder="Enter Code ID" />
              </div>
  
              <div className="relative mt-5">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-4 pointer-events-none">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c1cb0f599709636b2849b0ee3d1603d2c3071eedcb8a34536e7cc327e1591bf?"
                    alt="Phone Icon"
                  />
                </div>
                <input
                  type="password"
                  id="phone-input"
                  aria-describedby="helper-text-explanation"
                  className="flex flex-col justify-center px-7 py-2.5 rounded-md bg-gray-200 bg-opacity-70"
                  style={{ paddingLeft: '40px' }}
                  placeholder="Enter Password" />
              </div>
              
              <div className="justify-center px-16 py-2.5 mt-6 text-sm text-white bg-black rounded-md max-md:pr-7 max-md:pl-6">
                Confirm to get OTP
              </div>
  
              <div className="justify-center mt-1.5 text-sm font-[390] text-black">
                or
              </div>
              <div className="justify-center px-16 py-2.5 mt-1.5 text-sm text-white bg-[#0A8F08] rounded-md max-md:pr-7 max-md:pl-6">
                Login with LINE
              </div>
            </div>
          </div>
        </div>
      </div>
      </div >
    );
  }