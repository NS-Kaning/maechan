import { FrappeProvider } from 'frappe-react-sdk'
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

	return (
		<div className="App">

			<NextUIProvider>
				<FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
					<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
						<Routes>
							<Route path='/' element={<h1>HELLO</h1>}/>
						</Routes>
					</BrowserRouter>
				</FrappeProvider>
			</NextUIProvider>
		</div>
	)
}

export default App
