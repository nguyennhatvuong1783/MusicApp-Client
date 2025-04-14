"use client";
import BtnTxtImg from "@/components/Buttons/BtnTxtImg";
import {
    Apple,
    FacebookColor,
    Google,
    MusicChat,
} from "@/components/icons/Icons";
import TextboxLogin from "@/components/Textbox/TextboxLogin";
import { useAuth } from "@/hooks/useAuth";
import { signup } from "@/lib/callApi";
import { SignupFormData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const phoneRegex = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);

const signupSchema = z
    .object({
        username: z.string().min(1, "Please enter your username."),
        email: z
            .string()
            .min(1, "Please enter your email.")
            .email("Invalid email address (name@domain.com)."),
        phone: z
            .string()
            .min(1, "Please enter your phone number.")
            .regex(phoneRegex, "Invalid Number."),
        password: z
            .string()
            .min(1, "Please enter your password.")
            .min(8, "Password must be at least 8 characters long."),
        password_confirmation: z
            .string()
            .min(1, "Please enter your confirm password."),
    })
    .superRefine(
        (
            { password_confirmation: confirmPassword, password, username },
            ctx,
        ) => {
            // Password complexity checks
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar =
                /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password);
            const noSpecialChar =
                /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(username);
            if (noSpecialChar) {
                ctx.addIssue({
                    code: "custom",
                    message: "Username must not contain special characters.",
                    path: ["username"],
                });
            }
            // Individual checks with separate error messages
            if (!hasUppercase) {
                ctx.addIssue({
                    code: "custom",
                    message:
                        "Password must contain at least one uppercase letter (A-Z).",
                    path: ["password"],
                });
            }
            if (!hasLowercase) {
                ctx.addIssue({
                    code: "custom",
                    message:
                        "Password must contain at least one lowercase letter (a-z).",
                    path: ["password"],
                });
            }
            if (!hasNumber) {
                ctx.addIssue({
                    code: "custom",
                    message: "Password must contain at least one number (0-9).",
                    path: ["password"],
                });
            }
            if (!hasSpecialChar) {
                ctx.addIssue({
                    code: "custom",
                    message:
                        "Password must contain at least one special character.",
                    path: ["password"],
                });
            }
            // Check password match
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: "Passwords do not match.",
                    path: ["confirmPassword"],
                });
            }
        },
    );

type RawSignupInput = z.infer<typeof signupSchema>;

export default function Signup() {
    const { handleLogin } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RawSignupInput>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: RawSignupInput) => {
        const signupData: SignupFormData = {
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            password_confirmation: data.password_confirmation,
        };

        console.log("Dữ liệu gửi đi:", signupData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await signup(signupData);
        if (user.errors) {
            // Xử lý lỗi từ API và gán vào form
            Object.entries(user.errors).forEach(([field, messages]) => {
                // Gán lỗi vào từng trường
                setError(field as keyof RawSignupInput, {
                    type: "manual",
                    message: Array.isArray(messages as string[])
                        ? (messages as string[]).join(", ")
                        : (messages as string),
                });
            });
            return;
        }
        const expires = Date.now() + 3600 * 1000; // 1 tiếng
        document.cookie = `token=${user.data.access_token}; path=/; max-age=3600`;
        localStorage.setItem("myCookieExpires", expires.toString());
        handleLogin();
    };

    return (
        <div className="flex min-h-screen justify-center bg-(--main-color)">
            <div className="flex w-97 flex-col items-center px-8">
                <div className="mb-10 flex flex-col items-center pt-8">
                    <MusicChat className="h-10 w-10" />
                    <h1 className="pt-6 text-center text-3xl font-bold md:text-5xl/15">
                        Sign up to <br /> start listening
                    </h1>
                </div>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <TextboxLogin
                            label="Username"
                            placeholder="Username"
                            register={register("username")}
                            error={errors.username?.message}
                        />
                        <TextboxLogin
                            label="Email address"
                            placeholder="name@domain.com"
                            register={register("email")}
                            error={errors.email?.message}
                        />
                        <TextboxLogin
                            label="Phone number"
                            placeholder="Phone number"
                            register={register("phone")}
                            error={errors.phone?.message}
                        />
                        <TextboxLogin
                            label="Password"
                            placeholder="Password"
                            isPassword={true}
                            register={register("password")}
                            error={errors.password?.message}
                        />
                        <TextboxLogin
                            label="Confirm password"
                            placeholder="Confirm password"
                            isPassword={true}
                            register={register("password_confirmation")}
                            error={errors.password_confirmation?.message}
                        />
                        <div className="mt-4 mb-2 rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
                <div className="my-5 flex w-full items-center justify-center">
                    <hr className="w-full border-[--secondary-text-color]" />
                    <span className="-translate-y-0.5 px-3 text-sm font-medium">
                        or
                    </span>
                    <hr className="w-full border-[--secondary-text-color]" />
                </div>
                <div className="my-2 flex w-full flex-col">
                    <div>
                        <BtnTxtImg
                            text="Sign up with Google"
                            Icon={<Google className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <BtnTxtImg
                            text="Sign up with Facebook"
                            Icon={<FacebookColor className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <BtnTxtImg
                            text="Sign up with Apple"
                            Icon={<Apple className="h-6 w-6" />}
                        />
                    </div>
                </div>
                <hr className="mt-5 w-full border-[#292929]" />
                <div className="my-8 pb-4 text-center">
                    <span className="text-(--secondary-text-color)">
                        Already have an account?{" "}
                    </span>
                    <Link href="/login" className="underline">
                        Log in here.
                    </Link>
                </div>
            </div>
        </div>
    );
}
