import { Router } from "express";
export const routerProfile = Router()
import { updateProfile, findAllProfiles, findProfileById, deleteProfile } from "../controllers/profile.controllers.js";

routerProfile.get("/profiles", findAllProfiles);
routerProfile.get("/profiles/:id", findProfileById);
routerProfile.put("/profiles/:id", updateProfile);
routerProfile.delete("/profiles/:id", deleteProfile);

export default routerProfile