interface ICustomError extends Error {
  code: number;
  publicMessage?: string;
  message: "";
}

export default ICustomError;
