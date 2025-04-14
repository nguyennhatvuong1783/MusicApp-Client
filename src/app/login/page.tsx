"use client";

import BtnTxtImg from "@/components/Buttons/BtnTxtImg";
import {
    Apple,
    FacebookColor,
    Google,
    MusicChat,
} from "@/components/icons/Icons";
import TextboxLogin from "@/components/Textbox/TextboxLogin";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormData } from "@/types/auth";
import { login } from "@/lib/callApi";
import { useAuth } from "@/hooks/useAuth";

// Định nghĩa schema
const loginSchema = z.object({
    identity: z.string().min(1, "Please enter your username or email address."),
    password: z.string().min(1, "Please enter your password."),
});

type RawLoginInput = z.infer<typeof loginSchema>;

export default function Login() {
    const { handleLogin } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RawLoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: RawLoginInput) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identity);
        const loginData: LoginFormData = {
            ...(isEmail
                ? { email: data.identity }
                : { username: data.identity }),
            password: data.password,
        };

        console.log("Dữ liệu gửi đi:", loginData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await login(loginData);
        if (user.error) {
            const error = user.error;
            setError("identity", {
                type: "manual",
                message: Array.isArray(error as string[])
                    ? (error as string[]).join(", ")
                    : (error as string),
            });
            setError("password", {
                type: "manual",
                message: Array.isArray(error as string[])
                    ? (error as string[]).join(", ")
                    : (error as string),
            });
            return;
        }
        const expires = Date.now() + 3600 * 1000; // 1 tiếng
        document.cookie = `token=${user.data.access_token}; path=/; max-age=3600`;
        localStorage.setItem("myCookieExpires", expires.toString());
        handleLogin();
    };

    return (
        <div className="flex items-center justify-center bg-(image:--gradient-color-login) md:p-8">
            <div className="flex min-h-screen w-full flex-col items-center justify-start bg-(--main-color) px-8 pb-8 md:h-auto md:min-h-auto md:w-[734px] md:rounded-md md:px-25">
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                    <Link href="/">
                        <MusicChat className="h-9 w-9 cursor-pointer" />
                    </Link>
                    <h1 className="text-center text-3xl font-bold">Log in</h1>
                </div>

                <div className="flex w-full flex-col justify-center md:w-auto">
                    <BtnTxtImg
                        text="Continue with Google"
                        Icon={<Google className="h-6 w-6" />}
                    />
                    <BtnTxtImg
                        text="Continue with Facebook"
                        Icon={<FacebookColor className="h-6 w-6" />}
                    />
                    <BtnTxtImg
                        text="Continue with Apple"
                        Icon={<Apple className="h-6 w-6" />}
                    />
                    <BtnTxtImg text="Continue with phone number" />
                </div>

                <hr className="my-9 w-full border-[#292929]" />

                {/* Form đăng nhập */}
                <form
                    className="w-full md:w-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col justify-center">
                        <div className="mb-2">
                            <TextboxLogin
                                label="Email or username"
                                placeholder="Email or username"
                                register={register("identity")}
                                error={errors.identity?.message}
                            />
                        </div>
                        <div>
                            <TextboxLogin
                                label="Password"
                                placeholder="Password"
                                isPassword
                                register={register("password")}
                                error={errors.password?.message}
                            />
                        </div>
                        <div className="my-6 rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90 md:box-content md:w-65"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-2 mb-9 flex flex-col items-center gap-y-2 md:flex-row">
                    <span className="text-(--secondary-text-color)">{`Don't have an account?`}</span>
                    <Link
                        href="/signup"
                        className="underline decoration-2 underline-offset-1 transition-normal duration-200 outline-none focus-within:text-(--green-color) focus-within:decoration-3 focus-within:underline-offset-8 hover:text-(--green-color) md:ml-2"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
