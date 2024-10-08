import { AuthCredentials, FrappeContext, useFrappeAuth } from 'frappe-react-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from './component/nav';
import Payment from '../image/paymant.jpg'
import { FaCheckCircle } from 'react-icons/fa';

const Popup = ({ show, onClose, countdown }) => {
    if (!show) return null;

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md text-center flex flex-col items-center">
                    <img src={Payment} alt="Payment" className="w-[250px] h-[250px] rounded-lg mb-4 object-cover" />
                    <h2 className="text-lg font-bold mb-4">เทศบาลตำบล</h2>
                    <p className="mb-4">โปรดชำระเงินให้เสร็จภายใน 10 นาที เหลือเวลา
                        <span className="text-red-500"> {formatTime(countdown)}</span>
                    </p>
                    <button
                        className="bg-blue-500 text-white px-24 py-2 rounded mt-3"
                        onClick={onClose}
                    >
                        แจ้งหลักฐานการชำระเงิน
                    </button>
                </div>
            </div>


        </div>


    );
};

const UploadSection = () => {
    const frappeConfig = useContext(FrappeContext)
    const { file } = useContext(FrappeContext);
    const [isUploaded, setIsUploaded] = useState(false);
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        // กำหนดวันที่ปัจจุบันในรูปแบบ DD/MM/YYYY
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        setCurrentDate(formattedDate);
    }, []);

    const [form, setForm] = useState<Crematorium>({})

    const updateForm = (key: string, value: any) => {
        const newForm = { ...form, [key]: value }
        setForm(newForm)
    }


    // ฟังก์ชัน handleFileChange รวมเข้ากับ UploadSection
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>,
        key: string
    ) => {
        if (e.target.files) {
            const myFile = e.target.files[0];
            console.log('Uploaded file:', myFile);

            const fileArgs = {
                "isPrivate": false,
                "folder": "home/RequestLicenseAttachment",
            };

            // จำลองการอัพโหลดไฟล์
            file.uploadFile(
                myFile,
                fileArgs,
                (completedBytes, totalBytes) =>
                    console.log(Math.round((completedBytes / (totalBytes ?? completedBytes)) * 100), " completed")
            )
                .then((response: Response) => {
                    console.log(response);
                    const message = response.data.message;
                    const url = message.file_url;

                    setForm({
                        ...form,
                        [key]: url
                    });
                })
                .catch((e: any) => console.error(e))

            setIsUploaded(true); // อัปเดตสถานะเมื่ออัปโหลดสำเร็จ
        }
    };

    const [crematoriumMeta, setCrematorium] = useState({})
    const { name } = useParams();

    const loadtranfer = (name: string) => {
        frappeConfig?.db.getDoc("Crematorium", name).then((doc) => {
            console.log('load booking doc', doc)
            setForm({
                ...doc
            })
        })
    }


    useEffect(() => {

        frappeConfig?.call.get('maechan.booking.doctype.crematorium.crematorium.get_meta').then(r => {
            // console.log(r)
            setCrematorium(r.message)
            const meta = r.message
            if (name) {
                loadtranfer(name)
            }


        })
    }, [])


    // const handleSave = () => {
    //     frappeConfig?.db.createDoc('Crematorium', {
    //         ...form
    //     })
    //         .then((doc) => console.log(doc))
    //         .catch((error) => console.error(error));
    //     console.log('save')
    // };

    const handleUpdate = () => {
        if (form.name) {
            frappeConfig?.db.updateDoc('Crematorium', form.name, {
                ...form
            }).then(() => {
                // แสดงข้อความเมื่ออัพเดตเสร็จสิ้น
                alert("อัปเดตข้อมูลเสร็จสิ้น");
            }).catch((error) => {
                // แสดงข้อผิดพลาดหากการอัพเดตล้มเหลว
                console.error("การอัปเดตล้มเหลว:", error);
            });
        } else {
            console.error("ต้องกรอกชื่อฟอร์ม");
        }
    };

    return (
        <div>
            <div className="flex flex-wrap mr-32 pr-6 ml-4 px-6 text-[13px] justify-between self-stretch p-6 mt-4 rounded-xl bg-zinc-100 bg-opacity-80 text-black max-md:px-6 max-md:max-w-50">
                <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                    <div>อัพโหลดหลักฐานการชำระเงิน</div>
                </div>

                {!isUploaded ? (
                    <label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setIsUploaded, "payment")}
                            style={{ display: 'none' }} required
                        />
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                            alt="อัพโหลดไฟล์"
                            className="w-[24px] aspect-[1.06] cursor-pointer"
                            onClick={() => document.querySelector('input[type="file"]')?.click()} // คลิกเพื่อเรียก input file
                        />
                    </label>
                ) : (
                    <FaCheckCircle className="w-[20px] h-[20px] text-green-500" />
                )}
            </div>
            <div className="text-sm font-semibold mt-3 ml-4">จำนวนยอดที่ชำระ</div>

            <div className="flex flex-wrap gap-4 mt-3 ml-4">
                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                    <div className="block text-[10px] font-medium dark:text-[#585858] pl-2">จำนวน</div>
                    <div className="flex items-center justify-between text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                        <div className="flex-grow">{form.furnace || "ไม่พบข้อมูล"}</div>

                    </div>
                </div>

                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                    <div className="block text-[10px] font-medium dark:text-[#585858] pl-3">วันที่โอนเงิน</div>
                    <div className="flex items-center justify-between text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]">
                        {/* <div className="flex-grow">{currentDate}</div> */}
                        {/* <input
                            value={form.transferdate || getCurrentDate()} // ตั้งค่าเริ่มต้นเป็นวันที่ปัจจุบัน
                            onChange={(e) => updateForm('transferdate', e.target.value)}
                            type="date"
                            id="date"
                            name="date"
                            className="mt-1 block w-full text-base dark:bg-[#EEEEEE] dark:text-[#000]"
                            readOnly // ป้องกันการแก้ไขค่า
                        />
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8467f280357d0b2ca837f386e93df54352b232312027ea6a8f9d4248e6dbce45?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                            className="w-6 h-6 ml-2"
                            alt="Icon">
                        </img> */}
                        <input value={form.transferdate || ''}
                            onChange={(e) => updateForm('transferdate', e.target.value)} type="date" id="date" name="date" className="mt-1 block w-full text-base dark:bg-[#EEEEEE] dark:text-[#000]" />


                    </div>
                </div>

                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">เวลาที่โอนเงิน</label>
                    <input onChange={(e) => updateForm('transfertime', e.target.value)}
                        type="text"
                        className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                        placeholder="กรอกชื่อ-สกุล"

                    />
                </div>


                <div className="flex flex-col mx-auto gap-3 sm:flex-row justify-center mt-32 font-bold text-xs sm:text-sm">
                    <button className="flex items-center justify-center text-center text-black bg-white rounded-md p-3 mx-2" style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}>
                        แก้ไขข้อมูล
                    </button>

                    <button onClick={handleUpdate}
                        className="flex items-center justify-center text-center text-white bg-blue-700 rounded-md p-3 mx-2" style={{ width: "180px", height: "45px" }}>
                        หลักฐานการชำระเงิน
                    </button>
                </div>

            </div>
        </div>

    );
};


