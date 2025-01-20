import Applicant from "../models/ApplicantModel.js";
import { StatusCodes } from "http-status-codes";

export const getApplicant = async (req, res) => {
    try {
        const applicantID = req.userData.applicant;
        if (!applicantID) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid applicant ID" });
        }

        const applicant = await Applicant.findById(applicantID);
        if (!applicant) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Applicant not found" });
        }

        const userWIthoutpass = applicant.toJSON();
        return res.status(StatusCodes.OK).json({ userWIthoutpass });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
    }
};
