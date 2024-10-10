import { useEffect } from 'react';
import './App.css';
import { FrappeProvider, useFrappeAuth } from 'frappe-react-sdk';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register'
import Home from './pages/Home';
import Booking from './pages/booking';
import Doc from './pages/doc ';
import HISTORY from './pages/history';
import Line from './pages/line';
import OTP from './pages/otp';
import SUCCES from './pages/succes';
import TRANFER from './pages/tranfer';
import FileUploadComponent from './pages/component/FileUploadComponent';
import FuneralPermissionForm from './pages/fromComponents/FuneralPermissionForm';
import { MyDocumentList } from './pages/component/MyDocumentList';
import Stepper from './pages/steper';
import Print from './pages/print';

// LoginGuard Component
const LoginGuard = ({ children }: React.PropsWithChildren) => {
	const { currentUser, isLoading } = useFrappeAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !currentUser) {
			navigate('/login');
		}
	}, [isLoading, currentUser, navigate]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <main>{children}</main>;
};

// App Component
function App() {
	const router = createBrowserRouter([
		
		{
			path: '/',
			element: <Login />,
		},
		{
			path : '/print/:name',
			element : <Print/>
		},
		// {
		// 	path : '/print',
		// 	element : <Print/>
		// },
		{
			path: '/register',
			element: <Register />,
		},
		{
			path: 'Home',
			children: [
				{
					path: '',
					element: <Home></Home>,
					index: true,
				},
				{
					path: 'guard',
					element: (
						<LoginGuard>
							<h1>plases login</h1>
						</LoginGuard>
					),
				},
			],
		},
		{
			path: '/Booking/:name',
			element: <Booking />,
		},
		{
			path: '/doc/:name',
			element: <Doc />,
		},
		{
			path: '/history',
			element: <HISTORY />,
		},
		{
			path: '/line',
			element: <Line/>,
		},
		{
			path: '/otp',
			element: <OTP/>,
		},
		{
			path: '/succes',
			element: <SUCCES/>,
		},
		{
			path: '/tranfer/:name',
			element: <TRANFER/>,
		},
		{
			path: '/FileUploadComponent',
			element: <FileUploadComponent attachment={undefined} success={undefined} error={undefined}/>,
		},
		{
			path: '/FuneralPermissionForm',
			element: <FuneralPermissionForm/>,
		},
		{
			path: '/MyDocumentList',
			element: <MyDocumentList/>,
		},
		{
			path: '/Stepper',
			element: <Stepper/>,
		},
	]);

	console.log(import.meta.env.VITE_FRAPPE_URL ?? '');

	return (
		<div className="App">
			<FrappeProvider url={import.meta.env.VITE_FRAPPE_URL ?? ''} socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
				<RouterProvider router={router} />
			</FrappeProvider>
		</div>
	);
}

export default App;
