import { Button, IconButton } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Flex } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Card from "../../components/common/Card";
import CustomHeading from "../../components/common/Heading";
import CustomLink from "../../components/common/Link";
import CustomText from "../../components/common/Text";
import { login } from "../../redux/actions/auth";
import { pxToEm } from "../../utils/commonMethods";
import { useToast } from "@chakra-ui/react";
import microValidator from "micro-validator";
const Login = (props) => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const dispatch = useDispatch();
	const toast = useToast();
	const navigate = useNavigate();
	const { data: loginResponse } = useSelector((state) => state?.auth?.Login);
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (loginResponse?.success) {
			localStorage.setItem("Auth-token", loginResponse?.token);
			localStorage.setItem("isAuthenticated", true);
			localStorage.setItem("user", loginResponse?.data?.data?.name);
			setLoading(false);
			navigate("/home");
		}
		if (loginResponse && loginResponse?.status !== 200) {
			toast({
				title: "An error occurred",
				status: "error",
				isClosable: true,
			});
		}
	}, [dispatch, loginResponse]);

	const inputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const validate = (data) => {
		const errors = microValidator.validate(
			{
				email: {
					// required: {
					//   errorMsg: `Email is required`,
					// },
					email: {
						errorMsg: `Enter a valid email`,
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
		setError({ ...error, email: errors.email, password: errors.password });
		return errors;
	};

	const loginClick = (e) => {
		e.preventDefault();
		setLoading(true);
		const err_resp = validate(data) || {};
		if (Object.keys(err_resp).length === 0) {
			// 	dispatch(loginLoading());
			dispatch(login(data));
			// 	dispatch(getLoginData(data));
		}
		if (Login?.data?.success) {
			
			localStorage.setItem("Auth-token", Login?.data?.token);
			localStorage.setItem("user", Login?.data?.data);
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
								<CustomHeading content="Log in" variant="md" fontSize="24px" />
							</Flex>
							<form onSubmit={loginClick}>
								<FormControl>
									<Flex
										flexDirection="column"
										alignItems="start"
										justifyContent="start"
									>
										<CustomText
											color="Primary.black"
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
											<CustomText mt={pxToEm(8)} color="red.400" variant="sm">
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
											<Input
												pr="4.5rem"
												name="password"
												isInvalid={error?.password?.length ? true : false}
												type={show ? "text" : "password"}
												placeholder="Enter password"
												onChange={(e) => inputChange(e)}
											/>
											<InputRightElement
												width="3.5rem"
												pr={pxToEm(8)}
												children={
													<Button
														onClick={handleClick}
														h="1.75rem"
														size="sm"
														px="5px"
														_focus={{ boxShadow: "none" }}
													>
														{show ? "Hide" : "Show"}
													</Button>
												}
											/>
										</InputGroup>
										{error?.password?.length > 0 && (
											<CustomText mt={pxToEm(8)} color="red.400" variant="xm">
												{/* <WarningFill /> */}
												&nbsp;{error?.password}
											</CustomText>
										)}
									</Flex>
								</FormControl>
								<FormControl mt="24px">
									<Button type="submit" w="full" h="36px" colorScheme="blue">
										Log in
									</Button>
								</FormControl>
							</form>
							<Center py={`${pxToEm(14)}`} justifyContent="space-around">
								<CustomText variant="sm" color="black">
									Don't have an account?&nbsp;
									<CustomLink link="/signup" color="blue" isLoading={loading}>
										Sign up
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

export default Login;
