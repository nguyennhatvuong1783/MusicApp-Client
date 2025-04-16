"use client";
import { SuccessDialog } from "@/components/Dialog/SuccessDialog";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TextboxLogin from "@/components/Textbox/TextboxLogin";
import { useAuth } from "@/hooks/useAuth";
import { changePassword, editProfile } from "@/lib/callApi";
import { ApiResponse, ChangePasswordFormData, User } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const phoneRegex = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);

const profileSchema = z.object({
    email: z
        .string()
        .min(1, "Please enter your email.")
        .email("Invalid email address (name@domain.com)."),
    phone: z
        .string()
        .min(1, "Please enter your phone number.")
        .regex(phoneRegex, "Invalid Number."),
});

const passwordSchema = z
    .object({
        current_password: z
            .string()
            .min(1, "Please enter your current password."),
        new_password: z
            .string()
            .min(1, "Please enter your password.")
            .min(8, "Password must be at least 8 characters long."),
        new_password_confirmation: z
            .string()
            .min(1, "Please enter your confirm password."),
    })
    .superRefine(({ new_password_confirmation, new_password }, ctx) => {
        // Password complexity checks
        const hasUppercase = /[A-Z]/.test(new_password);
        const hasLowercase = /[a-z]/.test(new_password);
        const hasNumber = /[0-9]/.test(new_password);
        const hasSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(
            new_password,
        );

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
        if (new_password_confirmation !== new_password) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match.",
                path: ["new_password_confirmation"],
            });
        }
    });

type RawProfileInput = z.infer<typeof profileSchema>;
type RawPasswordInput = z.infer<typeof passwordSchema>;

const Profile = () => {
    const { user, setUser } = useAuth();
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [message, setMessage] = useState("");

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: errorsProfile },
        setError: setErrorProfile,
    } = useForm<RawProfileInput>({
        resolver: zodResolver(profileSchema),
        values: {
            email: user?.email ?? "",
            phone: user?.phone ?? "",
        },
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        setError: setErrorPassword,
    } = useForm<RawPasswordInput>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmitProfile = async (data: RawProfileInput) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const profileData: User | any = {
            email: data.email,
            phone: data.phone,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: ApiResponse<User> | any = await editProfile(profileData);
        if (user.errors) {
            // Xử lý lỗi từ API và gán vào form
            Object.entries(user.errors).forEach(([field, messages]) => {
                // Gán lỗi vào từng trường
                setErrorProfile(field as keyof RawProfileInput, {
                    type: "manual",
                    message: Array.isArray(messages as string[])
                        ? (messages as string[]).join(", ")
                        : (messages as string),
                });
            });
            return;
        }
        setUser(null);
        setUser(user.data);
        setMessage("Profile saved successfully!");
        setIsSuccessOpen(true);
    };

    const onSubmitPassword = async (data: RawPasswordInput) => {
        const passwordData: ChangePasswordFormData = {
            current_password: data.current_password,
            new_password: data.new_password,
            new_password_confirmation: data.new_password_confirmation,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataChangePassword: any = await changePassword(passwordData);
        if (dataChangePassword.success === false) {
            // Xử lý lỗi từ API và gán vào form
            setErrorPassword("current_password", {
                type: "manual",
                message: dataChangePassword.message,
            });
            return;
        }
        setMessage("Password changed successfully!");
        setIsSuccessOpen(true);
    };

    return (
        <div>
            <Header />
            <div className="block h-full w-full pt-16">
                <div className="flex justify-center py-8">
                    <div className="mx-2 w-196">
                        <h1 className="pb-8 text-4xl font-bold">
                            Your profile
                        </h1>
                        <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                            <div className="flex flex-col gap-6 pb-10">
                                <TextboxLogin
                                    label="Username"
                                    isDisabled={true}
                                    value={user?.username}
                                />
                                <TextboxLogin
                                    label="Your plan"
                                    isDisabled={true}
                                    value={user?.account_type.toUpperCase()}
                                />
                                <TextboxLogin
                                    label="Email"
                                    register={registerProfile("email")}
                                    error={errorsProfile.email?.message}
                                />
                                <TextboxLogin
                                    label="Phone number"
                                    register={registerProfile("phone")}
                                    error={errorsProfile.phone?.message}
                                />
                                <div className="w-fit self-end rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                                    <button
                                        type="submit"
                                        className="w-fit cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90"
                                    >
                                        Save profile
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                            <h1 className="border-t-2 border-(--secondary-color) pt-10 pb-8 text-4xl font-bold">
                                Change password
                            </h1>
                            <div className="flex flex-col gap-6 pb-4">
                                <TextboxLogin
                                    label="Current password"
                                    register={registerPassword(
                                        "current_password",
                                    )}
                                    error={
                                        errorsPassword.current_password?.message
                                    }
                                />
                                <TextboxLogin
                                    label="New password"
                                    isPassword={true}
                                    register={registerPassword("new_password")}
                                    error={errorsPassword.new_password?.message}
                                />
                                <TextboxLogin
                                    label="Confirm new password"
                                    isPassword={true}
                                    register={registerPassword(
                                        "new_password_confirmation",
                                    )}
                                    error={
                                        errorsPassword.new_password_confirmation
                                            ?.message
                                    }
                                />
                                <div className="w-fit self-end rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                                    <button
                                        type="submit"
                                        className="w-fit cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90"
                                    >
                                        Change password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <SuccessDialog
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                message={message}
                autoCloseDelay={2200}
            />
        </div>
    );
};

export default Profile;
