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

  // State management
  const [crematoriumMeta, setCrematorium] = useState({});
  const [provincesName, setProvincename] = useState([]);
  const [districtName, setDistrictname] = useState([]);
  const [cantonName, setCantonname] = useState([]);
  const [relevantName, setRelevant] = useState([]);
  const [temples, setTemples] = useState([]);
  const [furnace, setFurnaces] = useState([]);

  // input state 
  const [selectedTemple, setSelectedTemple] = useState('');
  const [selectedFurnace, setSelectedFurnace] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCanton, setSelectedCanton] = useState('');
  const [selectedRelationship, setSelectedRelationship] = useState('');

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

  const save = () => {
    // frappeConfig?.db.createDoc('Crematorium', {
    //   crematory: selectedTemple,
    //   furnace: selectedFurnace,
    //   date: selectedDate,
    //   time: selectedTime,
    //   username,
    //   age,
    //   phone,
    //   province: selectedProvince,
    //   district: selectedDistrict,
    //   canton: selectedCanton,
    //   relationship: selectedRelationship,
    // })
    //   .then((doc) => console.log(doc))
    //   .catch((error) => console.error(error));
    // console.log('save')
    setIsModalOpen(false);
    navigate('/tranfer');
  };

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

  const STEP_ONE = 1;
  const STEP_TWO = 2;
  const STEP_THREE = 3;

  const [currentStep, setCurrentStep] = useState(STEP_ONE);
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showAlertCard, setShowAlertCard] = useState(false);

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, STEP_THREE));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, STEP_ONE));
  };

  const getBreadcrumbs = () => {
    const commonImg = 'https://cdn.builder.io/api/v1/image/assets/TEMP/3826b149906e5323de1ced14d72b5fc97e53c8a574c31c256ff965e8afabc112?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d';
    switch (currentStep) {
      case STEP_ONE:
        return [
          { img: commonImg },
          { name: 'Book Crematorium' },
        ];
      case STEP_TWO:
        return [
          { img: commonImg },
          { name: 'Book Crematorium' },
          { name: 'คำขออนุญาตฌาปณกิจศพ' },
        ];
      case STEP_THREE:
        return [
          { img: commonImg },
          { name: 'Book Crematorium' },
          { name: 'คำขออนุญาตฌาปณกิจศพ' },
          { name: 'การชำระเงิน' },
        ];
      default:
        return [];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  useEffect(() => {
    if (currentStep === 3) {
      setShowPopup(true);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setShowAlertCard(true); // Show alert card when time runs out
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (showAlertCard) {
      const timeout = setTimeout(() => {
        window.location.reload(); 
      }, 1000); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [showAlertCard]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const fileInputRef1 = useRef<HTMLInputElement | null>(null); // สำหรับเอกสารที่ 1
  const fileInputRef2 = useRef<HTMLInputElement | null>(null); // สำหรับเอกสารที่ 2
  const fileInputRef3 = useRef<HTMLInputElement | null>(null); // สำหรับเอกสารที่ 3

  const [isUploaded1, setIsUploaded1] = useState(false); // สถานะการอัปโหลดไฟล์สำหรับเอกสารที่ 1
  const [isUploaded2, setIsUploaded2] = useState(false); // สถานะการอัปโหลดไฟล์สำหรับเอกสารที่ 2
  const [isUploaded3, setIsUploaded3] = useState(false); // สถานะการอัปโหลดไฟล์สำหรับเอกสารที่ 3

  const handleImageClick = (fileInputRef: React.RefObject<HTMLInputElement>) => {
    fileInputRef.current?.click(); // เปิด dialog ของไฟล์เมื่อคลิกที่รูปภาพ
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log('Uploaded file:', file);
      setIsUploaded(true); // อัปเดตสถานะเมื่ออัปโหลดสำเร็จ
    }
  };

  const images = [
    {
      backgroundSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8eef06727fe2a410430fc8851ffcb79d64acebb4827e6c762b491d72c4b395c?placeholderIfAbsent=true&apiKey=bf0b86e0707a42aa8acd2aa478f17610",
      overlaySrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/13fdb75c22fce7f7b14ea4e3a47c7a8804bbc314346786311fcc7ed89fc068c7?placeholderIfAbsent=true&apiKey=bf0b86e0707a42aa8acd2aa478f17610",
      overlayAlt: "Overlay image description"
    },
    // Add more image objects as needed
  ];

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
                  </div>

                  <div style={{ display: currentStep === STEP_TWO ? 'block' : 'none' }}>
                    <div className="text-[14px] font-bold mt-4 ml-4">ข้อมูลผู้ยื่นคำขอ</div>

                    <div className="flex flex-wrap gap-4 mt-3 ml-4">

                      <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ชื่อ-สกุล</label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                          placeholder="กรอกชื่อ-สกุล"

                        />
                      </div>


                      <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">อายุ</label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                          placeholder="กรอกอายุ"
                        />
                      </div>


                      <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">เบอร์โทรศัพท์</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                          placeholder="กรอกเบอร์โทรศัพท์"
                        />
                      </div>
                    </div>

                    <div className="text-[14px] font-bold mt-4 ml-4">ที่อยู่ผู้ขอยื่น</div>

                    <div className="flex flex-wrap gap-4 mt-3 ml-4">
                      <form className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">จังหวัด</label>
                        <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}
                          id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                          {provincesName.map((n, index) => (
                            <option key={`${n}-${index}`}>{n}</option>
                          ))}
                        </select>
                      </form>

                      <form className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">อำเภอ</label>
                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}
                          id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                          {districtName.map((n, index) => (
                            <option key={`${n}-${index}`}>{n}</option>
                          ))}
                          {/* {districtName.map(n => (<option key={n} >{n}</option>))} */}
                        </select>
                      </form>

                      <form className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ตำบล</label>
                        <select value={selectedCanton} onChange={(e) => setSelectedCanton(e.target.value)}
                          id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                          {cantonName.map((n, index) => (
                            <option key={`${n}-${index}`}>{n}</option>
                          ))}
                          {/* {cantonName.map(n => (<option key={n} >{n}</option>))} */}
                        </select>
                      </form>

                    </div>
                    <div className="text-[14px] font-bold mt-4 ml-4">ความเกี่ยวข้องกับผู้ตาย</div>

                    <div className="flex flex-wrap gap-4 mt-3 ml-4">
                      <form className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ความเกี่ยวข้องกับผู้ตาย</label>
                        <select value={selectedRelationship} onChange={(e) => setSelectedRelationship(e.target.value)}
                          id="countries" className="text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                          {relevantName.map((n, index) => (
                            <option key={`${n}-${index}`}>{n}</option>
                          ))}
                          {/* {relevantName.map(n => (<option key={n} >{n}</option>))} */}
                        </select>

                      </form>

                    </div>
                    <div className="text-[14px] font-bold mt-4 ml-4">เอกสารเเนบ</div>

                    <div className="flex flex-wrap mr-32 ml-4 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5 whitespace-nowrap rounded-xl bg-zinc-100 bg-opacity-80 text-zinc-600 max-md:px-6 max-md:max-w-full">
                      <div className="flex  gap-12">
                        <div>ลำดับ</div>
                        <div>รายการ</div>
                      </div>
                      <div>ไฟล์เอกสาร</div>
                    </div>

                    <div className="flex flex-wrap mr-32 ml-4 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5 whitespace-nowrap rounded-xl text-zinc-600 max-md:px-6 max-md:max-w-full">
                      <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                        <div>1</div>
                        <div>สำเนาใบมรณะบัตร</div>
                      </div>

                      {isUploaded1 ? (
                        <FaCheckCircle className="w-[20px] h-[20px] text-green-500" /> // ไอคอนติ๊กถูกสีเขียว
                      ) : (
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                          alt="Click to upload"
                          className="w-[24px] aspect-[1.06] cursor-pointer"
                          onClick={() => handleImageClick(fileInputRef1)} // เรียกใช้งาน handleImageClick พร้อม ref
                        />
                      )}

                      <input
                        type="file"
                        ref={fileInputRef1}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setIsUploaded1)}
                      />
                    </div>

                    {/* ส่วนสำหรับเอกสารเพิ่มเติม */}
                    <div className="flex flex-wrap mr-32 pr-6 ml-4 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5 rounded-xl bg-zinc-100 bg-opacity-80 text-zinc-600 max-md:px-6 max-md:max-w-50">
                      <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                        <div>2</div>
                        <div>สำเนาทะเบียนบ้าน (ผู้ตาย)</div>
                      </div>

                      {isUploaded2 ? (
                        <FaCheckCircle className="w-[20px] h-[20px] text-green-500" />
                      ) : (
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                          alt="Click to upload"
                          className="w-[24px] aspect-[1.06] cursor-pointer"
                          onClick={() => handleImageClick(fileInputRef2)}
                        />
                      )}

                      <input
                        type="file"
                        ref={fileInputRef2}
                        className="hidden"
                        accept="application/pdf,image/*"
                        onChange={(e) => handleFileChange(e, setIsUploaded2)}
                      />
                    </div>

                    <div className="flex flex-wrap mr-32 ml-4 pr-6 px-6 text-[12px] justify-between self-stretch p-6 mt-3.5 text-zinc-600 max-md:px-6 max-md:max-w-full">
                      <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                        <div>3</div>
                        <div>สำเนาบัตรประจำตัวประชาชน (ผู้ยื่นคำร้อง)</div>
                      </div>

                      {isUploaded3 ? (
                        <FaCheckCircle className="w-[20px] h-[20px] text-green-500" />
                      ) : (
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                          alt="Click to upload"
                          className="w-[24px] aspect-[1.06] cursor-pointer"
                          onClick={() => handleImageClick(fileInputRef3)}
                        />
                      )}

                      <input
                        type="file"
                        ref={fileInputRef3}
                        className="hidden"
                        accept="application/pdf,image/*"
                        onChange={(e) => handleFileChange(e, setIsUploaded3)}
                      />
                    </div>

                    <div className="flex flex-col mx-auto sm:flex-row justify-center mt-10 font-bold text-xs sm:text-sm">
                      <button
                        onClick={() => setIsModalOpen(true)} // Open modal when clicked
                        className="flex items-center justify-center text-center bg-[#225EC4] text-white rounded-md p-3 mx-2"
                        style={{ width: "180px", height: "45px" }}
                      >
                        ยืนยัน
                      </button>

                    </div>
                  </div>

                  <div style={{ display: currentStep === STEP_THREE ? 'block' : 'none' }}>
                    <div className="text-base font-bold mt-4 ml-4">แจ้งหลักฐานการชำระเงิน</div>
                    <div className="text-sm font-semibold mt-3   ml-4">ข้อมูลการชำระเงิน</div>

                    <div className="flex flex-wrap mr-32 pr-6 ml-4 px-6 text-[13px] justify-between self-stretch p-6 mt-4  rounded-xl bg-zinc-100 bg-opacity-80 text-black max-md:px-6 max-md:max-w-50">
                      <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                        <div>อัพโหลดหลักฐานการชำระเงิน</div>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                        alt="" className="w-[24px] aspect-[1.06]" />
                    </div>

                    <div className="text-sm font-semibold mt-3 ml-4">จำนวนยอดที่ชำระ</div>

                    <div className="flex flex-wrap gap-4 mt-3 ml-4">
                      <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <div className="block text-[10px] font-medium dark:text-[#585858] pl-2">จำนวน</div>
                        <div className="flex items-center justify-between text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                          <div className="flex-grow">1500</div>

                        </div>
                      </div>

                      <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <div className="block text-[10px] font-medium dark:text-[#585858] pl-3">วันที่</div>
                        <div className="flex items-center justify-between text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                          <div className="flex-grow">13/04/2024</div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8467f280357d0b2ca837f386e93df54352b232312027ea6a8f9d4248e6dbce45?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                            className="w-6 h-6 ml-2"
                            alt="Icon">
                          </img>
                        </div>
                      </div>

                      <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                        <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">เวลา</label>
                        <input
                          type="text"
                          className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                          placeholder="กรอกชื่อ-สกุล"

                        />
                      </div>


                      <div className="flex flex-col mx-auto gap-3 sm:flex-row justify-center mt-32 font-bold text-xs sm:text-sm">
                        <button onClick={() => setCurrentStep(STEP_ONE)}
                          className="flex items-center justify-center text-center text-black bg-white rounded-md p-3 mx-2" style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}>
                          แก้ไขข้อมูล
                        </button>

                        <button onClick={save}
                          className="flex items-center justify-center text-center text-white bg-blue-700 rounded-md p-3 mx-2" style={{ width: "180px", height: "45px" }}>
                          ยืนยันหลักฐานการชำระเงิน
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="mt-5 items-center gap-x-2">
                    <div className="flex justify-start ">
                      {currentStep === STEP_ONE && (
                        <>
                          <button
                            onClick={handleClear}
                            className="flex items-center justify-center text-center bg-[#FFFFFF] text-black rounded-md p-3 mx-2"
                            style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}
                          >
                            ล้างข้อมูล
                          </button>
                          <button
                            onClick={handleNext}
                            className="flex items-center justify-center text-center bg-[#EEEEEE] text-black rounded-md p-3 mx-2"
                            style={{ width: "180px", height: "45px" }}
                          >
                            ยืนยันข้อมูล
                          </button>
                        </>
                      )}
                    </div>

                    <div className="flex justify-center">

                      {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white rounded-md p-6 shadow-lg" style={{ width: "353px", height: "160px" }}>
                            <h2 className="text-lg font-bold">ยืนยันการส่งคำขอหรือไม่</h2>
                            <p className="text-xs font-semibold text-[#585858] mt-4">โปรดตรวจสอบรายละเอียดข้อมูลให้ครบถ้วน</p>
                            <div className="flex justify-between mt-[20px] p-3">
                              <button onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded" style={{ width: "150px", height: "39px" }}>
                                ยกเลิก
                              </button>
                              <button
                                onClick={() => {
                                  handleNext();
                                  setIsModalOpen(false);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded" style={{ width: "150px", height: "39px" }}
                              >
                                ยืนยัน
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Payment Popup */}
                      {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white p-6 rounded shadow-md text-center flex flex-col items-center">
                            <img src={Payment} alt="Payment" className="w-[250px] h-[250px] rounded-lg mb-4 object-cover" />
                            <h2 className="text-lg font-bold mb-4">เทศบาลตำบล</h2>
                            <p className="mb-4">โปรดชำระเงินให้เสร็จภายใน 10 นาที เหลือเวลา
                              <span className="text-red-500"> {formatTime(countdown)}</span>
                            </p>
                            <button
                              className="bg-blue-500 text-white px-24 py-2 rounded mt-3"
                              onClick={() => setShowPopup(false)}
                            >
                              แจ้งหลักฐานการชำระเงิน
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
              {/* <!-- End Stepper Container --> */}

            </div>

          </div>
        </div>
      </div>
      {showAlertCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center w-auto h-[180px] flex flex-col items-center">
            <div className="flex justify-center mb-4"> {/* Added flex and justify-center */}
              <img
                className="w-[50px] h-[50px]"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/13fdb75c22fce7f7b14ea4e3a47c7a8804bbc314346786311fcc7ed89fc068c7?placeholderIfAbsent=true&apiKey=bf0b86e0707a42aa8acd2aa478f17610"
                alt=""
              />
            </div>
            <h2 className="text-lg font-bold mb-2">คำขออนุญาตถูกยกเลิก</h2>
            <p className="mb-4">ระบบได้ปฏิเสธคำขออนุญาตเนื่องจากการชำระเงินล่าช้า</p>
          </div>
        </div>

      )}
    </div>
  );
}


