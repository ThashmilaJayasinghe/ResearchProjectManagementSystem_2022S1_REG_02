// import React, { useState } from 'react';
// import {
// 	AppBar,
// 	Button,
// 	Tab,
// 	Tabs,
// 	Toolbar,
// 	Typography,
// 	useMediaQuery,
// 	useTheme,
// } from '@mui/material';
// import DrawerC from './DrawerC';
//
// function Header(props) {
//
// 	const [value, setValue] = useState(0);
// 	const [pages, setPages] = useState(props.pages);
//
// 	const theme = useTheme();
// 	console.log(theme);
// 	const isMatch = useMediaQuery(theme.breakpoints.down('md'));
// 	console.log(isMatch);
// 	return (
// 		<React.Fragment>
// 			<AppBar style={{ background: '#063970' }}>
// 				<Toolbar>
// 					{isMatch ? (
// 						<>
// 							<Typography style={{ paddingLeft: '10%' }}>
// 								Student Management
// 							</Typography>
// 							<DrawerC pages = {pages}/>
// 						</>
// 					) : (
// 						<>
// 							<Tabs
// 								textColor="inherit"
// 								value={value}
// 								onChange={(e, value) => setValue(value)}
// 								indicatorColor="secondary"
// 							>
//
// 								{
// 									pages.map((page, index) => {
// 										return <Tab key={index} label= {page} />
// 									})
// 								}
//
// 							</Tabs>
// 							<Button style={{ marginLeft: 'auto' }} variant="contained">
// 								Login
// 							</Button>
// 						</>
// 					)}
// 				</Toolbar>
// 			</AppBar>
// 		</React.Fragment>
// 	);
// }
// export default Header;

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout, reset} from "../features/authSlice";

export default function Header(){

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {user} = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return(
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{user && user.roles.includes('admin') ? (<>
							<li className="nav-item active">
								<a className="nav-link" href="/admin">AdminHome</a>
							</li>
							<li>
								<button className='btn' onClick={onLogout}>
									Logout
								</button>
							</li>
						</>) : user && user.roles.includes('staff') ? (<>
							<li className="nav-item active">
								<a className="nav-link" href="/supervisor">StaffHome</a>
							</li>
							<li>
								<button className='btn' onClick={onLogout}>
									Logout
								</button>
							</li>
						</>) : user && user.roles.includes('student') ? (<>
							<li className="nav-item active">
								<a className="nav-link" href="/admin">StudentHome</a>
							</li>
							<li>
								<button className='btn' onClick={onLogout}>
									Logout
								</button>
							</li>
						</>) : (<>
							<li className="nav-item active">
								<a className="nav-link" href="/login">Login</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" href="/register">Register</a>
							</li>
						</>)}
					</ul>
				</div>
			</nav>
		</div>
	)

}
