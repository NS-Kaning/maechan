import React, { useContext, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';


function Test() {d

    const frappeConfig = useContext(FrappeContext)

    const save = () => {

        frappeConfig?.db.createDoc('Crematorium', {
            crematory: 'test',
            crematorium_name: 't12'
        }).then((doc) => console.log(doc))
            .catch((error) => console.error(error));

    }
    return (<div>ADD DATA <button onClick={save}>SAVE</button></div>)
}


export default function HOME() {
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


            <div className="flex flex-col  pt-3.5 pr-4 pb-14 pl-4 mx-auto w-full font-bold bg-white rounded-md border border-solid border-zinc-300 max-md:pr-5 max-md:pb-24 max-md:mt-5 max-md:max-w-full">

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
              </div>


              {/* list process */}

              <div className="text-base font-bold mt-4 ml-4">BOOKING A CREMATORIUM</div>

              {/* <form class="max-w-sm mb-4 bg-white dark:bg-gray-800 rounded-lg p-4">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select an option
              </label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a country</option>
                <option value="US">United States</option>

              </select>
            </form> */}

              <form class="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                <label class="block text-[10px] font-medium dark:text-[#585858] pl-3">Select temple</label>
                <select id="countries" class="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                  <option selected >Wat Kasa</option>
                  <option value="US" >United States</option>
                </select>
              </form>

              <div className="text-[14px] font-bold mt-2 ml-4">Type of furnace</div>

              <form class="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                <label class="block text-[10px] font-medium dark:text-[#585858] pl-3">Type of furnace</label>
                <select id="countries" class="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                  <option selected >Pollution-free furnace</option>
                  <option value="US" >United States</option>
                </select>
              </form>

              <div className="text-[14px] font-bold mt-4 ml-4">Date</div>

              <div class="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                <div class="block text-[10px] font-medium dark:text-[#585858] pl-3">Date</div>
                <div class="flex items-center justify-between text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                  <div class="flex-grow">13/04/2024</div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8467f280357d0b2ca837f386e93df54352b232312027ea6a8f9d4248e6dbce45?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                    class="w-6 h-6 ml-2"
                    alt="Icon">
                  </img>
                </div>
              </div>
              <div className="text-[14px] font-bold mt-4 ml-4">Time</div>

              <div className="flex items-center  mt-2 ml-4">
                <div className="flex items-center justify-center text-center  bg-[#E51C23] text-white  rounded-md mr-4" style={{ width: "161px", height: "55px" }}>
                  12:00 - 01:00 PM
                </div>

                <div className="flex items-center justify-center text-center bg-[#F9A825] text-white  rounded-md mr-4 " style={{ width: "161px", height: "55px" }}>
                  01:00 - 02:00 PM
                </div>

                <div className="flex items-center justify-center text-center bg-[#0A8F08] text-white  rounded-md " style={{ width: "161px", height: "55px" }}>
                  02:00 - 03:00 PM
                </div>
              </div>

              <div className="flex flex-col  gap-3 sm:flex-row  mt-6 font-bold text-xs sm:text-sm ml-4">
                <div className="flex items-center justify-center text-centerbg-[#EEEEEE] text-back rounded-md p-3 mx-2" style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}>
                Clear Data
                </div>

                <div className="flex items-center justify-center text-center  bg-[#225EC4] text-white rounded-md p-3 mx-2" style={{ width: "180px", height: "45px" }}>
                Confirm to Forward
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}