import { useFrappeAuth } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { logout } = useFrappeAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">ยินดีต้อนรับสู่ระบบริการประชาชน</h1>
            <button
                onClick={handleLogout}
                type="button"
                className="justify-center px-16 py-2 mt-2 text-sm text-white bg-red-500 rounded-md max-md:pr-7 max-md:pl-6"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
