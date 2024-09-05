export class LoginHistoryModel {
    ID!: string;
    UserAgent!: string;
    OS!: string;
    Browser!: string;
    DeviceName!: string;
    OS_Version!: string;
    Browser_Version!: string;
    // DeviceType: string;
    // Brand: string;
    Model!: string;
    IsLoginFromMobileApp!: boolean;
    IsDesktop!: boolean;
    IsMobile!: boolean;
    IsTablet!: boolean;
    IP!: string;
    LoginDate!: Date;
}