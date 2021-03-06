import React, { useEffect, useState } from 'react';
import { compose, inc } from "ramda";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonText,
} from '@ionic/react';
import { useCountdown } from '../../hooks/countdown/useCountdown';

export const Timer = () => {
  const {
    startTimer,
    getProgressPercentage,
    hasTimerFinished,
    elapsedSec,
  } = useCountdown();
  const [count, setCount] = useState(0);
  const drinkingInterval = 900;

  const createReminder = ({ title = null, text }) =>
    title ? new Notification(title, { body: text }) : new Notification(text);

  const createWaterDrinkingReminder = () =>
    createReminder({
      text: 'Consider drinking some water.',
    });

  const getRemainingMinutes = () =>
    Math.floor(drinkingInterval / 60 - elapsedSec / 60);

  const restartTimer = compose(
    () => startTimer(drinkingInterval),
    createWaterDrinkingReminder,
    () => setCount(inc(count)),
  );

  useEffect(() => {
    startTimer(drinkingInterval);
  }, []);

  useEffect(() => hasTimerFinished && restartTimer(drinkingInterval), [
    hasTimerFinished,
  ]);

  return (
    <IonCard className="m-0">
      <IonCardHeader>
        <IonCardTitle className="text-base">
          Timer is {
            hasTimerFinished
              ? <span>stopped</span>
              : <span className="text-green-600">running</span>
          }
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList lines="none">
          <IonItem>
            <IonLabel>
              <IonText>
                <span className="font-bold text-blue-500">
                { getRemainingMinutes() }{' '}
                </span>
                { getRemainingMinutes() > 1 ? 'minutes' : 'minute'}{' '}
                left
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <span className="font-bold text-blue-500">
                { count }
              </span>{' '}
              {count === 1 ? 'reminder' : 'reminders'} so far
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonProgressBar
                slot="end"
                value={ getProgressPercentage(drinkingInterval) / 100 }
              />
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
