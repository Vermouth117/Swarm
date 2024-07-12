import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { chartData } from "../../models/chartData.ts";

export type Props = Readonly<{ children: ReactNode }>;

export type CarInfoContextType = Readonly<{
  device: BluetoothDevice | undefined;
  setDevice: Dispatch<SetStateAction<BluetoothDevice | undefined>>;
  rpm: chartData[] | undefined;
  setRpm: Dispatch<SetStateAction<chartData[] | undefined>>;
  speed: number | undefined;
  setSpeed: Dispatch<SetStateAction<number | undefined>>;
  waterTemp: number | undefined;
  setWaterTemp: Dispatch<SetStateAction<number | undefined>>;
  outsideTemp: number | undefined;
  setOutsideTemp: Dispatch<SetStateAction<number | undefined>>;
  fuelConsumption: number | undefined;
  setFuelConsumption: Dispatch<SetStateAction<number | undefined>>;
  odo: number | undefined;
  setOdo: Dispatch<SetStateAction<number | undefined>>;
  throttlePosition: number | undefined;
  setThrottlePosition: Dispatch<SetStateAction<number | undefined>>;
  voltage: number | undefined;
  setVoltage: Dispatch<SetStateAction<number | undefined>>;
  timeFromEngineStart: number | undefined;
  setTimeFromEngineStart: Dispatch<SetStateAction<number | undefined>>;
  oilTemp: number | undefined;
  setOilTemp: Dispatch<SetStateAction<number | undefined>>;
  engineLoad: number | undefined;
  setEngineLoad: Dispatch<SetStateAction<number | undefined>>;
  absolutePressure: number | undefined;
  setAbsolutePressure: Dispatch<SetStateAction<number | undefined>>;
  // fuelTankLevel: number | undefined;
  // setFuelTankLevel: Dispatch<SetStateAction<number | undefined>>;
  // fuelPressure: number | undefined;
  // setFuelPressure: Dispatch<SetStateAction<number | undefined>>;
  // intakePressure: number | undefined;
  // setIntakePressure: Dispatch<SetStateAction<number | undefined>>;
  // acceleratorPedalPosition: number | undefined;
  // setAcceleratorPedalPosition: Dispatch<SetStateAction<number | undefined>>;
  // torque: number | undefined;
  // setTorque: Dispatch<SetStateAction<number | undefined>>;
}>;

export const CarInfoContext = createContext<CarInfoContextType>({
  device: undefined,
  setDevice: () => {},
  rpm: undefined,
  setRpm: () => {},
  speed: undefined,
  setSpeed: () => {},
  waterTemp: undefined,
  setWaterTemp: () => {},
  outsideTemp: undefined,
  setOutsideTemp: () => {},
  fuelConsumption: undefined,
  setFuelConsumption: () => {},
  odo: undefined,
  setOdo: () => {},
  throttlePosition: undefined,
  setThrottlePosition: () => {},
  voltage: undefined,
  setVoltage: () => {},
  timeFromEngineStart: undefined,
  setTimeFromEngineStart: () => {},
  oilTemp: undefined,
  setOilTemp: () => {},
  engineLoad: undefined,
  setEngineLoad: () => {},
  absolutePressure: undefined,
  setAbsolutePressure: () => {},
  // fuelTankLevel: undefined,
  // setFuelTankLevel: () => {},
  // fuelPressure: undefined,
  // setFuelPressure: () => {},
  // intakePressure: undefined,
  // setIntakePressure: () => {},
  // acceleratorPedalPosition: undefined,
  // setAcceleratorPedalPosition: () => {},
  // torque: undefined,
  // setTorque: () => {},
});

export const CarInfoContextProvider: FC<Props> = ({ children }) => {
  const [device, setDevice] = useState<BluetoothDevice>();
  const [rpm, setRpm] = useState<chartData[]>();
  const [speed, setSpeed] = useState<number>();
  const [waterTemp, setWaterTemp] = useState<number>();
  const [outsideTemp, setOutsideTemp] = useState<number>();
  const [fuelConsumption, setFuelConsumption] = useState<number>();
  const [odo, setOdo] = useState<number>();
  const [throttlePosition, setThrottlePosition] = useState<number>();
  const [voltage, setVoltage] = useState<number>();
  const [timeFromEngineStart, setTimeFromEngineStart] = useState<number>();
  const [oilTemp, setOilTemp] = useState<number>();
  const [engineLoad, setEngineLoad] = useState<number>();
  const [absolutePressure, setAbsolutePressure] = useState<number>();
  // const [fuelTankLevel, setFuelTankLevel] = useState<number>();
  // const [fuelPressure, setFuelPressure] = useState<number>();
  // const [intakePressure, setIntakePressure] = useState<number>();
  // const [acceleratorPedalPosition, setAcceleratorPedalPosition] =
  //   useState<number>();
  // const [torque, setTorque] = useState<number>();

  const value = {
    device,
    setDevice,
    rpm,
    setRpm,
    speed,
    setSpeed,
    waterTemp,
    setWaterTemp,
    outsideTemp,
    setOutsideTemp,
    fuelConsumption,
    setFuelConsumption,
    odo,
    setOdo,
    throttlePosition,
    setThrottlePosition,
    voltage,
    setVoltage,
    timeFromEngineStart,
    setTimeFromEngineStart,
    oilTemp,
    setOilTemp,
    engineLoad,
    setEngineLoad,
    absolutePressure,
    setAbsolutePressure,
    // fuelTankLevel,
    // setFuelTankLevel,
    // fuelPressure,
    // setFuelPressure,
    // intakePressure,
    // setIntakePressure,
    // acceleratorPedalPosition,
    // setAcceleratorPedalPosition,
    // torque,
    // setTorque,
  };

  return (
    <CarInfoContext.Provider value={value}>{children}</CarInfoContext.Provider>
  );
};
