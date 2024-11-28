export interface IServiceItem {
    password: string;
    serviceName: string;
}

export interface IServiceCore {
    passwords: IServiceItem[];
    setPasswords: (value: any) => void;
    onClose: ()=> void;
}

export interface ISimpleDialogProps {
    open: boolean;
    onClose: () => void;
    passwords: IServiceItem[];
    setPasswords: (value: any) => void;
}

export interface IServiceListProps {
    service: IServiceItem[];
    onDelete: (index: number) => void;
}