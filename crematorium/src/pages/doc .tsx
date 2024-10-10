import React, { useContext, useEffect, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from './component/nav';
import { Crematorium } from '../types/types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export default function Doc() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const frappeConfig = useContext(FrappeContext);
    const [form, setForm] = useState<Crematorium>({});
    const [crematoriumMeta, setCrematorium] = useState({});
    const { name } = useParams();

    const loadPrint = (name: string) => {
        frappeConfig?.db.getDoc("Crematorium", name).then((doc) => {
            console.log('load booking doc', doc);
            setForm({
                ...doc,
            });
        });
    };

    useEffect(() => {
        frappeConfig?.call.get('maechan.booking.doctype.crematorium.crematorium.get_meta').then(r => {
            setCrematorium(r.message);
            if (name) {
                loadPrint(name);
            }
        });
    }, [frappeConfig, name]);

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp + 'Z');
        const year = date.getUTCFullYear() + 543;
        const month = date.toLocaleString('th-TH', { month: 'long' });
        const day = String(date.getUTCDate()).padStart(2, '0');
        return ` วันที่ ${day} เดือน ${month} ปี ${year}`;
    };

    const openInNewTab = () => {
        window.open(`${window.location.origin}/print/${name}`)

    }

    const handleSaveAsPDF = () => {
        const element = document.getElementById('pdf-content');

        if (element) {
            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('document.pdf');
            });
        }
    };

    // const [form, setForm] = useState(null as any)
    // useEffect(() => {
    //     //load form
    // }, [])

    // const openInNewTab = () => {
    //     window.open(`${window.location.origin}/print/${name}`)

    // }
    return (


        <div>
            <div className="flex flex-col pt-6 bg-white h-screen">
                <Nav></Nav>

                <div className="mt-6 w-full border border-zinc-120"></div>

                {/* nav */}

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
                                <div className="text-base font-bold flex-1 min-w-[150px]  lg:ml-[215px] mt-2 sm:mt-0"></div>
                                <div className="flex gap-2 mt-2.5 lg:ml-60 md:mt-[20px] md:mx-1 lg:mt-0 sm:mt-4" onClick={openInNewTab}>
                                    <button className="flex items-center p-2 bg-[#EEEEEE] rounded-md" >
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/00b224098ef5d4ac611017a1bfe803154c835825b0007755a375d5465e9ca403?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                            className="object-contain w-6"
                                            alt="Print Icon" />
                                        <div className="text-xs sm:text-sm font-bold ml-2">Print</div>
                                    </button>
                                    <button className="flex items-center p-2 bg-[#EEEEEE] rounded-md" onClick={handleSaveAsPDF}>
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d4836f77bde791f267ce31a9a3d4e624482e50e8881590e3e9f038ae18dc299?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                            className="object-contain w-6"
                                            alt="Save Icon" />
                                        <div className="text-xs sm:text-sm font-bold ml-2">Save</div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap-reverse justify-center mx-4 px-16 py-6 mt-4 text-sm font-bold text-white rounded-xl bg-zinc-100 bg-opacity-80 max-md:px-5 max-md:max-w-full">
                                <div id="pdf-content" className="w-[794px] h-[1123px] mx-auto bg-white p-[50px]">
                                    <div className="flex justify-center mb-4">
                                        <h1 className="text-xl font-sans text-slate-950">คำขออนุญาตฌาปนกิจศพ</h1>
                                    </div>
                                    <div className="flex justify-end mt-8">
                                        <span className="text-sm font-sans text-slate-950">สำนักงานเทศบาลตำบลแม่จัน</span>
                                    </div>
                                    {/* วันที่ */}
                                    <div className="mt-4">
                                        <div className="flex justify-end space-x-2">
                                            <span className="text-sm font-sans text-slate-950 pr-[50px]">{formatDate(form?.creation)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm text-slate-950">
                                            <span className="font-sans pl-32 mt-[7px] ml-[7px]">ข้าพเจ้า</span>
                                            <span className="font-sans">{form.username || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">อายุ</span>
                                            <span className="font-sans">{form.age || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">ปี</span>
                                            <span className="font-sans">หมู่ที่</span>
                                            <span className="font-sans">{form.village || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">ชุมชน</span>
                                            <span className="font-sans">{form.community || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">ตำบล</span>
                                            <span className="font-sans">{form.canton || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">อำเภอ</span>
                                            <span className="font-sans">{form.district || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">จังหวัด</span>
                                            <span className="font-sans">{form.province || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">เบอร์โทรศัพท์</span>
                                            <span className="font-sans">{form.phone || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">มีความเกี่ยวข้องกับผู้ตายเป็น</span>
                                            <span className="font-sans">{form.relationship || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">ขอยื่นคำร้องต่อเจ้าพนักงานท้องถิ่นเทศบาลตำบลแม่จัน</span>
                                        </div>
                                    </div>
                                    {/* Part 2 */}
                                    <div className="mt-4">
                                        <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm text-slate-950">
                                            <span className="font-sans pl-32 mt-[7px] ml-[7px]">ด้วยข้าพเจ้ามีความประสงค์จะทำการเผาศพของ</span>
                                            <span className="font-sans">{form.deceased || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">มรณบัตรจากนายทะเบียนท้องถิ่น</span>
                                            <span className="font-sans">{form.nameregister || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">เลขที่</span>
                                            <span className="font-sans">{form.leafnumber || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">สถานที่ตั้งศพ</span>
                                            <span className="font-sans">{form.crematory || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">เผา</span>
                                            <span className="font-sans">{formatDate(form?.date)}</span>
                                            <span className="font-sans">เวลา</span>
                                            <span className="font-sans">{form.time || "ไม่พบข้อมูล"}</span>
                                            <span className="font-sans">และมีความประสงค์เผาใน</span>
                                            <span className="font-sans">{form.furnace || "ไม่พบข้อมูล"}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm text-slate-950">
                                            <span className="font-sans mt-[7px] ml-[7px]">พร้อมคำร้องขอนี้ข้าพเจ้าได้แนบหลักฐานและเอกสารมาด้วยดังนี้ คือ</span>
                                        </div>
                                        <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm text-slate-950">
                                            <span className="font-sans mt-[7px] ml-[7px]">สำเนาใบมรณะบัตร</span>
                                        </div>
                                        <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm text-slate-950">
                                            <span className="font-sans mt-[7px] ml-[7px]">สำเนาทะเบียนบ้าน(ผู้ตาย)</span>
                                        </div>
                                        <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm text-slate-950">
                                            <span className="font-sans mt-[7px] ml-[7px]">สำเนาบัตรประจำตัวประชาชน(ผู้ยื่นคำร้อง)</span>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm text-slate-950">
                                            <span className="font-sans pl-32 mt-[7px] ml-[7px]">ทั้งนี้ ขอให้เทศบาลตำบลแม่มึงดำเนินการให้ข้าพเจ้าตามประสงค์ โดยข้าพเจ้ายินดี</span>
                                            <span className="font-sans">เสียค่าธรรมเนียมต่าง ๆ ตามระเบียบของเทศบาลตำบลแม่จัน</span>
                                        </div>
                                    </div>
                                    {/* Signatures */}
                                    <div className="grid grid-cols-3 gap-4 mt-32 text-sm text-slate-950">
                                        <div className="font-sans"></div>
                                        <div className="font-sans ml-2"></div>
                                        <div className="font-sans ml-2 flex justify-center">ลงชื่อ {form.username || "ไม่พบข้อมูล"} ผู้ยื่นคำขอ</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-slate-950">
                                        <div className="font-sans pr-3"></div>
                                        <div className="font-sans"></div>
                                        <div className="font-sans pl-3 flex justify-center">( {form.username || "ไม่พบข้อมูล"} )</div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col mx-auto gap-3 sm:flex-row justify-center mt-6 font-bold text-xs sm:text-sm">
                                <button className="flex items-center justify-center text-center text-black bg-white rounded-md p-3 mx-2" style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}
                                    onClick={() => handleNavigate('/home')}>
                                    เสร็จสิ้น
                                </button>

                                <button className="flex items-center justify-center text-center text-black bg-[#EEEEEE] rounded-md p-3 mx-2" style={{ width: "180px", height: "45px" }}
                                    onClick={() => handleNavigate('/history')}>
                                    ดูประวัติการทำรายการ
                                </button>
                            </div>
                        </div>

                    </div>



                </div>

            </div>
        </div>
    );
}