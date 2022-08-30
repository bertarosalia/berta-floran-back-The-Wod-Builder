interface ICustomError extends Error {
  code: number;
  publicMessage?: string;
  message: "";
  name: "";
  statusCode: number;
}

export default ICustomError;
