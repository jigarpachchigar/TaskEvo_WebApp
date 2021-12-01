import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React, { useState ,useEffect} from "react";

import { useNavigate } from "react-router";
import CustomText from "./Text";
import { useDispatch,useSelector} from "react-redux";
import { logout } from "../../redux/actions/auth";

const Header = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { data: logoutResponse } = useSelector((state) => state?.auth?.Logout);
	const log = () => {
		dispatch(logout())
	};
	useEffect(() => {
		if (logoutResponse?.success) {
			localStorage.clear();
			navigate("/");
		}
		
	}, [logoutResponse?.success]);
const user=useSelector(state=>state?.auth?.Login?.data?.data?.name)
	return (
		<Flex
			bg="blue.300"
			w="full"
			h="50px"
			p="20px"
			alignItems="center"
			justifyContent="space-between"
		>
			<CustomText variant="sm">Task Management</CustomText>
			<Menu isLazy>
				<MenuButton>
					{user}
				</MenuButton>
				<MenuList>
					<MenuItem onClick={log}>Logout</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default Header;
