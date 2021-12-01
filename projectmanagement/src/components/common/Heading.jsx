import { Heading } from "@chakra-ui/layout";
import React from "react";

const CustomHeading = (props) => {
	const { children, content, ...rest } = props;
	return <Heading {...rest}>{content ? content : children}</Heading>;
};

export default CustomHeading;
