import React from "react";
import { useHistory } from "react-router-dom";

import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
	const history = useHistory();
	return (
		<>
			{history.location.pathname === "/" ? (
				<div className="bg-gray-800 min-h-screen flex flex-col justify-center">
					<div>{children}</div>
				</div>
			) : (
				<div className="bg-gray-200 min-h-screen">
                <div className="md:flex min-h-screen">
                    <Sidebar/>
                    <main className="md:w-4/5 p-5 md:min-h-screen">
                        {/* <Header/> */}
                        {children}
                    </main>
                </div>
            </div>
			)}
		</>
	);
};

export default Layout;
