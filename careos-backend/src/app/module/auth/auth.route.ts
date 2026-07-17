import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { AuthController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { ENUM_USER_ROLE } from "./auth.constant.js";


const router = Router();

router.post(
    "/register-tenant-owner",
    checkAuth(ENUM_USER_ROLE.SUPER_ADMIN), 
    validateRequest(AuthValidation.registerTenantOwnerSchema),
    AuthController.registerTenantOwner
);

router.post(
    "/resolve-password-change",
    checkAuth(),
    validateRequest(AuthValidation.changePasswordSchema),
    AuthController.resolvePasswordChange
);

router.post(
    "/forget-password",
    validateRequest(AuthValidation.forgetPasswordSchema),
    AuthController.forgetPassword
);

router.post(
    "/reset-password",
    validateRequest(AuthValidation.resetPasswordSchema),
    AuthController.resetPassword
);

router.post(
    "/invite",
    checkAuth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.TENANT_OWNER, ENUM_USER_ROLE.CENTER_ADMIN),
    validateRequest(AuthValidation.inviteUserSchema),
    AuthController.inviteUser
);

router.post(
    "/accept-invite",
    validateRequest(AuthValidation.acceptInviteSchema),
    AuthController.acceptInvite
);

export const AuthRoutes = router;