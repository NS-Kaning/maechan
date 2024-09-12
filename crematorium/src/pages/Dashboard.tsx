import React, { useContext, useState } from 'react'
import { useFrappeAuth, FrappeContext } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';


function Test() {

    const frappeConfig = useContext(FrappeContext)

    const save = () => {

        frappeConfig?.db.createDoc('Crematorium', {
            crematory: 'test',
            crematorium_name: 't12'
        }).then((doc) => console.log(doc))
            .catch((error) => console.error(error));

    }
    return (<div>ADD DATA <button onClick={save}>SAVE</button></div>)
}


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
            <Test></Test>
        </div>
    );
}

export default Dashboard;
