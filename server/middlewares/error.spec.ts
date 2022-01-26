import { notFoundErrorHandler } from "./error";
import IResponseTest from "../../interfaces/response";

const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given a notFoundError handler function", () => {
  describe("When it receives a request", () => {
    test("Then it should return a error code 404 and a error message 'Endpoint not found' ", () => {
      const res = mockResponse();

      notFoundErrorHandler(null, res);

      expect(res.status).toBeCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });
});
