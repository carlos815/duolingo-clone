import ClickableWord from "./ClickableWord";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";


export default function MatchWords({ wordsArray, className, gameController }) {
    const userSubmission = useSelector((state) => state.matchWords.userSubmission)
    const dispatch = useDispatch();

    const handleResetBtnClick = () => {
        gameController.resetWord(dispatch)
    }

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

    const [resetIconSize, setResetIconSize] = useState(24)

    useEffect(() => setResetIconSize(isDesktop ? 38 : 24), [isDesktop])


    return (
        <div className={`font-medium flex flex-col gap-y-4 ${className} w-full`} data-testid="matchWords">
            <button onClick={handleResetBtnClick} className="self-end flex ">
                <Image src="/retry.png" height={resetIconSize} width={resetIconSize}></Image>
            </button>
            <div className="w-full  p-4 h-14 border-b-2 border-l-gray md:text-4xl md:h-[72px] " data-testid="matchWordsInputField" > {userSubmission?.join(" ")}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                {wordsArray?.map(((wordObject) => <ClickableWord word={wordObject.word} key={wordObject.index} index={wordObject.index} />))}
            </div>
        </div>
    );
}
