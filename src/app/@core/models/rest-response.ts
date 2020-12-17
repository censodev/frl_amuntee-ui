export class RestResponse<T> {
    status: boolean;
    message: string;
    data: T;
}
