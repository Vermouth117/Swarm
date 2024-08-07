import { Dispatch, SetStateAction } from "react";

import { chartData } from "../models/chartData.ts";

export const connectToELM327 = async (
  setDevice: Dispatch<SetStateAction<BluetoothDevice | undefined>>,
  setRpm: Dispatch<SetStateAction<chartData[] | undefined>>,
  setSpeed: Dispatch<SetStateAction<chartData[] | undefined>>,
  setWaterTemp: Dispatch<SetStateAction<number | undefined>>,
  setOutsideTemp: Dispatch<SetStateAction<number | undefined>>,
  setFuelConsumption: Dispatch<SetStateAction<number | undefined>>,
  setOdo: Dispatch<SetStateAction<number | undefined>>,
  setThrottlePosition: Dispatch<SetStateAction<number | undefined>>,
  setVoltage: Dispatch<SetStateAction<number | undefined>>,
  setTimeFromEngineStart: Dispatch<SetStateAction<number | undefined>>,
  setOilTemp: Dispatch<SetStateAction<number | undefined>>,
  setEngineLoad: Dispatch<SetStateAction<number | undefined>>,
  setAbsolutePressure: Dispatch<SetStateAction<number | undefined>>,
  // setFuelTankLevel: Dispatch<SetStateAction<number | undefined>>,
  // setFuelPressure: Dispatch<SetStateAction<number | undefined>>,
  // setIntakePressure: Dispatch<SetStateAction<number | undefined>>,
  // setAcceleratorPedalPosition: Dispatch<SetStateAction<number | undefined>>,
  // setTorque: Dispatch<SetStateAction<number | undefined>>,
) => {
  try {
    const ELM327 = await navigator.bluetooth.requestDevice({
      filters: [{ services: [0xfff0] }],
    });
    setDevice(ELM327);

    const server = await ELM327.gatt!.connect();
    const service = await server.getPrimaryService(0xfff0);
    const characteristic = await service.getCharacteristic(0xfff1);
    await characteristic.startNotifications(); // デバイスからの通知開始

    characteristic.addEventListener("characteristicvaluechanged", (event) => {
      const target = event.target as BluetoothRemoteGATTCharacteristic;
      const value = new TextDecoder().decode(target.value!); // new TextDecoder() デフォルト utf-8 or utf8
      console.log("Received value:", value);

      const date = new Date();

      // 41 = 現在のデータを表示（レスポンス）
      if (value.includes("41 0C")) {
        const hexValues = value.split(" ");
        console.log("RPM_hexValues", hexValues);
        const A = parseInt(hexValues[2], 16);
        const B = parseInt(hexValues[3], 16);
        const rpmValue = (256 * A + B) / 4;
        const rpmData = {
          date: `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`,
          degree: Number(rpmValue.toFixed(0)),
        };
        setRpm((prevRpm) => {
          if (prevRpm && prevRpm?.length >= 20) {
            return [...prevRpm.slice(1), rpmData];
          } else if (prevRpm) {
            return [...prevRpm, rpmData];
          }
          return [rpmData];
        });
        // setRpm(Number(rpmValue.toFixed(0)));
      }

      if (value.includes("41 0D")) {
        const hexValues = value.split(" ");
        console.log("SPEED_hexValues", hexValues);
        const speedData = {
          date: `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`,
          degree: Number(parseInt(hexValues[2], 16).toFixed(0)),
        };
        setSpeed((prevSpeed) => {
          if (prevSpeed && prevSpeed?.length >= 20) {
            return [...prevSpeed.slice(1), speedData];
          } else if (prevSpeed) {
            return [...prevSpeed, speedData];
          }
          return [speedData];
        });
        // setSpeed(parseInt(hexValues[2], 16));
      }

      if (value.includes("41 05")) {
        const hexValues = value.split(" ");
        console.log("WATER_TEMP_hexValues", hexValues);
        setWaterTemp(parseInt(hexValues[2], 16) - 40);
      }

      if (value.includes("41 46")) {
        const hexValues = value.split(" ");
        console.log("OUTSIDE_TEMP_hexValues", hexValues);
        setOutsideTemp(parseInt(hexValues[2], 16) - 40);
      }

      if (value.includes("41 10")) {
        const hexValues = value.split(" ");
        console.log("FUEL_CONSUMPTION_hexValues", hexValues);
        const A = parseInt(hexValues[2], 16);
        const B = parseInt(hexValues[3], 16);
        const maf = (256 * A + B) / 100; // 質量空気流量センサー（MAF）空気流量 g/s
        setFuelConsumption(
          Number((((maf / 14.7 / 0.745) * 3600) / 1000).toFixed(2)), // 燃料消費率 L/h
        );
      }

      if (value.includes("41 A6")) {
        const hexValues = value.split(" ");
        console.log("ODO_hexValues", hexValues);
        const A = parseInt(hexValues[2], 16);
        const B = parseInt(hexValues[3], 16);
        const C = parseInt(hexValues[4], 16);
        const D = parseInt(hexValues[5], 16);
        const odoValue = (A * 2 ** 24 + B * 2 ** 16 + C * 2 ** 8 + D) / 10;
        setOdo(odoValue);
      }

      if (value.includes("41 45")) {
        const hexValues = value.split(" ");
        console.log("THROTTLE_POSITION_hexValues", hexValues);
        setThrottlePosition(
          Number(((parseInt(hexValues[2], 16) * 100) / 255).toFixed(2)),
        );
      }

      if (value.includes("41 42")) {
        const hexValues = value.split(" ");
        console.log("VOLTAGE_hexValues", hexValues);
        const A = parseInt(hexValues[2], 16);
        const B = parseInt(hexValues[3], 16);
        setVoltage(Number(((256 * A + B) / 1000).toFixed(1)));
      }

      if (value.includes("41 1F")) {
        const hexValues = value.split(" ");
        console.log("TIME_FROM_ENGINE_START_hexValues", hexValues);
        const A = parseInt(hexValues[2], 16);
        const B = parseInt(hexValues[3], 16);
        setTimeFromEngineStart(256 * A + B);
      }

      if (value.includes("41 5C")) {
        const hexValues = value.split(" ");
        console.log("OIL_TEMP_hexValues", hexValues);
        setOilTemp(parseInt(hexValues[2], 16) - 40);
      }

      if (value.includes("41 04")) {
        const hexValues = value.split(" ");
        console.log("ENGINE_LOAD_hexValues", hexValues);
        setEngineLoad(Number((parseInt(hexValues[2], 16) / 2.55).toFixed(2)));
      }

      if (value.includes("41 33")) {
        const hexValues = value.split(" ");
        console.log("ABSOLUTE_PRESSURE_hexValues", hexValues);
        setAbsolutePressure(parseInt(hexValues[2], 16));
      }

      // if (value.includes("41 2F")) {
      //   const hexValues = value.split(" ");
      //   console.log("FUEL_TANK_LEVEL_hexValues", hexValues);
      //   setFuelTankLevel(
      //     Number(((parseInt(hexValues[2], 16) * 100) / 255).toFixed(2)),
      //   );
      // }

      // if (value.includes("41 23")) {
      //   const hexValues = value.split(" ");
      //   console.log("FUEL_PRESSURE_hexValues", hexValues);
      //   const A = parseInt(hexValues[2], 16);
      //   const B = parseInt(hexValues[3], 16);
      //   setFuelPressure((256 * A + B) * 10);
      // }

      // if (value.includes("41 0B")) {
      //   const hexValues = value.split(" ");
      //   console.log("INTAKE_PRESSURE_hexValues", hexValues);
      //   setIntakePressure(parseInt(hexValues[2], 16));
      // }

      // if (value.includes("41 5A")) {
      //   const hexValues = value.split(" ");
      //   console.log("ACCELERATOR_PEDAL_POSITION_hexValues", hexValues);
      //   setAcceleratorPedalPosition(
      //     Number(((parseInt(hexValues[2], 16) * 100) / 255).toFixed(2)),
      //   );
      // }

      // if (value.includes("41 99")) {
      //   const hexValues = value.split(" ");
      //   console.log("TORQUE_hexValues", hexValues);
      //   const A = parseInt(hexValues[2], 16);
      //   const B = parseInt(hexValues[3], 16);
      //   setTorque(256 * A + B);
      // }
    });
  } catch (error) {
    console.error("Bluetooth接続に失敗しました", error);
  }
};

export const sendCommand = async (device: BluetoothDevice, command: string) => {
  try {
    const service = await device.gatt!.getPrimaryService(0xfff0);
    const characteristic = await service.getCharacteristic(0xfff1);
    await characteristic.writeValue(new TextEncoder().encode(command)); // UTF-8 でエンコードされたテキストを含む Uint8Array を返す
  } catch (error) {
    console.error("コマンド送信に失敗しました", error);
  }
};

export const sendCommandInterval = (
  device: BluetoothDevice,
  command: string,
  timeout: number,
) => {
  setInterval(async () => {
    await sendCommand(device, command);
    // await sendCommand(device, "012F");
    // await sendCommand(device, "0123");
    // await sendCommand(device, "010B");
    // await sendCommand(device, "015A");
    // await sendCommand(device, "0199");
  }, timeout);
};
