import { PlatformConfig } from 'homebridge';

export interface PanasonicPlatformConfig extends PlatformConfig {
  email: string;
  password: string;
  debugMode: boolean;
  suppressOutgoingUpdates?: boolean;
  minHeatingTemperature?: number;
}

export interface PanasonicAccessoryContext {
  device: ComfortCloudDevice;
}

// Fetch devices
// GET https://accsmart.panasonic.com/device/group
export interface ComfortCloudGroupResponse {
  iaqStatus: {
    statusCode: number;
  };
  uiFlg: boolean;
  groupCount: number;
  groupList: ComfortCloudDeviceList[];
}

export interface ComfortCloudDeviceList {
  deviceList: ComfortCloudDevice[];
}

export interface ComfortCloudDevice {
  deviceGuid: string;
  deviceType: string;
  deviceName: string;
  permission: number;
  deviceModuleNumber: string;
  deviceHashGuid: string;
  summerHouse: number;
  iAutoX: boolean;
  nanoe: boolean;
  nanoeStandAlone: boolean;
  autoMode: boolean;
  heatMode: boolean;
  fanMode: boolean;
  dryMode: boolean;
  coolMode: boolean;
  ecoNavi: boolean;
  ecoFunction: number;
  powerfulMode: boolean;
  quietMode: boolean;
  airSwingLR: boolean;
  autoSwingUD: boolean;
  temperatureUnit: number;
  modeAvlList: {
    autoMode: number;
    fanMode: number;
  };
  coordinableFlg: boolean;
  parameters: {
    operate: number;
    operationMode: number;
    temperatureSet: number;
    fanSpeed: number;
    fanAutoMode: number;
    airSwingLR: number;
    airSwingUD: number;
    ecoMode: number;
    ecoNavi: number;
    nanoe: number;
    iAuto: number;
    actualNanoe: number;
    airDirection: number;
    ecoFunctionData: number;
    lastSettingMode: number;
  };
}

// Get device status
// GET https://accsmart.panasonic.com/deviceStatus/now/DEVICE_GUID
export interface ComfortCloudDeviceStatusResponse {
  parameters: ComfortCloudDeviceStatus;
}

export interface ComfortCloudDeviceStatus {
  insideTemperature: number;
  temperatureSet: number;
  outTemperature: number;
  operate: number;
  operationMode: number;
  ecoMode: number;
  fanSpeed: number;
  fanAutoMode: number;
  airSwingLR: number;
  airSwingUD: number;
  temperatureUnit: string;
  nanoe: number;
  ecoNavi: number;
  ecoFunctionData: number;
  insideCleaning: number;
  lastSettingMode: number;
  // Present only on devices with a zone controller (e.g. ducted units with a
  // CZ-CAPZ zone box). Absent on standard single/multi-split units.
  zoneParameters?: ComfortCloudZone[];
}

/**
 * A single zone reported by / sent to a zone controller.
 * Only `zoneId` is guaranteed to be present in every context.
 */
export interface ComfortCloudZone {
  zoneId: number;
  // Configured zone name, e.g. "Living", "Bedrooms".
  zoneName?: string;
  // Zone on/off state. Off = 0, On = 1.
  zoneOnOff?: number;
  // Damper opening in percent (0-100, in steps of 10).
  zoneLevel?: number;
  // Per-zone temperature. -255 means the zone has no temperature sensor.
  zoneTemperature?: number;
  zoneSpill?: number;
}

// Set device status
// POST https://accsmart.panasonic.com/deviceStatus/control
export interface ComfortCloudDeviceUpdatePayload {
  operate?: number;
  operationMode?: number;
  ecoMode?: number;
  fanSpeed?: number;
  fanAutoMode?: number;
  airSwingLR?: number;
  airSwingUD?: number;
  temperatureSet?: number;
  nanoe?: number;
  ecoNavi?: number;
  ecoFunctionData?: number;
  insideCleaning?: number;
  lastSettingMode?: number;
  // Send only the zones being changed, each with its zoneId plus the field(s)
  // to update, e.g. [{ zoneId: 1, zoneOnOff: 1 }].
  zoneParameters?: ComfortCloudZone[];
}
