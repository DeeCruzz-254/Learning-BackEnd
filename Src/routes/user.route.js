import { Router } from "express";
import { registerUser, loginUser, updateUser, deleteUser, logoutUser } from "../controller/user.controller.js";

const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);
router.post('/logout',logoutUser);
export default router;

