import React, { useState, useEffect } from "react";
import Payment from '../image/paymant.jpg';

const Stepper = () => {
    const STEP_ONE = 1;
    const STEP_TWO = 2;
    const STEP_THREE = 3;

    const [currentStep, setCurrentStep] = useState(STEP_ONE);
    const [showPopup, setShowPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countdown, setCountdown] = useState(600);

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
                ];
            default:
                return [];
        }
    };

    const breadcrumbs = getBreadcrumbs();

    useEffect(() => {
        if (currentStep === STEP_THREE) {
            setShowPopup(true);
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        alert("การจองไม่สำเร็จ");
                        window.location.reload();
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [currentStep]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const [selectedTemple, setSelectedTemple] = useState('');
    const [selectedFurnace, setSelectedFurnace] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleClear = () => {
        setSelectedTemple('');
        setSelectedFurnace('');
        setSelectedDate('');
        setSelectedTime('');
    };

    return (
        <div className="p-8">
            {/* Breadcrumb Navigation */}
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

            {/* Step Content */}
            <div className="flex flex-col">
                {currentStep === STEP_ONE && <div>เนื้อหาของหน้าที่ 1</div>}
                {currentStep === STEP_TWO && <div>เนื้อหาของหน้าที่ 2</div>}
                {currentStep === STEP_THREE && (
                    <div>
                        <div>เนื้อหาของหน้าที่ 3</div>
                        <button
                            onClick={() => alert("ข้อมูลถูกส่งเรียบร้อยแล้ว")} // Replace this with your submit logic
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            ส่งข้อมูล
                        </button>
                        <button
                            onClick={() => setCurrentStep(STEP_ONE)} // Go back to Step 1
                            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            แก้ไขข้อมูล
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
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
                    {currentStep > STEP_ONE && (
                        <button
                            onClick={() => setIsModalOpen(true)} // Open modal when clicked
                            className="flex items-center justify-center text-center bg-[#225EC4] text-white rounded-md p-3 mx-2"
                            style={{ width: "180px", height: "45px" }}
                        >
                            ยืนยัน
                        </button>
                    )}

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
    );
};

export default Stepper;
