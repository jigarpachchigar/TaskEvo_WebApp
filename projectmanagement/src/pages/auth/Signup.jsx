import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/common/Card";
import { pxToEm } from "../../utils/commonMethods";
import CustomLink from "../../components/common/Link";
import CustomText from "../../components/common/Text";
import CustomHeading from "../../components/common/Heading";
import { logout, signup } from "../../redux/actions/auth";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import microValidator from "micro-validator";

const Signup = (props) => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const dispatch = useDispatch();
	const toast = useToast();
	const { data: registerResponse } = useSelector(
		(state) => state?.auth?.Register
	);
	const navigate = useNavigate();
	const [data, setData] = useState({ name: "", email: "", password: "" });
	const [error, setError] = useState({ name: "", email: "", password: "" });
	const inputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		if (registerResponse?.success) {
			navigate("/");
			dispatch(logout());
		}
		if (registerResponse && registerResponse?.status !== 201) {
			toast({
				title: "An error occurred",
				status: "error",
				isClosable: true,
			});
		}
	}, [dispatch, registerResponse]);

	const validate = (data) => {
		const errors = microValidator.validate(
			{
				email: {
					email: {
						errorMsg: `Enter a valid email`,
					},
				},
				name: {
					required: {
						errorMsg: `Name is required`,
					},
				},

				password: {
					required: {
						errorMsg: `Password is required`,
					},
				},
			},
			data
		);
		setError({
			...error,
			name: errors.name,
			email: errors.email,
			password: errors.password,
		});
		return errors;
	};
	const loginClick = (e) => {
		e.preventDefault();
		const err_resp = validate(data) || {};
		if (Object.keys(err_resp).length === 0) {
			dispatch(signup(data));
		}
	};
	return (
		<Box
			w="full"
			h="100vh"
			bg="linear-gradient(180deg, #1894FF 0%, #1072C6 0.01%, #07355F 100%);"
		>
			<Center position="fixed" top="0" bottom="0" left="0" right="0">
				<Box>
					<Card
						w={["270px", "400px", "472px", "472px"]}
						padding="0 43px 31px 43px"
						border="none"
					>
						<Box p={`${pxToEm(55)} ${pxToEm(6)} ${pxToEm(5)} ${pxToEm(6)}`}>
							<Center display="flex" flexDirection="column" w="100%">
								<Box>
									{/* <Image src="" alt="Management app" h="38.68px" w="38.68px" /> */}
								</Box>
								<Box>
									<CustomHeading
										color="black"
										content="Task Management"
										variant="xl"
									/>
								</Box>
							</Center>
						</Box>
						<Box w="full">
							<Flex w="full" py={pxToEm(16)}>
								<CustomHeading content="Sign up" variant="md" fontSize="24px" />
							</Flex>
							<form onSubmit={loginClick}>
								<FormControl>
									<Flex
										flexDirection="column"
										alignItems="start"
										justifyContent="start"
									>
										<CustomText color="black" variant="sm" text="Name" />
										<Input
											name="name"
											isInvalid={error?.name?.length ? true : false}
											type="text"
											placeholder="E.g. John Doe"
											onChange={(e) => inputChange(e)}
										/>
										{error?.email?.length > 0 && (
											<CustomText mt={pxToEm(8)} color="red" variant="sm">
												{/* <WarningFill /> */}
												&nbsp;{error?.email}
											</CustomText>
										)}
									</Flex>
								</FormControl>
								<FormControl mt="12px">
									<Flex
										flexDirection="column"
										alignItems="start"
										justifyContent="start"
									>
										<CustomText
											color="black"
											variant="sm"
											text="E-mail address"
										/>
										<Input
											name="email"
											isInvalid={error?.email?.length ? true : false}
											type="text"
											placeholder="E.g. johndoe@gmail.com"
											onChange={(e) => inputChange(e)}
										/>
										{error?.email?.length > 0 && (
											<CustomText mt={pxToEm(8)} color="red" variant="sm">
												{/* <WarningFill /> */}
												&nbsp;{error?.email}
											</CustomText>
										)}
									</Flex>
								</FormControl>
								<FormControl mt="12px">
									<Flex
										flexDirection="column"
										alignItems="start"
										justifyContent="start"
									>
										<CustomText color="black" variant="sm" text="Password" />
										<InputGroup>
											<InputRightElement
												w="22px"
												pr={pxToEm(15)}
												children={
													<IconButton
														label="show-hide"
														onClick={handleClick}
														icon={show ? "ShowIcon" : "HideIcon"}
													/>
												}
											/>
											<Input
												name="password"
												isInvalid={error?.password?.length ? true : false}
												type={show ? "text" : "password"}
												placeholder="Enter password"
												onChange={(e) => inputChange(e)}
											/>
										</InputGroup>
										{error?.password?.length > 0 && (
											<CustomText
												mt={pxToEm(8)}
												color="Secondary.magenta"
												variant="xm"
											>
												{/* <WarningFill /> */}
												&nbsp;{error?.password}
											</CustomText>
										)}
									</Flex>
								</FormControl>
								<FormControl mt="24px">
									<Button type="submit" w="full" h="36px" colorScheme="blue">
										Sign up
									</Button>
								</FormControl>
							</form>
							<Center py={`${pxToEm(14)}`} justifyContent="space-around">
								<CustomText variant="sm" color="black">
									Already have an account?&nbsp;
									<CustomLink link="/" color="blue">
										Sign In
									</CustomLink>
								</CustomText>
								{/* <CustomLink link="/forgot-password" color="black">
									<CustomText
										text="Forgot your password?"
										variant="sm"
										color="black"
									/>
								</CustomLink> */}
							</Center>
						</Box>
					</Card>
				</Box>
			</Center>
		</Box>
	);
};

export default Signup;
