import React from "react";
import Header from "../common/Header";

const Layout = ({ children }) => {
	return (
		<>
			<header style={{ maxWidth: "100vw" }}>
				<Header />
			</header>
			<main style={{ maxWidth: "100vw" }}>{children}</main>
		</>
	);
};

export default Layout;
