"use client";

import { FormEvent, useState } from "react";
import InputTextLabeled from "./common/form/InputTextLabeled";
import { redirect } from "next/navigation";
import { authClient } from "@/utils/authClient";

export default function AuthForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const doSignin = async (event: FormEvent) => {
		event.preventDefault();
		// TODO: properly handle validation
		setIsLoading(true);

		const signUpResponse = await authClient.signIn.email(formData);
		if (signUpResponse.data?.user) {
			redirect("/dashboard");
		} else {
			setIsLoading(false);
			// TODO show error message
		}
	};

	return (
		<form className="space-y-4" onSubmit={doSignin}>
			<InputTextLabeled
				type="email"
				label={"email"}
				name={"email"}
				value={formData.email}
				placeholder={"just@in.time"}
				onChange={handleChange}
				className="flex flex-row items-baseline"
				disabled={isLoading}
			/>
			<InputTextLabeled
				type="password"
				label={"password"}
				name={"password"}
				value={formData.password}
				placeholder={"********"}
				onChange={handleChange}
				className="flex flex-row items-baseline"
				disabled={isLoading}
			/>

			<div className="flex flex-row justify-evenly">
				<button
					type="submit"
					className="bg-primary hover:bg-accent flex rounded-sm px-4 py-2 font-bold text-white disabled:bg-blue-900 disabled:text-gray-400 disabled:hover:bg-blue-900"
					disabled={isLoading}
				>
					{isLoading ? "Signing in..." : "Sign In"}
				</button>
			</div>
		</form>
	);
}
