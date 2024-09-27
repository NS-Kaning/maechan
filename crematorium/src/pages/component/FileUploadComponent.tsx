import React, { useContext, useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';

const FileUploadComponent = ({ attachment, success, error }) => {
  const { file, call } = useContext(FrappeContext);

  const fileInputRef1 = useRef<HTMLInputElement | null>(null); // สำหรับเอกสารที่ 1
  const fileInputRef2 = useRef<HTMLInputElement | null>(null); // สำหรับเอกสารที่ 2
  const fileInputRef3 = useRef<HTMLInputElement | null>(null); // สำหรับเอกสารที่ 3

  const [isUploaded1, setIsUploaded1] = useState(false); // สถานะการอัปโหลดไฟล์สำหรับเอกสารที่ 1
  const [isUploaded2, setIsUploaded2] = useState(false); // สถานะการอัปโหลดไฟล์สำหรับเอกสารที่ 2
  const [isUploaded3, setIsUploaded3] = useState(false); // สถานะการอัปโหลดไฟล์สำหรับเอกสารที่ 3
  const [isUploading, setIsUploading] = useState(false); // สถานะการกำลังอัปโหลด

  const handleImageClick = (fileInputRef: React.RefObject<HTMLInputElement>) => {
    fileInputRef.current?.click(); // เปิด dialog ของไฟล์เมื่อคลิกที่รูปภาพ
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>, fieldname: string) => {
    if (e.target.files) {
      const myFile = e.target.files[0];
      console.log('Uploaded file:', myFile);

      const fileArgs = {
        "isPrivate": false,
        "doctype": "Attachment",
        "docname": attachment.name,
        "fieldname": fieldname // ตั้งค่า fieldname ที่กำหนด
      };

      setIsUploading(true); // ตั้งค่าเป็นกำลังอัปโหลด

      try {
        const response = await file.uploadFile(
          myFile,
          fileArgs,
          (completedBytes, totalBytes) => console.log(Math.round((completedBytes / (totalBytes ?? completedBytes)) * 100), " completed")
        );

        console.log("File Upload complete");
        const fileResponse = response.data.message;
        console.log(fileResponse);

        const req = await call.post("maechan.maechan_license.doctype.requestlicense.requestlicense.update_attachment", {
          'fileresponse': fileResponse,
          'attachment': attachment
        });

        setIsUploaded(true); // อัปเดตสถานะเมื่ออัปโหลดสำเร็จ

        if (success) {
          success(req);
        }
      } catch (e) {
        console.error(e);
        if (error) {
          error(e);
        }
      } finally {
        setIsUploading(false); // เสร็จสิ้นการอัปโหลด
      }
    }
  };

  return (
    <div>
      {/* ส่วนสำหรับเอกสารที่ 1: สำเนาใบมรณะบัตร */}
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
          onChange={(e) => handleFileChange(e, setIsUploaded1, "death_certificate")} // ใช้ fieldname "death_certificate"
        />
      </div>

      {/* ส่วนสำหรับเอกสารที่ 2: สำเนาทะเบียนบ้าน (ผู้ตาย) */}
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
          onChange={(e) => handleFileChange(e, setIsUploaded2, "house_registration")} // ใช้ fieldname "house_registration"
        />
      </div>

      {/* ส่วนสำหรับเอกสารที่ 3: สำเนาบัตรประจำตัวประชาชน (ผู้ยื่นคำร้อง) */}
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
          onChange={(e) => handleFileChange(e, setIsUploaded3, "id_card")} // ใช้ fieldname "id_card"
        />
      </div>
    </div>
  );
};

export default FileUploadComponent;
