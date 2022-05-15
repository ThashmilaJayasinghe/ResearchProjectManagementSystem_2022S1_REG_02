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
