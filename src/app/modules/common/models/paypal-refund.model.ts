export class PayPalRefundModel {
    ID!: string;
    RefundID!: string;
    AmountTotal!: string;
    AmountCurrency!: string;
    State!: string;
    Reason!: string;
    InvoiceNumber!: string;
    SaleID!: string;
    ParentPayment!: string;
    Description!: string;
    CreatedTime!: string;
    UpdateTime!: string;
    RefundFromTransFee!: string;
    RefundFromReceivedAmount!: string;
    TotalRefundAmount!: string;
}

export class RefundInfoModel {
    IsPartial: boolean=false;
    Amount!: number;
    Description!: string;
    SaleID!: string;
    Total!: number;
}