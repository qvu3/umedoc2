
export class EmailConfirmModel {
    IsSuccess: boolean = false;
    ReturnUrl!: string;
}

export class EmailConfirmData {
    UserId!: string;
    Code!: string;
    ReturnUrl!: string;
}