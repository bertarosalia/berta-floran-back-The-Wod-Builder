import { ValidationError } from "express-validation";

class CustomTestErrorExpress extends ValidationError {
  code: string;

  constructor(
    public statusCode: number,
    public privateMessage: string,
    public publicMessage: string
  ) {
    super(
      {
        body: [],
      },
      {}
    );
  }
}
export default CustomTestErrorExpress;
