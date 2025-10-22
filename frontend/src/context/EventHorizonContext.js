import { createContext, useContext } from 'react';

export const EventHorizonContext = createContext({
  cameraRef: { current: null },
  audioStrengthRef: { current: 0 }
});

export const useEventHorizon = () => useContext(EventHorizonContext);
