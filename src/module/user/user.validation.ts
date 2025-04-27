import { Gender } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
    password:z.string({
        required_error:"Password is Required"
    }),
    admin:z.object({
        name: z.string({
            required_error:"Name is Required"
        }),
        email:z.string({
            required_error:"Email is Required"
        }),
        contactNumber: z.string({
            required_error:"Contact Number is Required"
        }),

    })
})

const createDoctor = z.object({
    password:z.string({
        required_error:"Password is Required"
    }),
    doctor:z.object({
        name: z.string({
            required_error:"Name is Required"
        }),
        email:z.string({
            required_error:"Email is Required"
        }),
        contactNumber: z.string({
            required_error:"Contact Number is Required"
        }),
        address:z.string().optional(),
        registrationNumber:z.string({
            required_error:"Registration Number is Required"
        }),
        experience:z.number().optional(),
        gender:z.enum([Gender.MALE,Gender.FEMALE]),
        appointmentFee:z.number({
            required_error:"Appointment Fee is Required"
        }),
        qualification:z.string({
            required_error:"Qualification Is Required"
        }),
        currentWorkingPlace:z.string({
            required_error:"Current Working Place is Required"
        }),
        designation:z.string({
            required_error:"Designation is Required"
        }),
        
    })
})

export const userValidation = {
    createAdmin,
    createDoctor
}