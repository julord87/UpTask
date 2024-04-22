import { Router } from "express";
import { body } from "express-validator"
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post("/create-account",
    body('name').notEmpty().withMessage("El nombre es obligatorio"),
    body('email').notEmpty().withMessage("El correo es obligatorio").isEmail().withMessage("El correo no es valido"),
    body('password_confirmation').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Los passwords no coinciden")
        }
        return true
    }),
    body('password').notEmpty().isLength({min: 6}).withMessage("El password es obligatorio"),
    handleInputErrors,

    AuthController.createAccount
)

router.post("/confirm-account",
    body('token').notEmpty().withMessage("Token requerido"),
    handleInputErrors,

    AuthController.confirmAccount
)

router.post("/login",
    body('email').notEmpty().withMessage("El correo es obligatorio").isEmail().withMessage("El correo no es valido"),
    body('password').notEmpty().withMessage("El password es obligatorio"),

    handleInputErrors,

    AuthController.login
)

export default router