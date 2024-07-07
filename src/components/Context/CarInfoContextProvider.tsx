import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type Props = Readonly<{ children: ReactNode }>;

export type CarInfoContextType = Readonly<{
  device: BluetoothDevice | undefined;
  setDevice: Dispatch<SetStateAction<BluetoothDevice | undefined>>;
  rpm: number | undefined;
  setRpm: Dispatch<SetStateAction<number | undefined>>;
  waterTemp: number | undefined;
  setWaterTemp: Dispatch<SetStateAction<number | undefined>>;
  oilTemp: number | undefined;
  setOilTemp: Dispatch<SetStateAction<number | undefined>>;
  outsideTemp: number | undefined;
  setOutsideTemp: Dispatch<SetStateAction<number | undefined>>;
  fuelConsumption: number | undefined;
  setFuelConsumption: Dispatch<SetStateAction<number | undefined>>;
  odo: number | undefined;
  setOdo: Dispatch<SetStateAction<number | undefined>>;
  speed: number | undefined;
  setSpeed: Dispatch<SetStateAction<number | undefined>>;
}>;

export const CarInfoContext = createContext<CarInfoContextType>({
  device: undefined,
  setDevice: () => {},
  rpm: undefined,
  setRpm: () => {},
  waterTemp: undefined,
  setWaterTemp: () => {},
  oilTemp: undefined,
  setOilTemp: () => {},
  outsideTemp: undefined,
  setOutsideTemp: () => {},
  fuelConsumption: undefined,
  setFuelConsumption: () => {},
  odo: undefined,
  setOdo: () => {},
  speed: undefined,
  setSpeed: () => {},
});

export const CarInfoContextProvider: FC<Props> = ({ children }) => {
  const [device, setDevice] = useState<BluetoothDevice>();
  const [rpm, setRpm] = useState<number>();
  const [waterTemp, setWaterTemp] = useState<number>();
  const [oilTemp, setOilTemp] = useState<number>();
  const [outsideTemp, setOutsideTemp] = useState<number>();
  const [fuelConsumption, setFuelConsumption] = useState<number>();
  const [odo, setOdo] = useState<number>();
  const [speed, setSpeed] = useState<number>();

  const value = {
    device,
    setDevice,
    rpm,
    setRpm,
    waterTemp,
    setWaterTemp,
    oilTemp,
    setOilTemp,
    outsideTemp,
    setOutsideTemp,
    fuelConsumption,
    setFuelConsumption,
    odo,
    setOdo,
    speed,
    setSpeed,
  };

  return (
    <CarInfoContext.Provider value={value}>{children}</CarInfoContext.Provider>
  );
};
