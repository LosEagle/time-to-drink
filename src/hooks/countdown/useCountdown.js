import { useState } from "react";
import { compose, ifElse, not, when } from "ramda";

export const useCountdown = () => {
    const [elapsedSec, setElapsedSec] = useState(0);
    const [hasTimerFinished, setTimerFinished] = useState(false);
    let duration = null;
    let start = null;
    let timer = null;

    const getMillisFromSeconds = seconds => seconds * 1000;

    const getSecondsFromMillis = millis => millis / 1000;

    const calculatePercentage = current => sum => (current / sum) * 100;

    const hasReachedDuration = durationMillis => elapsedMillis => elapsedMillis >= durationMillis

    const getProgressPercentage = durationSec => Math.floor(calculatePercentage(elapsedSec)(durationSec));

    const rerunLoop = (elapsedMillis) => {
        requestAnimationFrame(timerLoop);

        const elapsedSec = Math.ceil(getSecondsFromMillis(elapsedMillis));

        setElapsedSec(elapsedSec);
    }

    const timerLoop = (timestamp) => {
        const durationMillis = getMillisFromSeconds(duration);
        const hasCountdownReachedDuration = hasReachedDuration(durationMillis);

        when(
            () => start === null,
            (timestamp) => start = timestamp
        )(timestamp);

        const elapsed = timestamp - start;

        ifElse(
            compose(not, hasCountdownReachedDuration),
            rerunLoop,
            stopTimer,
        )(elapsed);
    }

    const startTimer = (durationSec) => {
        start = null;
        setTimerFinished(false);
        duration = durationSec
        timer = requestAnimationFrame(timerLoop);
    }

    const stopTimer = () => {
        duration = null;
        start = null;
        setTimerFinished(true);
        setElapsedSec(0);
        cancelAnimationFrame(timer);
    }

    return {
        startTimer,
        stopTimer,
        getProgressPercentage,
        hasTimerFinished,
        elapsedSec,
    };
}
