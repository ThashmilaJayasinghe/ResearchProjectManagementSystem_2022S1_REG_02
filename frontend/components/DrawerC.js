import React, { useState } from 'react';
import {
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import PeopleIcon from '@mui/icons-material/People';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';

const DrawerC = (props) => {

	const [openDrawer, setOpenDrawer] = useState(false);
	const [pages, setPages] = useState(props.pages);

	return (
		<React.Fragment>
			<Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
				<List>
					{pages.map((page, index) => (
						<ListItemButton onClick={() => setOpenDrawer(false)} key={index}>
							<ListItemIcon>
								{/* {index % 2 === 0 ? <PeopleIcon /> : <LibraryBooksIcon />} */}
								<ListItemText>{page}</ListItemText>
							</ListItemIcon>
						</ListItemButton>
					))}
				</List>
			</Drawer>
			<IconButton
				style={{ color: 'white', marginLeft: 'auto' }}
				onClick={() => setOpenDrawer(!openDrawer)}
			>
				<MenuIcon />
			</IconButton>
		</React.Fragment>
	);
};

export default DrawerC;
