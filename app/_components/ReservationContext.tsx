"use client";

import {
  MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

interface IContext {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: MouseEventHandler<HTMLButtonElement> | undefined;
}

const ReservationContext = createContext<IContext | undefined>(undefined);

function ReservationProvider({ children }: { children: ReactNode }) {
  const initialState = {
    from: undefined,
    to: undefined,
  };

  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("context was used outside provider!");
  }
  return context;
}

export { ReservationProvider, useReservation };
