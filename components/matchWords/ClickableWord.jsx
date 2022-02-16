
import { useSelector, } from "react-redux";
import { useEffect, useState } from "react";
import WordGameController, { WordSubmitStatus } from "../../features/wordGameController";
import { useDispatch } from "react-redux";

export default function ClickableWord({ word }) {
    const gameController = new WordGameController()

    const [isButtonActive, setIsActive] = useState(true)
    const [hasError, setHasError] = useState(false)
    const userSubmission = useSelector((state) => state.matchWords.userSubmission);
    const initialPhrase = useSelector((state) => state.matchWords.initialPhrase);

    useEffect(() => {
        if (userSubmission.length == 0) setIsActive(true)
    }, [userSubmission])

    const dispatch = useDispatch();

    const handleClick = () => {
        if (hasError || !isButtonActive) return
        const wordSubmitStatusResponse = gameController.trySubmitWord(word, userSubmission, initialPhrase, dispatch)


        if (wordSubmitStatusResponse == WordSubmitStatus.completed) {
            setIsActive(false)
        }
        else if (wordSubmitStatusResponse == WordSubmitStatus.failed) {
            errorAnimation(750)
        } else {
            //Remove word option probably not necessary
            //removeWord()
        }
    }
    const errorAnimation = (ms) => {
        setHasError(true)
        setTimeout(() =>
            setHasError(false), ms
        )
    }
    return (
        <button onClick={handleClick} className={`
         md:rounded-xl p-4  md:text-4xl md:h-auto md:border-4 md:border-b-8 border-black text-base border-2 border-b-4 rounded-lg
       ${isButtonActive && "hover:scale-110" || "opacity-10  bg-white border-b-4 inactive"}  ${hasError ? "text bg-red-200 animate-shake error" : ""} transition-all duration-300 font-medium`}>
            {word}
        </button>
    );
}

