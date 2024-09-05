import { HealthKitDataModel } from './health-kit-data.model';

export class HealthKitDataGroupModel{
    GroupName!: string;
    Datas:Array<HealthKitDataModel> = [];
    DataLines:Array<number> = [];
}