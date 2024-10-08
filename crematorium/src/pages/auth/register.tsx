import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FrappeContext, FrappeConfig } from 'frappe-react-sdk';

export interface RegisterFormData {
    email: string;
    password: string;
    verify_password: string;
    mobile_no: string;
    first_name: string;
    last_name: string;
}

export interface RegisterFormError extends RegisterFormData { }

const RegisterForm = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [credential, setCredential] = useState<RegisterFormData>({
        email: '',
        password: '',
        verify_password: '',
        mobile_no: '',
        first_name: '',
        last_name: ''
    });
    const [error, setError] = useState<RegisterFormError>({} as RegisterFormError);

    const navigate = useNavigate();
    const { call } = useContext(FrappeContext) as FrappeConfig;

    const validate = () => {
        let err = {} as RegisterFormError;
        let hasError = false;

        if (!credential.email) {
            err.email = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!credential.first_name) {
            err.first_name = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!credential.last_name) {
            err.last_name = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!credential.mobile_no) {
            err.mobile_no = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!credential.password) {
            err.password = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!credential.verify_password) {
            err.verify_password = "กรุณากรอกข้อมูล";
            hasError = true;
        } else if (credential.verify_password !== credential.password) {
            err.verify_password = "รหัสผ่านไม่ตรงกัน";
            hasError = true;
        }

        setError(err);
        return !hasError;
    };

    const doRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            try {
                await call.post("maechan.api.app_register", {
                    register: credential
                });
                alert('ลงทะเบียนสำเร็จ!');
                navigate('/');
            } catch (error) {
                console.error('Registration failed:', error);
                alert('การลงทะเบียนล้มเหลว! กรุณาลองอีกครั้ง');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCredential = (key: keyof RegisterFormData, value: string) => {
        setCredential(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="flex flex-col pt-6 bg-white h-screen">
            {/* Navigation */}
            <div className="flex justify-between items-center px-20 w-full max-h-6">
                <div className="flex items-center gap-10">
                    <a href="#" className="text-base font-bold">หน้าหลัก</a>
                    <a href="#" className="text-sm">ประวัติ</a>
                </div>
                {/* <a href="#" className="text-sm">สำหรับเจ้าหน้าที่</a> */}
            </div>

            <div className="mt-6 w-full border border-zinc-300"></div>

            {/* Form Section */}
            <div className="flex flex-col items-center justify-center bg-zinc-100 bg-opacity-100 ">
                {/* Logo */}
                <div className="flex items-center justify-center mt-[50px] ">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6af0b2fc646d407ec3b95c5514da7850482402df51d346618df500b9fee0b7d7?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                        style={{ width: '65px' }}
                        className="aspect-square"
                        alt="Logo"
                    />
                </div>
                <div className="text-center text-sm font-bold text-black pt-3">
                    LOGIN TO BOOK CREMATORIUM
                </div>

                {/* Register Form */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-8 mb-[30px]"> {/* Increased padding and width */}
                    <h2 className="text-center font-bold text-lg mb-4">ลงทะเบียน</h2>

                    {/* Inputs in two columns */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* First Name */}
                        <div className="relative">
                            <label className="block mb-1">ชื่อ</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="ชื่อ"
                                value={credential.first_name}
                                onChange={(e) => handleCredential('first_name', e.target.value)}
                            />
                            {error.first_name && <span className="text-red-500 text-sm">{error.first_name}</span>}
                        </div>

                        {/* Last Name */}
                        <div className="relative">
                            <label className="block mb-1">นามสกุล</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="นามสกุล"
                                value={credential.last_name}
                                onChange={(e) => handleCredential('last_name', e.target.value)}
                            />
                            {error.last_name && <span className="text-red-500 text-sm">{error.last_name}</span>}
                        </div>

                        {/* Mobile No */}
                        <div className="relative">
                            <label className="block mb-1">หมายเลขโทรศัพท์</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="หมายเลขโทรศัพท์"
                                value={credential.mobile_no}
                                onChange={(e) => handleCredential('mobile_no', e.target.value)}
                            />
                            {error.mobile_no && <span className="text-red-500 text-sm">{error.mobile_no}</span>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block mb-1">รหัสผ่าน</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="รหัสผ่าน"
                                value={credential.password}
                                onChange={(e) => handleCredential('password', e.target.value)}
                            />
                            {error.password && <span className="text-red-500 text-sm">{error.password}</span>}
                        </div>

                        {/* Verify Password */}
                        <div className="relative col-span-2">
                            <label className="block mb-1">ยืนยันรหัสผ่าน</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="ยืนยันรหัสผ่าน"
                                value={credential.verify_password}
                                onChange={(e) => handleCredential('verify_password', e.target.value)}
                            />
                            {error.verify_password && <span className="text-red-500 text-sm">{error.verify_password}</span>}
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        onClick={doRegister}
                        className="w-full bg-black text-white p-3 rounded-lg text-center font-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
                    </button>

                    <div className="text-center my-4">หรือ</div>

                    {/* Login Button */}
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-200 text-black p-3 rounded-lg text-center font-bold"
                    >
                        เข้าสู่ระบบ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