export default function TRANFER() {
    const frappeConfig = useContext(FrappeContext)
    // const [form, setForm] = useState({});

    // const updateForm = (key: string, value: any) => {
    //     const newForm = { ...form, [key]: value }
    //     setForm(newForm)
    // }

    const navigate = useNavigate();

    const handleNavigate = (path: To) => {
        navigate(path);
    };

    const [showPopup, setShowPopup] = useState(true);
    const [countdown, setCountdown] = useState(600);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    setShowPopup(false);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };


    // const handleUpdate = () => {
    //     if(form.name){
    //         frappeConfig?.db.updateDoc('Crematorium',form.name, {
    //             ...form
    //         })
    //     }

    // }

    return (

        <div>
            <Popup show={showPopup} countdown={countdown} onClose={handleClosePopup} />
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
                        <div className="flex flex-col  pt-3.5 pr-4 pb-14 pl-4 mx-auto w-full font-bold bg-white rounded-md border border-solid border-zinc-300 max-md:pr-5 max-md:pb-24 max-md:mt-5 max-md:max-w-full">
                            <div className="flex  gap-3 ml-4 mt-2 items-center self-start text-xs text-black text-opacity-20">
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

                                <div className="self-stretch my-auto text-black basis-auto">
                                    การชำระเงิน
                                </div>
                            </div>


                            {/* list process */}

                            <div className="text-base font-bold mt-4 ml-4">แจ้งหลักฐานการชำระเงิน</div>
                            <div className="text-sm font-semibold mt-3   ml-4">ข้อมูลการชำระเงิน</div>

                            {/* <div className="flex flex-wrap mr-32 pr-6 ml-4 px-6 text-[13px] justify-between self-stretch p-6 mt-4  rounded-xl bg-zinc-100 bg-opacity-80 text-black max-md:px-6 max-md:max-w-50">
                                <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
                                    <div>อัพโหลดหลักฐานการชำระเงิน</div>
                                </div>
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                    alt="" className="w-[24px] aspect-[1.06]" />
                            </div> */}
                            <UploadSection></UploadSection>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}