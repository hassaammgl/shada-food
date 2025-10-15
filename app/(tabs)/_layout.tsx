import { Redirect, Slot } from "expo-router";

const _Layout = () => {
	const isAuthenticated: boolean = false;
	if (isAuthenticated) {
		return <Redirect href={"/(auth)/sign-in"} />;
	}
	return <Slot />;
};

export default _Layout;
