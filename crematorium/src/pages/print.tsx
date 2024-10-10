import { FrappeContext } from "frappe-react-sdk";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Crematorium } from "../types/types";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Print() {
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

    const handlePrint = () => {
        window.print();
    };

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

                pdf.save('คำขออนุญาตฌาปนกิจศพ.pdf');
            });
        }
    };

    return (
        <>
            <div className="bg-gray-200 min-h-screen ">
                <div className="flex justify-end bg-[#ffff] p-3 print-button">
                    <div className="flex gap-2 mt-2.5 lg:ml-60 md:mt-[20px] md:mx-1 lg:mt-0 sm:mt-4">
                        <button className="flex items-center p-2 bg-[#EEEEEE] rounded-md" onClick={handlePrint}>
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

                <div className="mt-3">
                    <div id="pdf-content" className="w-[794px] h-[1123px] mx-auto bg-white p-[50px]">
                        <div className="flex justify-center mb-4">
                            <div className="text-xl font-sans">คำขออนุญาตฌาปนกิจศพ</div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <div className="text-sm font-sans">สำนักงานเทศบาลตำบลแม่จัน</div>
                        </div>
                        {/* วันที่ */}
                        <div className="mt-4">
                            <div className="flex justify-end space-x-2">
                                <div className="text-sm font-sans pr-[50px]">{formatDate(form?.creation)}</div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm">
                                <div className="font-sans pl-32 mt-[7px] ml-[7px]">ข้าพเจ้า</div>
                                <div className="font-sans">{form.username || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">อายุ</div>
                                <div className="font-sans">{form.age || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">ปี</div>
                                <div className="font-sans">หมู่ที่</div>
                                <div className="font-sans">{form.village || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">ชุมชน</div>
                                <div className="font-sans">{form.community || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">ตำบล</div>
                                <div className="font-sans">{form.canton || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">อำเภอ</div>
                                <div className="font-sans">{form.district || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">จังหวัด</div>
                                <div className="font-sans">{form.province || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">เบอร์โทรศัพท์</div>
                                <div className="font-sans">{form.phone || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">มีความเกี่ยวข้องกับผู้ตายเป็น</div>
                                <div className="font-sans">{form.relationship || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">ขอยื่นคำร้องต่อเจ้าพนักงานท้องถิ่นเทศบาลตำบลแม่จัน</div>
                            </div>
                        </div>
                        {/* Part 2 */}
                        <div className="mt-4">
                            <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm">
                                <div className="font-sans pl-32 mt-[7px] ml-[7px]">ด้วยข้าพเจ้ามีความประสงค์จะทำการเผาศพของ</div>
                                <div className="font-sans">{form.deceased || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">มรณบัตรจากนายทะเบียนท้องถิ่น</div>
                                <div className="font-sans">{form.nameregister || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">เลขที่</div>
                                <div className="font-sans">{form.leafnumber || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">สถานที่ตั้งศพ</div>
                                <div className="font-sans">{form.crematory || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">เผา</div>
                                <div className="font-sans">{formatDate(form?.date)}</div>
                                <div className="font-sans">เวลา</div>
                                <div className="font-sans">{form.time || "ไม่พบข้อมูล"}</div>
                                <div className="font-sans">และมีความประสงค์เผาใน</div>
                                <div className="font-sans">{form.furnace || "ไม่พบข้อมูล"}</div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm">
                                <div className="font-sans mt-[7px] ml-[7px]">พร้อมคำร้องขอนี้ข้าพเจ้าได้แนบหลักฐานและเอกสารมาด้วยดังนี้ คือ</div>
                            </div>
                            <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm">
                                <div className="font-sans mt-[7px] ml-[7px]">สำเนาใบมรณะบัตร</div>
                            </div>
                            <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm">
                                <div className="font-sans mt-[7px] ml-[7px]">สำเนาทะเบียนบ้าน(ผู้ตาย)</div>
                            </div>
                            <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm">
                                <div className="font-sans mt-[7px] ml-[7px]">สำเนาบัตรประจำตัวประชาชน(ผู้ยื่นคำร้อง)</div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex flex-wrap space-x-2 space-y-2 pl-3 pr-3 text-justify text-sm">
                                <div className="font-sans pl-32 mt-[7px] ml-[7px]">ทั้งนี้ ขอให้เทศบาลตำบลแม่มึงดำเนินการให้ข้าพเจ้าตามประสงค์ โดยข้าพเจ้ายินดี</div>
                                <div className="font-sans">เสียค่าธรรมเนียมต่าง ๆ ตามระเบียบของเทศบาลตำบลแม่จัน</div>
                            </div>
                        </div>
                        {/* Signatures */}
                        <div className="grid grid-cols-3 gap-4 mt-32 text-sm">
                            <div className="font-sans"></div>
                            <div className="font-sans ml-2"></div>
                            <div className="font-sans ml-2 flex justify-center">ลงชื่อ {form.username || "ไม่พบข้อมูล"} ผู้ยื่นคำขอ</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                            <div className="font-sans pr-3"></div>
                            <div className="font-sans"></div>
                            <div className="font-sans pl-3 flex justify-center">( {form.username || "ไม่พบข้อมูล"} )</div>
                        </div>
                    </div>
                </div>


            </div>



            {/* CSS สำหรับการพิมพ์ */}
            <style>
                {`
                     @media print {
            .print-button {
                display: none; /* ซ่อนปุ่ม Print เมื่อพิมพ์ */
            }
            body, .bg-gray-200 {
                background-color: white !important; /* เปลี่ยนพื้นหลังเป็นสีขาวเมื่อพิมพ์ */
            }
        }
                `}
            </style>
        </>
    );
}
