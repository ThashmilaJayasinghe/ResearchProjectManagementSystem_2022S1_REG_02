import React, { useState } from 'react';
import {
	AppBar,
	Button,
	Tab,
	Tabs,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import DrawerC from './DrawerC';

function Header(props) {

	const [value, setValue] = useState(0);
	const [pages, setPages] = useState(props.pages);

	const theme = useTheme();
	console.log(theme);
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));
	console.log(isMatch);
	return (
		<React.Fragment>
			<AppBar style={{ background: '#063970' }}>
				<Toolbar>
					{isMatch ? (
						<>
							<Typography style={{ paddingLeft: '10%' }}>
								Student Management
							</Typography>
							<DrawerC pages = {pages}/>
						</>
					) : (
						<>
							<Tabs
								textColor="inherit"
								value={value}
								onChange={(e, value) => setValue(value)}
								indicatorColor="secondary"
							>

								{
									pages.map((page, index) => {
										return <Tab key={index} label= {page} />
									})
								}

							</Tabs>
							<Button style={{ marginLeft: 'auto' }} variant="contained">
								Login
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
export default Header;

// import React from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";
// import {logout, reset} from "../features/auth/authSlice";
//
// export default function NavBar(){
//
// 	const navigate = useNavigate()
// 	const dispatch = useDispatch()
//
// 	const {user} = useSelector((state) => state.auth)
//
// 	const onLogout = () => {
// 		dispatch(logout())
// 		dispatch(reset())
// 		navigate('/')
// 	}
//
// 	return(
// 		<div>
// 			<nav className="navbar navbar-expand-lg navbar-light bg-light">
// 				<a className="navbar-brand" href="#">Agri Products</a>
// 				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
// 						aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// 					<span className="navbar-toggler-icon"></span>
// 				</button>
// 				<div className="collapse navbar-collapse" id="navbarNav">
// 					<ul className="navbar-nav">
// 						{user && user.role === 'admin' ? (<>
//
// 						</>) : user && user.role === 'staff' ? (<>
//
// 						</>) : user && user.role === 'supervisor' ? (<>
//
// 						</>) : user && user.role === 'panel' ? (<>
//
// 						</>) : user && user.role === 'student' ? (<>
//
// 						</>) : (<>
//
// 						</>)}
// 					</ul>
// 				</div>
// 			</nav>
// 		</div>
// 	)
//
// }
