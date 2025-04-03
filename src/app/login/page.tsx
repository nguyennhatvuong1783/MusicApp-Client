import BtnTxtImg from "@/components/Buttons/BtnTxtImg";
import {
    Apple,
    FacebookColor,
    Google,
    Spotify,
} from "@/components/icons/Icons";
import TextboxLogin from "@/components/Textbox/TextboxLogin";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex items-center justify-center bg-(image:--gradient-color-login) md:p-8">
            <div className="flex min-h-screen w-full flex-col items-center justify-start bg-(--main-color) px-8 pb-8 md:h-auto md:min-h-auto md:w-[734px] md:rounded-md md:px-25">
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                    <Link href="/">
                        <Spotify className="h-9 w-9 cursor-pointer" />
                    </Link>
                    <h1 className="text-center text-3xl font-bold">
                        Log in to Spotify
                    </h1>
                </div>
                <div className="flex w-full flex-col justify-center md:w-auto">
                    <div>
                        <BtnTxtImg
                            text="Continue with Google"
                            Icon={<Google className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <BtnTxtImg
                            text="Continue with Facebook"
                            Icon={<FacebookColor className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <BtnTxtImg
                            text="Continue with Apple"
                            Icon={<Apple className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <BtnTxtImg text="Continue with phone number" />
                    </div>
                </div>
                <hr className="my-9 w-full border-[#292929]" />
                <form className="w-full md:w-auto">
                    <div className="flex flex-col justify-center">
                        <div>
                            <TextboxLogin
                                text="Email or username"
                                placeholder="Email or username"
                            />
                        </div>
                        <div className="my-6 rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90 md:box-content md:w-65"
                            >
                                Continue
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
                        Sign up for Spotify
                    </Link>
                </div>
            </div>
        </div>
    );
}
