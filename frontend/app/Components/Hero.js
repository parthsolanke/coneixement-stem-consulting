import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import Typewriter from "./TypingEffect";

export default function Hero() {
    return (
        <div className="grid grid-cols-10 items-center p-16  shadow-md mt-20">
            <div className="col-span-10 md:col-span-7">
                <Typewriter text = "Take the First Step Towards Your STEM Journey!" />
                <p className="font-semibold text-lg mx-16 mt-4 text-gray-800">
                    <span>
                        Click here to Start a free Career Assessment test
                    </span>
                    <br />
                    <Link href="/ageSelect">
                        <Button display="START →" type="normal" extra="mt-3" />
                    </Link>
                </p>
            </div>
            <div className="hidden md:block col-span-3 ml-8">
                <Image
                    src="/Images/scholar-girl.png"
                    alt="Graduate"
                    width={300}
                    height={300}
                    className="rounded-2xl"
                />
            </div>
        </div>
    );
}
