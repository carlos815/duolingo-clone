import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from 'react-responsive';

export default function Lives() {
    const livesCount = useSelector((state) => state.game.lives);
    const livesTotal = useSelector((state) => state.game.livesTotal);

    return (
        <div className="flex gap-2 h-max ">
            <Hearts livesCount={livesCount} livesTotal={livesTotal} />
        </div>
    );
}

function Hearts({ livesCount, livesTotal }) {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })
    const heartSize = isDesktop ? 34 : 20
    const hearts = []
    const [size, setSize] = useState(20)

    useEffect(() => setSize(isDesktop ? 34 : 20), [isDesktop])


    for (let i = 0; i < livesTotal; i++) {

        if (i < livesCount) {
            //full heart
            hearts.push(
                <Image src="/heart-solid.svg" width={size} height={size} key={i} />
            )
        } else {
            //Empty heart
            hearts.push(
                <Image src="/heart-regular.svg" width={size} height={size} key={i} />
            )
        }
    }
    return hearts
}
