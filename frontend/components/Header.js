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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import Button from '@mui/material/Button';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	const adminItems = [
		{
			text: 'AdminDash',
			onClick: () => navigate('/admin'),
		},
		{
			text: 'Submissions',
			onClick: () => navigate('/managesubmissions'),
		},
		{
			text: 'Panels',
			onClick: () => navigate('/managePanels')
		},
		{
			text: 'MarkingSchemes',
			onClick: () => navigate('/markingSchemes')
		},
		{
			text: 'Logout',
			onClick: () => onLogout(),
		},
	];

	const staffItems = [
		{
			text: 'StaffDash',
			onClick: () => navigate('/staff')
		},
		{
			text: 'Supervisor',
			onClick: () => navigate('/supervisor')
		},
		{
			text: 'Co-supervisor',
			onClick: () => navigate('/co-supervisor')
		},
		{
			text: 'Panel member',
			onClick: () => navigate('/panelMember')
		},
		{
			text: 'Profile',
			onClick: () => navigate('/staff/profile')
		},
		{
			text: 'Logout',
			onClick: () => onLogout(),
		},
	];

	const studentItems = [
		{
			text: 'Student',
			onClick: () => navigate('/student'),
		},
		{
			text: 'Submissions',
			onClick: () => navigate('/submissions'),
		},
		{
			text: 'Group',
			onClick: () => navigate('/group'),
		},
		{
			text: 'Research Fields',
			onClick: () => navigate('/researchFields'),
		},
		{
			text: 'Instructors',
			onClick: () => navigate('/instructor'),
		},
		{
			text: 'Logout',
			onClick: () => onLogout(),
		},
	];

	const Items = [
		{
			text: 'Login',
			onClick: () => navigate('/login'),
		},
		{
			text: 'Register',
			onClick: () => navigate('/register'),
		},
	];

	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static" style={{ background: 'primary' }}>
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
							{user && user.roles.includes('admin')
								? adminItems.map((adminItem) => {
										const { text, onClick } = adminItem;
										return (
											<MenuItem key={text} onClick={onClick}>
												<Typography textAlign="center">{text}</Typography>
											</MenuItem>
										);
								  })
								: user && user.roles.includes('staff')
								? staffItems.map((staffItem) => {
										const { text, onClick } = staffItem;
										return (
											<MenuItem key={text} onClick={onClick}>
												<Typography textAlign="center">{text}</Typography>
											</MenuItem>
										);
								  })
								: user && user.roles.includes('student')
								? studentItems.map((studentItem) => {
										const { text, onClick } = studentItem;
										return (
											<MenuItem key={text} onClick={onClick}>
												<Typography textAlign="center">{text}</Typography>
											</MenuItem>
										);
								  })
								: Items.map((Item) => {
										const { text, onClick } = Item;
										return (
											<MenuItem key={text} onClick={onClick}>
												<Typography textAlign="center">{text}</Typography>
											</MenuItem>
										);
								  })}
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
						{user && user.roles.includes('admin')
							? adminItems.map((adminItem) => {
									const { text, onClick } = adminItem;
									return (
										<Button
											key={text}
											onClick={onClick}
											sx={{ my: 2, color: 'white', display: 'block' }}
										>
											{text}
										</Button>
									);
							  })
							: user && user.roles.includes('staff')
							? staffItems.map((staffItem) => {
									const { text, onClick } = staffItem;
									return (
										<Button
											key={text}
											onClick={onClick}
											sx={{ my: 2, color: 'white', display: 'block' }}
										>
											{text}
										</Button>
									);
							  })
							: user && user.roles.includes('student')
							? studentItems.map((studentItem) => {
									const { text, onClick } = studentItem;
									return (
										<Button
											key={text}
											onClick={onClick}
											sx={{ my: 2, color: 'white', display: 'block' }}
										>
											{text}
										</Button>
									);
							  })
							: Items.map((Item) => {
									const { text, onClick } = Item;
									return (
										<Button
											key={text}
											onClick={onClick}
											sx={{ my: 2, color: 'white', display: 'block' }}
										>
											{text}
										</Button>
									);
							  })}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
