import { Box } from "@chakra-ui/layout";
import React from "react";
import { pxToEm } from "../../utils/commonMethods";

const Card = (props) => {
	const {
		children,
		minW,
		alignItems,
		borderRadius,
		border,
		minH,
		p,
		w,
		...rest
	} = props;
	return (
		<Box
			minW={minW ? minW : "fit-content"}
			alignItems={alignItems ? alignItems : { sm: "flex-end", lg: "unset" }}
			boxShadow="0px 2px 5px 3px rgba(0, 0, 0, 0.02)"
			borderRadius={borderRadius ? borderRadius : "8px"}
			border={border ? border : "1px solid #E4E9F0"}
			minH={minH ? minH : "216px"}
			p={p ? p : pxToEm(20)}
			w={w ? w : "100%"}
			bg="white"
			fontSize="14px"
			{...rest}
		>
			{children}
		</Box>
	);
};

export default Card;
