import { useEffect } from 'react';
import './App.css';
import { FrappeProvider, useFrappeAuth } from 'frappe-react-sdk';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';

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
			element: <div>Hello world!</div>,
		},
		{
			path: '/about',
			element: <div>About</div>,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: 'dashboard',
			children: [
				{
					path: '',
					element: <Dashboard></Dashboard> ,
					index: true,
				},
				{
					path: 'guard',
					element: (
						<LoginGuard>
							<h1>Hello World</h1>
						</LoginGuard>
					),
				},
			],
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
