export interface Exception extends Error {
    status: number;
    details?: any;
}