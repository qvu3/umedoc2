import StripeRefundModel from './stripe-refund.model';

export default class StripeTransactionInfoModel {
    ID: string;
    PaymentID: string;
    Amount: number;
    AmountPlace:number;
    AmountRefunded: number;
    Application: string;
    ApplicationFee: string;
    ApplicationFeeAmount: string;
    BalanceTransaction: string;
    Captured: string;
    Created: Date;
    Currency: string;
    Customer: string;
    Description: string;
    PaymentIntent: string;
    PaymentMethod: string;
    ReceiptEmail: string;
    ReceiptNumber: string;
    ReceiptUrl: string;
    Refunded: string;
    Status: string;
    StripeRefund: StripeRefundModel;
    CopayAmount:number;
    Price:number;
    CaptureID:string;
}