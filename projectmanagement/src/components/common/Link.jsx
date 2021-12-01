import React from "react";
import { Link as ReachLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
const CustomLink = (props) => {
	const { children, link, ...rest } = props;
	return (
		<Link as={ReachLink} to={link} {...rest}>
			{children}
		</Link>
	);
};

export default CustomLink;
