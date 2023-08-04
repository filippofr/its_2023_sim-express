import { genericErrorHandler } from "./generic";
import { missingTokenHandler } from "./missing-token";
import { notFoundHandler } from "./not-found";
import { userExistHandler } from "./user-exists";
import { validationErrorHandler } from "./validation";

export const errorHandlers = [
  notFoundHandler,
  validationErrorHandler,
  genericErrorHandler,
  userExistHandler,
  missingTokenHandler
];