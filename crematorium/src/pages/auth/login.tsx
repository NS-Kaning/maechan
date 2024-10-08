import { AuthCredentials, useFrappeAuth } from 'frappe-react-sdk';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
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
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    const credentials: AuthCredentials = {
      username,
      password,
    };
    setLoading(true);
    try {
      await login(credentials);
      await updateCurrentUser();
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Login failed!');
    } finally {
      setLoading(false); 
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative flex flex-col pt-6 bg-white h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-20 w-full max-h-6">
        <div className="flex items-center gap-10">
          <a href="#" className="text-base font-bold">หน้าหลัก</a>
          <a href="#" className="text-sm">ประวัติ</a>
        </div>
        {/* <a href="#" className="text-sm">สำหรับเจ้าหน้าที่</a> */}
      </div>

      <div className="mt-6 w-full border border-zinc-120"></div>

      {/* Main Login Area */}
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
              disabled={isLoading || loading} // Disable when loading
              type="button"
              className="justify-center px-16 py-2.5 mt-6 text-sm text-white bg-black rounded-md max-md:pr-7 max-md:pl-6"
            >
              {isLoading || loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
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

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
