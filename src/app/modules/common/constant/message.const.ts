export class MessageConstant {
    public static DEL_SUCCESS_CONST = "Item was deleted successfully.";
    public static ADD_SUCCESS_CONST = "Item was created successfully.";
    public static EDIT_SCCCESS_CONST = "Item was updated successfully.";
    public static REQUEST_SUCCESS_CONST = "Your request was executed successfully.";
    public static REQUEST_CHANGE_PASS_CONST="Please check your email inbox to get new password.";
    public static FAILURE_REQUEST = "Oops! Occurred error during execute your request, please try again.";
    public static NOT_FOUND = "No data found.";
    public static FieldRequired="This field is required.";
    public static REQUEST_REGISTER_1_SUCCESS_CONST="Your account created successfully, Please fill some info to completed you account.";
    public static REQUEST_REGISTER_SUCCESS_CONST="You need to confirm your email, please check your email inbox to activate your account.";
    public static CHARGE_PAYMENT_SUCCESS_CONST = "Your request was executed successfully.";
}

export class NameExtension{
    public static prefixes:Array<string>=['Mr', 'Ms', 'Mrs', 'Dr'];
    public static suffixes = ['Jr', 'Sr', 'II', 'III', 'IV'];
}

export class CriteriaKey{
    public static completedCriteria ="CompletedAppointmentCriteria";
}

export enum TicketStatus {
    Open = 1,
    WaitingforUmedocResponse = 2,
    WaitingforPatientResponse = 3,
    Closed = 4
}

export enum TicketPriority {
    Lowest = 1,
    Low = 2,
    Medium = 3,
    High = 4,
    Highest = 5
}

export enum TicketType {
    MedicalQuestions = 1,
    MedicineRefill = 2,
    Billing = 3,
    FAQ = 4
}