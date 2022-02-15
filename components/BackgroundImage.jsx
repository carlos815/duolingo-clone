import Image from "next/image";
import React from "react";

export default function BackgroundImage() {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 -z-10">
            <div className="hidden md:inline">
                <Image src="/desktop-background.png" layout="fill" objectFit="cover" />
            </div>
            <div className="md:hidden inline">
                <Image src="/mobile-background.png" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
}

