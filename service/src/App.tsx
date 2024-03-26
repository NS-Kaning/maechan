import { FrappeProvider, useFrappeAuth } from 'frappe-react-sdk'
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import Login from './pages/Login';
import License from './pages/License/License';
import Register from './pages/Register';
import React, { useEffect } from 'react';
import LicenseDashboard from './pages/License/LicenseDashboard';
import MainPage from './pages/MainPage';

function App() {


	const LoginGuard = ({ children }: React.PropsWithChildren) => {

		const auth = useFrappeAuth()
		const navigate = useNavigate()

		useEffect(() => {
			if (auth.isLoading) {

			} else {
				if (!auth.currentUser) {
					navigate("/login")
				}
			}

		}, [auth.isLoading])

		return (
			<main>
				{children}
			</main>
		)
	}


	return (
		<div className="App">

			<NextUIProvider>
				<FrappeProvider siteName={import.meta.env.VITE_FRAPPE_URL ?? ''} socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
					<AuthProvider>
						<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
							<Routes>
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
								<Route path="/" element={<LoginGuard><MainPage /></LoginGuard>} >
									<Route index element={<LicenseDashboard />} />
									<Route path="license">
										<Route path='create' element={<h1>สร้างคำร้องขอใบอนุญาต</h1>} />
									</Route>

									<Route path="business">
									<Route index element={<h1>รายการกิจการ</h1>} />
										<Route path='create' element={<h1>สร้างคำร้องขอใบอนุญาต</h1>} />
									</Route>

								</Route>
							</Routes>
						</BrowserRouter>
					</AuthProvider>
				</FrappeProvider>
			</NextUIProvider>
		</div>
	)
}

export default App
