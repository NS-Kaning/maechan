import { FrappeProvider } from 'frappe-react-sdk'
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import Login from './pages/Login';

function App() {

	return (
		<div className="App">

			<NextUIProvider>
				<FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
					<AuthProvider>
					<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
						<Routes>
							<Route path='/' element={<Login/>}/>
							<Route path="/license" element={<h1>License</h1>}>
								
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
