import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../features/authSlice";


const Header = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const [anchor, setAnchor] = React.useState(null); //for onClick

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleMenu = (event) => {
		setAnchor(event.currentTarget);
	};   // for onClick

	const navigate = useNavigate()
 	const dispatch = useDispatch()

	const {user} = useSelector((state) => state.auth)


	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return (
		<AppBar position="static" style={{ background: '#063970' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{user && user.roles.includes('admin') ? (<>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/admin"
								>
									<Typography textAlign="center" variant="h6"> AdminHome </Typography>
								</MenuItem>
								<MenuItem
									onClick={onLogout}
								>
									<Typography textAlign="center" variant="h6"> Logout </Typography>
								</MenuItem>
							</>) : user && user.roles.includes('staff') ? (<>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/supervisor"
								>
									<Typography textAlign="center" variant="h6"> StaffHome </Typography>
								</MenuItem>
								<MenuItem
									onClick={onLogout}
								>
									<Typography textAlign="center" variant="h6"> Logout </Typography>
								</MenuItem>
							</>) : user && user.roles.includes('student') ? (<>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/"
								>
									<Typography textAlign="center" variant="h6"> StudentHome </Typography>
								</MenuItem>
								<MenuItem
									onClick={onLogout}
								>
									<Typography textAlign="center" variant="h6"> Logout </Typography>
								</MenuItem>
							</>) : (<>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/login"
								>
									<Typography textAlign="center" variant="h6"> Login </Typography>
								</MenuItem>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/register"
								>
									<Typography textAlign="center" variant="h6"> Register </Typography>
								</MenuItem>
							</>)}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{user && user.roles.includes('admin') ? (<>
							<MenuItem
								onClick={() => setAnchor(null)}
								component={Link}
								to="/admin"
							>
								<Typography textAlign="center" variant="h6"> AdminHome </Typography>
							</MenuItem>
							<MenuItem
								onClick={onLogout}
							>
								<Typography textAlign="center" variant="h6"> Logout </Typography>
							</MenuItem>
						</>) : user && user.roles.includes('staff') ? (<>
							<MenuItem
								onClick={() => setAnchor(null)}
								component={Link}
								to="/supervisor"
							>
								<Typography textAlign="center" variant="h6"> StaffHome </Typography>
							</MenuItem>
							<MenuItem
								onClick={onLogout}
							>
								<Typography textAlign="center" variant="h6"> Logout </Typography>
							</MenuItem>
						</>) : user && user.roles.includes('student') ? (<>
							<MenuItem
								onClick={() => setAnchor(null)}
								component={Link}
								to="/"
							>
								<Typography textAlign="center" variant="h6"> StudentHome </Typography>
							</MenuItem>
							<MenuItem
								onClick={onLogout}
							>
								<Typography textAlign="center" variant="h6"> Logout </Typography>
							</MenuItem>
						</>) : (<>
							<MenuItem
								onClick={() => setAnchor(null)}
								component={Link}
								to="/login"
							>
								<Typography textAlign="center" variant="h6"> Login </Typography>
							</MenuItem>
							<MenuItem
								onClick={() => setAnchor(null)}
								component={Link}
								to="/register"
							>
								<Typography textAlign="center" variant="h6"> Register </Typography>
							</MenuItem>
						</>)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;