export class CustomError extends Error {
    status: number;
  constructor(message?:string, status?:number, name?:string) {
    super(message);
    this.name = name || 'CustomError';
    this.status = status || 500;
  }
}