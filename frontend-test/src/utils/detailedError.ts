export class DetailedError extends Error {
  details: any;

  constructor(details: any) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DetailedError);
    }

    this.name = "DetailedError";
    this.details = details;
  }
}
