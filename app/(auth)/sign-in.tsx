import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SignIn = () => {
	return (
		<View>
			<Text>SignIn</Text>
			<Button
				title="Signup"
				onPress={() => router.push("/sign-up")}
			></Button>
		</View>
	);
};

export default SignIn;
