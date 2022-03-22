import { HttpErrorResponse } from "@angular/common/http";

export class HandleError {
  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return errorMessage;
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
      case "INVALID_EMAIL":
      case "EMAIL_NOT_FOUND":
      case "INVALID_PASSWORD":
      case "MISSING_PASSWORD":
        errorMessage = "Please check your email & password and try again.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
        errorMessage =
          "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.";
        break;
      case "Permission denied":
        errorMessage = "You are not allowed to perform this action.";
        break;
    }
    return errorMessage;
  }

  handleErrorPlayer(errorRes: HttpErrorResponse) {
    let errorMessage = "An error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return errorMessage;
    }
    switch (errorRes.error.error) {
      case "Permission denied":
        errorMessage = "Unauthorized - You are not allowed to perform this action.";
        break;
    }
    return errorMessage;
  }
}
