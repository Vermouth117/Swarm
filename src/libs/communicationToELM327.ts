import { Dispatch, SetStateAction } from "react";

export const connectToELM327 = async (
  setDevice: Dispatch<SetStateAction<BluetoothDevice | undefined>>,
  setRpm: Dispatch<SetStateAction<number | undefined>>,
  setSpeed: Dispatch<SetStateAction<number | undefined>>,
  setWaterTemp: Dispatch<SetStateAction<number | undefined>>,
  setOutsideTemp: Dispatch<SetStateAction<number | undefined>>,
  setFuelConsumption: Dispatch<SetStateAction<number | undefined>>,
  setOdo: Dispatch<SetStateAction<number | undefined>>,
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

      // 41 = 現在のデータを表示
      if (value.includes("41 0C")) {
        const hexValues = value.split(" ");
        console.log("RPM_hexValues", hexValues);
        const A = parseInt(hexValues[2], 16);
        const B = parseInt(hexValues[3], 16);
        const rpmValue = (256 * A + B) / 4;
        setRpm(rpmValue);
      }

      if (value.includes("41 0D")) {
        const hexValues = value.split(" ");
        console.log("SPEED_hexValues", hexValues);
        setSpeed(parseInt(hexValues[2], 16));
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
