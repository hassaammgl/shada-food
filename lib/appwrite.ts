import { CreateUserParams, SignInParams } from "@/type";
import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "",
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "",
	projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME ?? "",
	platform: "com.hassaammgl.shada_foods",
	databaseId: "68eff6a200100474f6ba",
	collectionId: "user",
};
// user;

const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setPlatform(appwriteConfig.platform)
	.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

const avatars = new Avatars(client);

export const createUser = async ({
	email,
	password,
	name,
}: CreateUserParams) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			name
		);

		if (!newAccount) {
			throw Error;
		}

		await signIn({ email, password });

		const avatarUrl = avatars.getInitialsURL(name);

		return await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.collectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				name,
				avatar: avatarUrl,
			}
		);
	} catch (e) {
		throw new Error(e as string);
	}
};

export const signIn = async ({ email, password }: SignInParams) => {
	try {
		const session = await account.createEmailPasswordSession(
			email,
			password
		);
		console.log(session);
	} catch (e) {
		throw new Error(e as string);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.collectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;
		return currentUser.documents[0];
	} catch (e) {
		throw new Error(e as string);
	}
};
