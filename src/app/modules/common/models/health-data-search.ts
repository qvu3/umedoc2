import { HealthKitDataGroupModel } from "./health-kit-group.model";

export class HealthDataSearchModel{
     From?:Date;
     To?:Date;
     patientId:string;
}

export class HealthKitDataLine {
    Labels: string[];
    Lines: HealthKitDataGroupModel[];
}
