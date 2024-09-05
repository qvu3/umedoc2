export default class StripeRefundModel {
    Id: string;
    RefundID:string;
    StripeSaleID: string;
    Amount: number;
    AmountPlace:number;
    BalanceTransaction: string;
    Charge: string;
    Created: Date;
    Currency: string;
    Description: string;
    FailureBalanceTransaction: string;
    FailureReason: string;
    PaymentIntent: string;
    Reason: string;
    ReceiptNumber: string;
    SourceTransferReversal: string;
    Status: string;
    TransferReversal: string;
    
}