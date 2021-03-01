import React, { useEffect } from "react";
import { compose } from "ramda";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { useCountdown } from "../../hooks/countdown/useCountdown";

export const Timer = () => {
    const { startTimer, getProgressPercentage, hasTimerFinished, elapsedSec } = useCountdown();
    const drinkingInterval = 900;

    const createReminder = ({ title = null, text }) =>
        title
            ? new Notification(title, { body: text })
            : new Notification(text);

    const createWaterDrinkingReminder = () => createReminder({
        text: 'Consider drinking some water.',
    });

    const restartTimer = compose(
        () => startTimer(drinkingInterval),
        createWaterDrinkingReminder,
    );

    useEffect(() => {
        startTimer(drinkingInterval);
    }, []);

    useEffect(() =>
        hasTimerFinished && restartTimer(drinkingInterval), [hasTimerFinished]
    );

    return (
        <IonCard className="m-0 mt-5">
            <IonCardHeader>
                <IonCardTitle>Timer is {hasTimerFinished ? 'stopped' : 'running'}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonLabel>
                            Percentage: {getProgressPercentage(drinkingInterval)}%
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            Elapsed time since last reminder: {Math.floor(elapsedSec / 60)} minutes
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>
        </IonCard>
    );
}
