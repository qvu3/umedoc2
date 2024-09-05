import { PayPalRefundModel } from "./paypal-refund.model";

export default class TransactionPaypalModel {
    ID: string;
    IsInactived: boolean;
    PaymentID:string;
    State:string;
    Cart:string;
    Payer_PaymentMethod:string;
    Payer_Status:string;
    Payer_Email:string;
    Payer_FirstName:string;
    Payer_LastName:string;
    Payer_ID:string;
    Payer_CountryCode:string;
    Transaction_Total:string;
    Transaction_Currency:string;
    Transaction_Price:string;
    Transaction_Description:string;
    Transaction_Name:string;
    Relate_Source_ID:string;
    Relate_Source_State:string;
    Relate_Source_Payment_Mode:string;
    Relate_Source_Reason_Mode:string;
    Relate_Source_Parent_Payment:string;
    Relate_Source_Created_Time:string;
    Relate_Source_UpdateTime:string;
    Relate_Source_Protection_Eligibilty:string;
    Relate_Source_Transfer_Fee_Value:string;
    Relate_Source_Transfer_Fee_Currency:string;
    PayPalRefund:PayPalRefundModel;
}