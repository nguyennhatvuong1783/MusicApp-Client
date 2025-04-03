import BtnTxtImg from "@/components/Buttons/BtnTxtImg";
import {
    Apple,
    FacebookColor,
    Google,
    Spotify,
} from "@/components/icons/Icons";
import TextboxLogin from "@/components/Textbox/TextboxLogin";
import Link from "next/link";

export default function Signup() {
    return (
        <div className="flex min-h-screen justify-center bg-(--main-color)">
            <div className="flex w-97 flex-col items-center px-8">
                <div className="mb-10 flex flex-col items-center pt-8">
                    <Spotify className="h-10 w-10" />
                    <h1 className="pt-6 text-center text-3xl font-bold md:text-5xl/15">
                        Sign up to <br /> start listening
                    </h1>
                </div>
                <form className="w-full">
                    <div className="flex flex-col gap-2">
                        <TextboxLogin
                            text="Email address"
                            placeholder="name@domain.com"
                        />
                        <Link
                            href="#"
                            className="text-sm font-medium text-(--green-color) underline decoration-1 underline-offset-1 transition-normal duration-200 outline-none focus-within:decoration-2 focus-within:underline-offset-5"
                        >
                            Use phone number instead.
                        </Link>
                        <div className="my-2 rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90"
                            >
                                Next
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
