export class DeviceCheckModel {
    percent: number;
    isCompleted: boolean;
    isConnectivity: boolean;
    isError: boolean;
    statusConnect: string;
    audioSupported: boolean;
    videoSupported: boolean;
    bitrateAudio: string;
    bitrateVideo: string;
    packetAudio:number =0;
    packetVideo:number =0;
    packetLostAudio:number = 0;
    packetLostVideo:number = 0;
}