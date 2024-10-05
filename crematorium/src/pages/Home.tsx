import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import TimeSelect from './component/timeselect';
import Nav from './component/nav';
import Menubar from './component/menubar';
import ModalProps from './component/modalProps'
import { FaCheckCircle } from 'react-icons/fa';
import Payment from '../image/paymant.jpg';



export default function HOME() {

  const frappeConfig = useContext(FrappeContext);
  const { file } = useContext(FrappeContext);

  // State management
  const [crematoriumMeta, setCrematorium] = useState({});
  const [provincesName, setProvincename] = useState([]);
  const [districtName, setDistrictname] = useState([]);
  const [cantonName, setCantonname] = useState([]);
  const [relevantName, setRelevant] = useState([]);
  const [temples, setTemples] = useState([]);
  const [furnace, setFurnaces] = useState([]);

  // input state 

  const [form, setForm] = useState({})

  const updateForm = (key: string, value: any) => {
    const newForm = { ...form, [key]: value }
    setForm(newForm)
  }

  const [selectedTime, setSelectedTime] = useState('');

  // const [selectedTemple, setSelectedTemple] = useState('');
  // const [selectedFurnace, setSelectedFurnace] = useState('');
  // const [selectedDate, setSelectedDate] = useState('');
  // const [username, setUsername] = useState('');
  // const [age, setAge] = useState('');
  // const [phone, setPhone] = useState('');
  // const [selectedProvince, setSelectedProvince] = useState('');
  // const [selectedDistrict, setSelectedDistrict] = useState('');
  // const [selectedCanton, setSelectedCanton] = useState('');
  // const [selectedRelationship, setSelectedRelationship] = useState('');
  // const [deathcertificate, setDeathcertificate] = useState('')

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const r = await frappeConfig?.call.get('maechan.booking.doctype.crematorium.crematorium.get_meta');
        setCrematorium(r.message);
        const meta = r.message;

        // Fetching province options
        const fieldProvince = meta.fields.find((f) => f.fieldname === 'province');
        if (fieldProvince) {
          const n = fieldProvince.options.split('\n');
          setProvincename(n);
        }

        // Fetching district options
        const fieldDistrict = meta.fields.find((f) => f.fieldname === 'district');
        if (fieldDistrict) {
          const n = fieldDistrict.options.split('\n');
          setDistrictname(n);
        }

        // Fetching canton options
        const fieldCanton = meta.fields.find((f) => f.fieldname === 'canton');
        if (fieldCanton) {
          const n = fieldCanton.options.split('\n');
          setCantonname(n);
        }

        // Fetching relevant options
        const fieldRelevant = meta.fields.find((f) => f.fieldname === 'relationship');
        if (fieldRelevant) {
          const n = fieldRelevant.options.split('\n');
          setRelevant(n);
        }

        // Fetching temple options
        const fieldCrematory = meta.fields.find((f) => f.fieldname === 'crematory');
        if (fieldCrematory) {
          const t = fieldCrematory.options.split('\n');
          setTemples(t);
        }

        // Fetching furnace options
        const fieldFurnace = meta.fields.find((f) => f.fieldname === 'furnace');
        if (fieldFurnace) {
          const t = fieldFurnace.options.split('\n');
          setFurnaces(t);
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchMetaData();
  }, [frappeConfig]);

  const handleSave = () => {
    frappeConfig?.db.createDoc('Crematorium', {
      ...form
    })
      .then((doc) => console.log(doc))
      .catch((error) => console.error(error));
    console.log('save')
    navigate('/booking');
  };

  const handleClear = () => {
    setSelectedTime('');
    setForm({})
  };


  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const STEP_ONE = 1;
  const [currentStep, setCurrentStep] = useState(STEP_ONE);

  const getBreadcrumbs = () => {
    const commonImg = 'https://cdn.builder.io/api/v1/image/assets/TEMP/3826b149906e5323de1ced14d72b5fc97e53c8a574c31c256ff965e8afabc112?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d';
    switch (currentStep) {
      case STEP_ONE:
        return [
          { img: commonImg },
          { name: 'Book Crematorium' },
        ];
      default:
        return [];
    }
  };

  const breadcrumbs = getBreadcrumbs();


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
                  <div className="grow shrink my-auto w-[80px]">หน้าหลัก</div>
                </div>
                <div onClick={() => handleNavigate('/history')} className="flex gap-3 px-2 mt-4 ml-2.5 text-black">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1990d6879800e468960528e5a22a3636c80362dda5f85af89045cd57271a0ade?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                    className="object-contain shrink-0 w-5 aspect-square" style={{ width: "24px" }}
                  />
                  <div className="my-auto">ประวัติ</div>
                </div>
              </div>
            </div>

            {/* border  */}
            <div className="flex flex-col pt-3.5 pr-4 pb-14 pl-4 mx-auto w-full font-bold bg-white rounded-md border border-solid border-zinc-300 max-md:pr-5 max-md:pb-24 max-md:mt-5 max-md:max-w-full">
              {/* <!-- Stepper Container --> */}
              <div data-hs-stepper="">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="mb-4">
                  <ol className="inline-flex items-center space-x-2">
                    {breadcrumbs.map((breadcrumb, index) => (
                      <li className="flex items-center" key={index}>
                        {index > 0 && (
                          <svg className="w-4 h-4 text-gray-400 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                        <a
                          href={breadcrumb.link || '#'}
                          className={`text-sm font-medium ${index === breadcrumbs.length - 1 ? 'text-black font-bold dark:text-black dark:font-bold' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'}`}
                          aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                        >
                          <span className="flex items-center">
                            {breadcrumb.img && <img src={breadcrumb.img} alt="Breadcrumb Icon" className="w-4 h-4 mr-1" style={{ width: "20px", height: "20px" }} />}
                            {breadcrumb.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                {/* End Breadcrumbs */}

                {/* Stepper Content */}
                <div className="mt-5 sm:mt-8">
                  {/* Dynamic Content Based on Current Step */}
                  <div style={{ display: currentStep === STEP_ONE ? 'block' : 'none' }}>
                    <div className="text-base font-bold mt-4 ml-4">ทำการจองเมรุฌาปนกิจ</div>

                    <form className="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                      <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">เลือกวัด</label>
                      <select value={form.crematory || ''}
                        onChange={(e) => updateForm('crematory', e.target.value)} id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                        {temples.map(t => (<option key={t} >{t}</option>))}
                      </select>
                    </form>

                    <div className="text-[14px] font-bold mt-2 ml-4">ประเภทเตาเผา</div>

                    <form className="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                      <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ประเภทเตาเผา</label>
                      <select value={form.furnace || ''}
                        onChange={(e) => updateForm('furnace', e.target.value)} id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                        {furnace.map(t => (<option key={t} >{t}</option>))}
                      </select>
                    </form>

                    <div className="text-[14px] font-bold mt-4 ml-4">วันที่</div>

                    <div className="w-[515px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 ml-4 mt-3.5">
                      <div className="block text-[10px] font-medium dark:text-[#585858] pl-3">วันที่</div>
                      <div className="flex items-center justify-between text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                        <input value={form.date || ''}
                          onChange={(e) => updateForm('date', e.target.value)} type="date" id="date" name="date" className="mt-1 block w-full text-base dark:bg-[#EEEEEE] dark:text-[#000]" />

                      </div>
                    </div>

                    <div className="text-[14px] font-bold mt-4 ml-4">เวลาจอง</div>

                    <div className="flex items-center  mt-2 ml-4">

                      <TimeSelect
                        selectedTime={selectedTime} 
                        setSelectedTime={(time) => {
                          setSelectedTime(time);    
                          updateForm('time', time); 
                        }}
                      />

                    </div>
                    <div className="mt-5 items-center gap-x-2">
                      <div className="flex justify-start ">

                        <button
                          onClick={handleClear}
                          className="flex items-center justify-center text-center bg-[#FFFFFF] text-black rounded-md p-3 mx-2"
                          style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}
                        >
                          ล้างข้อมูล
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex items-center justify-center text-center bg-blue-600 text-white rounded-md p-3 mx-2"
                          style={{ width: "180px", height: "45px" }}
                        >
                          ยืนยันข้อมูล
                        </button>

                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}


