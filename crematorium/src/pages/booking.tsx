import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from './component/nav';
import { FaCheckCircle } from 'react-icons/fa';
import { Crematorium } from '../types/types';


export default function BOOKING() {

    const { name } = useParams();



    const frappeConfig = useContext(FrappeContext)
    const { file } = useContext(FrappeContext);

    const [crematoriumMeta, setCrematorium] = useState({})
    const [provincesName, setProvince] = useState([])
    const [districtName, setDistrict] = useState([])
    const [cantonName, setCanton] = useState([])
    const [relevantName, setRelevant] = useState([])
    const [communityName, setCommunity] = useState([])
    const [villageName, setVillage] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState<Crematorium>({})

    // const [errors, setErrors] = useState<Partial<Record<string, boolean>>>({
    //     provinces: false,
    //     district: false,
    //     canton: false,
    //     community: false,
    //     village: false,
    //     relevant: false,
    // });

    const updateForm = (key: string, value: any) => {
        const newForm = { ...form, [key]: value }
        setForm(newForm)

        // setErrors((prevErrors) => ({ ...prevErrors, [key]: value.trim() === "" }));
    }

    const loadBooking = (name: string) => {
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
            const fieldProvince = meta.fields.find((f) => f.fieldname == 'province')
            if (fieldProvince) {
                const n = fieldProvince.options.split('\n')
                // console.log('P', n)
                setProvince(n)
            }
            const fieldDistrict = meta.fields.find((f) => f.fieldname == 'district')
            if (fieldDistrict) {
                const n = fieldDistrict.options.split('\n')
                // console.log('P', n)
                setDistrict(n)
            }
            const fieldCanton = meta.fields.find((f) => f.fieldname == 'canton')
            if (fieldCanton) {
                const n = fieldCanton.options.split('\n')
                // console.log('P', n)
                setCanton(n)
            }
            const fieldCommunity = meta.fields.find((f) => f.fieldname == 'community')
            if (fieldCommunity) {
                const n = fieldCommunity.options.split('\n')
                // console.log('P', n)
                setCommunity(n)
            }
            const fieldVillage = meta.fields.find((f) => f.fieldname == 'village')
            if (fieldVillage) {
                const n = fieldVillage.options.split('\n')
                // console.log('P', n) village
                setVillage(n)
            }
            const fieldRelevant = meta.fields.find((f) => f.fieldname == 'relationship')
            if (fieldRelevant) {
                const n = fieldRelevant.options.split('\n')
                // console.log('P', n)
                setRelevant(n)
            }

            if (name) {
                loadBooking(name)
            }


        })
    }, [])

    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>, key: string) => {
        if (e.target.files) {
            const myFile = e.target.files[0];
            console.log('Uploaded file:', myFile);

            const fileArgs = {
                /** If the file access is private then set to TRUE (optional) */
                "isPrivate": false,
                /** Folder the file exists in (optional) */
                "folder": "home/RequestLicenseAttachment",
                // /** File URL (optional) */
                // /** Doctype associated with the file (optional) */
                // "doctype": "Attachment",
                // /** Docname associated with the file (mandatory if doctype is present) */
                // "docname": attachment.name,
                // /** Field to be linked in the Document **/
                // "fieldname" : "value"
            }

            file.uploadFile(
                myFile,
                fileArgs,
                /** Progress Indicator callback function **/
                (completedBytes, totalBytes) => console.log(Math.round((completedBytes / (totalBytes ?? completedBytes)) * 100), " completed")
            )
                .then((response: Response) => {
                    console.log(response)
                    const message = response.data.message
                    console.log('test', message)
                    const url = message.file_url

                    setForm({
                        ...form,
                        [key]: url
                    });
                })
                .catch((e: any) => console.error(e))

            // do upload files

            setIsUploaded(true); // อัปเดตสถานะเมื่ออัปโหลดสำเร็จ
        }
    };

    // const handleSave = () => {
    //     frappeConfig?.db.createDoc('Crematorium', {
    //         ...form
    //     })
    //         .then((doc) =>{
    //             console.log(doc)
    //             setForm({
    //                 ...doc
    //             })
    //         })
    //         .catch((error) => console.error(error));
    //     console.log('save')
    // };

    // const handleUpdate = () => {
    //     if(form.name){
    //         frappeConfig?.db.updateDoc('Crematorium',form.name, {
    //             ...form
    //         })
    //     }

    // }

    const handleUpdate = () => {
        if (form.name) {
            frappeConfig?.db.updateDoc('Crematorium', form.name, {
                ...form
            }).then(() => {
                // ใช้ navigate เพื่อไปหน้าถัดไป แต่ยังคงมีชื่ออยู่ใน URL
                navigate(`/tranfer/${form.name}`, { replace: true });
            }).catch((error) => {
                console.error("การอัพเดตล้มเหลว:", error);
            });
        } else {
            console.error("ต้องกรอกชื่อฟอร์ม");
        }
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp + 'Z');
        const year = date.getUTCFullYear() + 543;
        const month = date.toLocaleString('th-TH', { month: 'long' });
        const day = String(date.getUTCDate()).padStart(2, '0');

        return ` วันที่ ${day} เดือน ${month} ปี ${year}`;
    };

    return (

        <div>
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

                            </div>

                            {/* list process */}

                            <div className="flex flex-wrap ml-4 gap-2 mt-3 text-xs text-black">
                                <div className="my-auto">ประสงค์จะเผาใน</div>
                                <div className="px-3 py-1.5 whitespace-nowrap rounded-md bg-zinc-100 bg-opacity-80">
                                    {form.furnace || "ไม่พบข้อมูล"}
                                </div>
                                <div className="my-auto">วันเวลา</div>
                                <div className="px-3 py-1.5 rounded-md bg-zinc-100 bg-opacity-80">
                                    {/* formatDate({form.date || "ไม่พบข้อมูล"}) */}
                                    {form.time || "ไม่พบข้อมูล"} 
                                    {formatDate(form?.date)}
                                </div>
                            </div>


                            <div className="text-[14px] font-bold mt-4 ml-4">ข้อมูลผู้ยื่นคำขอ</div>

                            <div className="flex flex-wrap gap-4 mt-3 ml-4">

                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 mb-4">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ชื่อ-สกุล</label>
                                    <input
                                        onChange={(e) => updateForm('username', e.target.value)}
                                        type="text"
                                        className={`text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000] `}
                                        placeholder="กรอกชื่อ-สกุล"
                                        required
                                    />
                                </div>

                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3 mb-4">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">อายุ</label>
                                    <input
                                        onChange={(e) => updateForm('age', e.target.value)}
                                        type="number"
                                        className={`text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]`}
                                        placeholder="กรอกอายุ"
                                        required
                                    />
                                </div>

                                <div className="w-[300px] h-[70px] dark:bg-[#EEEEEE] rounded-lg p-3 mb-4">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">เบอร์โทรศัพท์</label>
                                    <input
                                        onChange={(e) => updateForm('phone', e.target.value)}
                                        type="tel"
                                        className={`text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]`}
                                        placeholder="กรอกเบอร์โทรศัพท์"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="text-[14px] font-bold mt-4 ml-4">ที่อยู่ผู้ขอยื่น</div>

                            <div className="flex flex-wrap gap-4 mt-3 ml-4">
                                {/* จังหวัด */}
                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">จังหวัด</label>
                                    <select
                                        onChange={(e) => updateForm('provinces', e.target.value)}
                                        required
                                        className={`text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000] `}
                                    >
                                        <option value="">เลือกจังหวัด</option>
                                        {provincesName.map((n, index) => (
                                            <option key={`${n}-${index}`} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* อำเภอ */}
                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">อำเภอ</label>
                                    <select
                                        onChange={(e) => updateForm('district', e.target.value)}
                                        required
                                        className={`text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000]`}
                                    >
                                        <option value="">เลือกอำเภอ</option>
                                        {districtName.map((n, index) => (
                                            <option key={`${n}-${index}`} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* ตำบล */}
                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ตำบล</label>
                                    <select
                                        onChange={(e) => updateForm('canton', e.target.value)}
                                        required
                                        className={`text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000] `}
                                    >
                                        <option value="">เลือกตำบล</option>
                                        {cantonName.map((n, index) => (
                                            <option key={`${n}-${index}`} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* ชุมชน */}
                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ชุมชน</label>
                                    <select
                                        onChange={(e) => updateForm('community', e.target.value)}
                                        required
                                        className={`text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000] `}
                                    >
                                        <option value="">เลือกชุมชน</option>
                                        {communityName.map((n, index) => (
                                            <option key={`${n}-${index}`} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* หมู่ */}
                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">หมู่</label>
                                    <select
                                        onChange={(e) => updateForm('village', e.target.value)}
                                        required
                                        className={`text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000] `}
                                    >
                                        <option value="">เลือกหมู่</option>
                                        {villageName.map((n, index) => (
                                            <option key={`${n}-${index}`} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* ความเกี่ยวข้องกับผู้ตาย */}
                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ความเกี่ยวข้องกับผู้ตาย</label>
                                    <select
                                        onChange={(e) => updateForm('relevant', e.target.value)}
                                        required
                                        className={`text-sm font-medium max-w-lg rounded-lg block w-full p-2 dark:bg-[#EEEEEE] dark:text-[#000] `}
                                    >
                                        <option value="">เลือกความเกี่ยวข้อง</option>
                                        {relevantName.map((n, index) => (
                                            <option key={`${n}-${index}`} value={n}>{n}</option>
                                        ))}
                                    </select>

                                </div>


                            </div>
                            <div className="text-[14px] font-bold mt-4 ml-4">ข้อมูลผู้ตาย</div>

                            <div className="flex flex-wrap gap-4 mt-3 ml-4">
                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">ประสงค์เผาศพของ</label>
                                    <input
                                        onChange={(e) => updateForm('deceased', e.target.value)}
                                        type="text"
                                        className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                                        placeholder="กรอกชื่อ-สกุล" required

                                    />
                                </div>


                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">มรณะบัตรจากนายทะเบียน</label>
                                    <input
                                        onChange={(e) => updateForm('nameregister', e.target.value)}
                                        type="text"
                                        className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                                        placeholder="กรอกชื่อ-สกุล" required
                                    />
                                </div>


                                <div className="w-[300px] h-[70px] bg-white dark:bg-[#EEEEEE] rounded-lg p-3">
                                    <label className="block text-[10px] font-medium dark:text-[#585858] pl-3">เลขที่</label>
                                    <input
                                        onChange={(e) => updateForm('leafnumber', e.target.value)}
                                        type="text"
                                        className="text-sm font-medium rounded-lg block w-full p-2 bg-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-[#000]"
                                        placeholder="เลขที่" required
                                    />
                                </div>


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
                                    <>
                                        <FaCheckCircle className="w-[20px] h-[20px] text-green-500" />
                                        {/* <img src={form.deathcertificate} /> */}
                                    </>
                                ) : (
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                                        alt="Click to upload"
                                        className="w-[24px] aspect-[1.06] cursor-pointer"
                                        onClick={() => handleImageClick(fileInputRef1)} // เรียกใช้งาน handleImageClick พร้อม ref
                                    />
                                )}

                                <input
                                    type="file" required
                                    ref={fileInputRef1}
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, setIsUploaded1, 'deathcertificate')}
                                />
                            </div>

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
                                    type="file" required
                                    ref={fileInputRef2}
                                    className="hidden"
                                    accept="application/pdf,image/*"
                                    onChange={(e) => handleFileChange(e, setIsUploaded2, 'houseregistration')}
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
                                    type="file" required
                                    ref={fileInputRef3}
                                    className="hidden"
                                    accept="application/pdf,image/*"
                                    onChange={(e) => handleFileChange(e, setIsUploaded3, 'idcard')}
                                />
                            </div>

                            <div className="flex flex-col mx-auto sm:flex-row justify-center mt-10 font-bold text-xs sm:text-sm">
                                <button onClick={() => setIsModalOpen(true)}
                                    className="flex items-center justify-center text-center text-white bg-blue-700  rounded-lg p-3 mx-2" style={{ width: "180px", height: "45px", border: "2px solid #EEEEEE" }}>
                                    ยืนยัน
                                </button>

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
                                                        handleUpdate();
                                                        // handleSave();
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}


