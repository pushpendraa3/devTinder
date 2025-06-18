const z = require("zod/v4")

const userZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailId: z.email(),
    password: z.string(),
    age: z.number().optional(),
    gender: z.string().optional(),
    photoUrl: z.string().default(""),
    about: z.string().default("new About"),
    skills: z.array(z.string()).optional()
})

module.exports = userZodSchema