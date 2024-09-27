import React, { useState } from 'react';

// InputField Component
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minWidth?: string; // Allow minimum width to be passed as a prop
}> = ({ label, name, value, onChange, minWidth = 'min-w-[46px]' }) => (
  <div className="flex gap-0.5 items-center">
    <span>{label}</span>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`flex shrink-0 rounded-sm h-[15px] ${minWidth} w-auto`} // Set w-auto for dynamic width
      type="text"
      style={{ width: `${Math.max(46, value.length * 8)}px` }} // Dynamically adjust width based on content length
    />
  </div>
);

// DateInput Component
const DateInput: React.FC<{
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, handleInputChange }) => (
  <div className="flex gap-1 whitespace-nowrap mt-3.5">
    <InputField label="วันที่" name="funeralDateDay" value={formData.funeralDateDay} onChange={handleInputChange} minWidth="min-w-[30px]" />
    <InputField label="เดือน" name="funeralDateMonth" value={formData.funeralDateMonth} onChange={handleInputChange} minWidth="min-w-[30px]" />
    <InputField label="พศ" name="funeralDateYear" value={formData.funeralDateYear} onChange={handleInputChange} minWidth="min-w-[30px]" />
  </div>
);

// Main Component
const FuneralPermissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'test test',
    age: 'test test',
    address: 'test test',
    village: 'test test',
    community: 'test test',
    district: 'test test',
    province: 'test test',
    phoneNumber: 'test test',
    relationship: 'test test',
    deathCertificateNumber: 'test test',
    funeralLocation: 'test test',
    funeralDateDay: 'test test',
    funeralDateMonth: 'test test',
    funeralDateYear: 'test test',
    funeralTime: 'test test',
    serviceFee: 'test test',
    signature: 'test test'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <main>
      <page size="A4">
        <section className="form-section">
          <h1 className="form-title">คำขออนุญาตฌาปนกิจศพ</h1>
          <div className="organization-name">สำนักงานเทศบาลตำบลแม่จัน</div>
          <div className="date-section">
            <div className="grow">วันที่ เดือน พศ</div>
            <div className="flex shrink-0 w-6 rounded-sm h-[9px]" />
          </div>
          <DateInput formData={formData} handleInputChange={handleInputChange} />
          <div className="flex gap-1 self-end mt-3.5">
            <InputField label="ข้าพเจ้า" name="name" value={formData.name} onChange={handleInputChange} minWidth="min-w-[206px]" />
            <InputField label="อายุ" name="age" value={formData.age} onChange={handleInputChange} minWidth="min-w-[15px]" />
            <span>ปี</span>
          </div>
          <div className="flex gap-0.5 mt-3.5">
            <InputField label="อยู่บ้านเลขที่" name="address" value={formData.address} onChange={handleInputChange} minWidth="min-w-[30px]" />
            <InputField label="หมู่ที่" name="village" value={formData.village} onChange={handleInputChange} minWidth="min-w-[15px]" />
            <InputField label="ชุมชน" name="community" value={formData.community} onChange={handleInputChange} minWidth="min-w-[46px]" />
            <InputField label="ตำบล" name="district" value={formData.district} onChange={handleInputChange} minWidth="min-w-[46px]" />
            <InputField label="อำเภอ" name="province" value={formData.province} onChange={handleInputChange} minWidth="min-w-[46px]" />
          </div>
          <div className="flex gap-1 mt-3.5 whitespace-nowrap">
            <InputField label="จังหวัด" name="province" value={formData.province} onChange={handleInputChange} minWidth="min-w-[46px]" />
            <InputField label="เบอร์โทรศัพท์" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} minWidth="min-w-[54px]" />
            <InputField label="มีความเกี่ยวข้องกับผู้ตายเป็น" name="relationship" value={formData.relationship} onChange={handleInputChange} minWidth="min-w-[39px]" />
          </div>
          <p className="self-start mt-3">ขอยื่นคำร้องต่อเจ้าพนักงานท้องถิ่นเทศบาลตำบลแม่จัน</p>
          <div className="flex gap-1 self-end mt-4 whitespace-nowrap">
            <div className="grow">ด้วยข้าพเจ้ามีความประสงค์จะทำการเผาศพของ</div>
            <div className="flex shrink-0 rounded-sm h-[9px] w-[125px]" />
          </div>
          <div className="flex gap-1 mt-3.5 whitespace-nowrap">
            <div className="grow">มรณบัตรจากนายทะเบียนท้องถิ่น</div>
            <InputField label="" name="deathCertificateNumber" value={formData.deathCertificateNumber} onChange={handleInputChange} minWidth="min-w-[125px]" />
            <InputField label="เลขที่" name="deathCertificateNumber" value={formData.deathCertificateNumber} onChange={handleInputChange} minWidth="min-w-[54px]" />
          </div>
          <div className="flex gap-1.5 mt-3.5 whitespace-nowrap">
            <InputField label="สถานที่ตั้งศพ" name="funeralLocation" value={formData.funeralLocation} onChange={handleInputChange} minWidth="min-w-[105px]" />
            <span>เผาในวันที่</span>
            <DateInput formData={formData} handleInputChange={handleInputChange} />
          </div>
          <div className="flex gap-1 self-start mt-3.5 whitespace-nowrap">
            <InputField label="เวลา" name="funeralTime" value={formData.funeralTime} onChange={handleInputChange} minWidth="min-w-[30px]" />
            <span>และมีความประสงค์จะเผาใน</span>
          </div>
          <div className="flex gap-1 self-start mt-3.5 whitespace-nowrap">
            <div className="flex shrink-0 rounded-sm h-[9px] w-[89px]" />
            <InputField label="อัตราค่าบริการ" name="serviceFee" value={formData.serviceFee} onChange={handleInputChange} minWidth="min-w-[30px]" />
            <span>บาท</span>
          </div>
          <p className="self-start mt-3.5">พร้อมคำร้องขอนี้ข้าพเจ้าได้แนบหลักฐานและเอกสารมาด้วยดังนี้ คือ</p>
          <ul className="list-disc list-inside mt-3">
            <li>สำเนาใบมรณะบัตร</li>
            <li className="mt-4">สำเนาทะเบียนบ้าน(ผู้ตาย)</li>
            <li className="mt-3.5">สำเนาบัตรประจำตัวประชาชน(ผู้ยื่นคำร้อง)</li>
          </ul>
          <p className="self-center mt-3">ทั้งนี้ ขอให้เทศบาลตำบลแม่มึงดำเนินการให้ข้าพเจ้าตามประสงค์ โดยข้าพเจ้ายินดี</p>
          <p className="self-start mt-4">เสียค่าธรรมเนียมต่าง ๆ ตามระเบียบของเทศบาลตำบลแม่จัน</p>
          <div className="flex gap-1 self-end mt-3.5 whitespace-nowrap">
            <span>ลงชื่อ</span>
            <div className="flex shrink-0 self-start rounded-sm h-[9px] w-[68px]" />
            <span>ผู้ยื่นคำขอ</span>
          </div>
          <div className="">
            <div className="grow mr-0">( )</div>
            <div className="flex shrink-0 w-full rounded-sm h-[9px]" />
          </div>
        </section>
      </page>

      <style jsx>{`
        @media print {
          body, page {
            background: white;
            margin: 0;
            box-shadow: 0;
          }
        }

        page[size="A4"] {  
          width: 21cm;
          height: 29.7cm; 
        }

        .form-section {
          display: flex;
          flex-direction: column;
          width: 100%; /* Use full width for form section */
          margin: 0 auto; /* Center the form horizontally */
        }

        .form-title {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .organization-name {
          font-weight: bold;
          text-align: right;
          margin-bottom: 10px;
        }

        /* Centering styles */
        main {
          display: flex;
          justify-content: center;
          align-items: center; /* Center vertically */
          height: 100vh; /* Full height for centering */
        }
      `}</style>
    </main>
  );
};

export default FuneralPermissionForm;
