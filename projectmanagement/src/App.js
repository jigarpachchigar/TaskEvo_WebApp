import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "./pages/home/Homepage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Box } from "@chakra-ui/layout";
import TasksPage from "./pages/Tasks/TasksPage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
	return (
		<Box minW="100vw" minH="100vh">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Homepage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/tasks"
					element={
						<ProtectedRoute>
							<TasksPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Box>
	);
}

export default App;
