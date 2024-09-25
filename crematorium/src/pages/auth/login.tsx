import { AuthCredentials, useFrappeAuth } from 'frappe-react-sdk';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent: React.FC = () => {
  const {
    currentUser,
    isValidating,
    isLoading,
    login,
    logout,
    error,
    updateCurrentUser,
    getUserCookie,
  } = useFrappeAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  const handleLogin = async () => {
    const credentials: AuthCredentials = {
      username,
      password,
    };
    try {
      await login(credentials);
      await updateCurrentUser();
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Login failed!');
    }
  };


  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col pt-6 bg-white h-screen">
      <div className="flex justify-between items-center px-20 w-full max-h-6">
        <div className="flex items-center gap-10">
          <a href="#" className="text-base font-bold">หน้าหลัก</a>
          <a href="#" className="text-sm">ประวัติ</a>
        </div>
        <a href="#" className="text-sm">สำหรับเจ้าหน้าที่</a>
      </div>

      <div className="mt-6 w-full border border-zinc-120"></div>

      <div className="flex flex-col items-center justify-center bg-zinc-100 bg-opacity-100" style={{ width: '100%', height: '100%' }}>
        <div className="flex items-center justify-center mt-[-150px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6af0b2fc646d407ec3b95c5514da7850482402df51d346618df500b9fee0b7d7?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
            style={{ width: '65px' }}
            className="aspect-square"
            alt="Logo"
          />
        </div>

        <div className="text-center text-sm font-bold text-black pt-3">
          LOGIN TO BOOK CREMATORIUM

          <div className="flex flex-col self-stretch px-9 py-11 mt-6 bg-white rounded-xl">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-4 pointer-events-none">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b961fc12893165df6e5aa85bebc932ef8ead11595d4ef16d8266eae41c4a1c3d?"
                  alt="User Icon"
                />
              </div>
              <input
                type="text"
                id="codeid-input"
                aria-describedby="helper-text-explanation"
                className="flex flex-col justify-center px-7 py-2.5 rounded-md bg-gray-200 bg-opacity-70"
                style={{ paddingLeft: '40px' }}
                placeholder="Enter Code ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative mt-5">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-4 pointer-events-none">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c039750a8177d7f5e2c10f30a94fe08f0a348ca84e4836a1adc2b5b938252a04?placeholderIfAbsent=true&apiKey=bf0b86e0707a42aa8acd2aa478f17610"
                  alt="Phone Icon"
                />
              </div>
              <input
                type="password"
                id="phone-input"
                aria-describedby="helper-text-explanation"
                className="flex flex-col justify-center px-7 py-2.5 rounded-md bg-gray-200 bg-opacity-70"
                style={{ paddingLeft: '40px' }}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              type="button"
              className="justify-center px-16 py-2.5 mt-6 text-sm text-white bg-black rounded-md max-md:pr-7 max-md:pl-6"
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              
            </button>

            <div className="pt-5">
              <p>หรือ</p>
            </div>

            <button
              onClick={() => handleNavigate('/register')}
              type="button"
              className="justify-center px-16 py-2.5 mt-6 text-sm text-[#000] bg-[#EEEEEE] rounded-md max-md:pr-7 max-md:pl-6"
            >
              ลงทะเบียน
            </button>

            {error && <div className="text-red-500 mt-2">{error.message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
