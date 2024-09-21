import React, { useContext, useEffect, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import TimeSelect from './component/timeselect';
import Nav from './component/nav';
import Menubar from './component/menubar';


function Test() {

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

  const frappeConfig = useContext(FrappeContext)
  const [crematoriumMeta, setCrematorium] = useState({})
  const [temples, setTemples] = useState([])
  const [furnace, setFurnaces] = useState([])
  const [selectedTemple, setSelectedTemple] = useState('');
  const [selectedFurnace, setSelectedFurnace] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');


  useEffect(() => {

    frappeConfig?.call.get('maechan.booking.doctype.crematorium.crematorium.get_meta').then(r => {
      // console.log(r)
      setCrematorium(r.message)
      const meta = r.message
      const fieldCrematory = meta.fields.find((f) => f.fieldname == 'crematory')
      if (fieldCrematory) {
        const t = fieldCrematory.options.split('\n')
        setTemples(t)
      }

      const fieldFurnace = meta.fields.find((f) => f.fieldname == 'furnace')
      if (fieldFurnace) {
        const t = fieldFurnace.options.split('\n')
        console.log('T', t)
        setFurnaces(t)
      }
    })
  }, [])

  const save = () => {

    frappeConfig?.db.createDoc('Crematorium', {
      crematory: 'test',
      crematorium_name: 't12'
    }).then((doc) => console.log(doc))
      .catch((error) => console.error(error));

  }

  const handleClear = () => {
    setSelectedTemple('');
    setSelectedFurnace('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

  return (
    <div>
      {/* nav */}
      <div className="flex flex-col pt-6 bg-white h-screen">
        <Nav></Nav>
        <div className="mt-6 w-full border border-zinc-120"></div>

        {/* munu bar */}
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

            {/* border  */}
            <div className="flex flex-col  pt-3.5 pr-4 pb-14 pl-4 mx-auto w-full font-bold bg-white rounded-md border border-solid border-zinc-300 max-md:pr-5 max-md:pb-24 max-md:mt-5 max-md:max-w-full">


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

              <div className="text-base font-bold mt-4 ml-4">ทำการจองเมรุฌาปนกิจ</div>

              <form className="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">เลือกวัด</label>
                <select value={selectedTemple}
                  onChange={(e) => setSelectedTemple(e.target.value)} id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                  {temples.map(t => (<option key={t} >{t}</option>))}
                </select>
              </form>

              <div className="text-[14px] font-bold mt-2 ml-4">ประเภทเตาเผา</div>

              <form className="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ประเภทเตาเผา</label>
                <select value={selectedFurnace}
                  onChange={(e) => setSelectedFurnace(e.target.value)} id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                  {furnace.map(t => (<option key={t} >{t}</option>))}
                </select>
              </form>

              <div className="text-[14px] font-bold mt-4 ml-4">วันที่</div>

              <div className="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                <div className="block text-[10px] font-medium dark:text-[#585858] pl-3">วันที่</div>
                <div className="flex items-center justify-between text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                  <input value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)} type="date" id="date" name="date" className="mt-1 block w-full text-base dark:bg-[#EEEEEE] dark:text-[#000]" />
                </div>
              </div>

              <div className="text-[14px] font-bold mt-4 ml-4">เวลาจอง</div>

              <div className="flex items-center  mt-2 ml-4">

                <TimeSelect selectedTime={selectedTime} setSelectedTime={setSelectedTime} />

              </div>

              <div className="flex flex-col  gap-3 sm:flex-row  mt-6 font-bold text-xs sm:text-sm ml-4">
                <button onClick={handleClear} className="flex items-center justify-center text-centerbg-[#EEEEEE] text-back rounded-md p-3 mx-2" style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}>
                  ล้างข้อมูล
                </button>

                <button onClick={() => handleNavigate('/booking')} className="flex items-center justify-center text-center  bg-[#225EC4] text-white rounded-md p-3 mx-2" style={{ width: "180px", height: "45px" }}>
                  ยืนยันข้อมูล
                </button>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}