export class WeightLossPrecheck {
    constructor() {

    }

    ID: string;
    AppointmentID: string;
    Weight?: number;
    HeightFeet?: number;
    HeightInches?: number;
    Height?: number;

    BMI?: number;
    BloodPressure: boolean;//2
    Cancer: boolean;//3
    KidneyDisease: boolean;//4
    Pancreatitis: boolean;//5
    SemaglutideAllergy: boolean;//6
    Pregnant: boolean;//7
    Diabetic: boolean;//8
    Suicide: boolean;//9
    isAgreed: boolean;
}