interface ICustomError extends Error {
  code: number;
  publicMessage?: string;
}

export default ICustomError;
