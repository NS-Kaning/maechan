import React, { useContext, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';

export default function OTP() {
    return (
      <div>
        <div className="flex flex-col pt-6 bg-white h-screen">
          <div className="flex justify-between items-center px-20 w-fullmax-h-6">
            <div className="flex items-center gap-10">
              <div className="text-base font-bold">HOME</div>
              <div className="text-sm ">HISTORY</div>
            </div>
            <div className="text-sm">For Officer</div>
          </div>
  
          <div className="mt-6 w-full border border-zinc-120"></div>
  
          {/* nav */}
  
  
          <div className="flex flex-col items-center justify-center bg-zinc-100 bg-opacity-100" style={{ width: "100%", height: "100%" }}>
            <div className="flex items-center justify-center mt-[-150px]">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec3563c7b20b9a14cd2d6e8357d8a1c69fbc5493dced1c53803add94aabe7934?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d" style={{ width: "60px", height: "50px" }}
                className="aspect-square" alt="" />
            </div>
  
  
            <div className="text-center text-sm font-bold text-black pt-3">
              LOGIN TO BOOK CREMATORIUM
  
              <div className="text-center text-xs font-medium text-black pt-3">
                Enter the OTP we just sent you
              </div>
  
  
              {/* <div className="text-center text-sm font-bold text-black mt-5">
              Confirm OTP
  
              <div className="text-center text-sm font-[390] text-black mt-2">
                Enter the OTP we just sent you */}
  
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
  
  
  
  
  
                {/* <div className="flex flex-col flex-grow px-9 py-11 mt-6 bg-white rounded-xl">
  
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 mt-4 flex items-center ps-3.5 pointer-events-none">
                      <div className="text-black text-opacity-50 font-[500] text-sm">OTP</div>
                    </div>
                    <input
                      type="text"
                      id="codeid-input"
                      aria-describedby="helper-text-explanation"
                      className="flex flex-col justify-center px-16 py-2.5 mt-4 rounded-md bg-gray-200 bg-opacity-70"
                      style={{ paddingLeft: '45px' }}
                    />
                  </div> */}
  
  
  
                <div className="flex justify-end mt-1 text-[10px] font-[400] text-black text-opacity-50 ">
                  Resent OTP
                </div>
  
                <div className="justify-center px-16 py-2.5 mt-2.5 text-sm text-white bg-black rounded-md max-md:pr-7 max-md:pl-6">
                  CONFIRM
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
  
  
    );
  }
  