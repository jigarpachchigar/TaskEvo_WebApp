import { Text } from "@chakra-ui/layout";
import React from "react";

const CustomText = (props) => {
	const { children, text, ...rest } = props;
	return <Text {...rest}>{text ? text : children}</Text>;
};

export default CustomText;
