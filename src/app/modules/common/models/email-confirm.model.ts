
export class EmailConfirmModel {
    IsSuccess: boolean;
    ReturnUrl: string;
}

export class EmailConfirmData {
    UserId: string;
    Code: string;
    ReturnUrl: string;
}