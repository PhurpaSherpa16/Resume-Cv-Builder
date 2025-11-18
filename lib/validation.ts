import { z } from 'zod'

export const optionalString = z.string().trim().optional().or(z.literal(''))


export const resumeInformationSchema = z.object({
    reumseTitle : optionalString,
    description_resume : optionalString
})

export type ResumeInformationValues = z.infer<typeof resumeInformationSchema>

export const personalInformationSchema = z.object({
    photo : z.custom<File | undefined>().refine(
        (file)=> !file || (file instanceof File && file.type.startsWith("image/")),
        "Must be an image file")
        .refine((file)=>!file || file.size <=1024 * 1024 * 4,
        "Image must be less than 4MB"
    ),
    firstName : optionalString,
    lastName  : optionalString,
    jobTitle : optionalString,
    linkedin : optionalString,
    email : optionalString,
    phone : optionalString,
    country : optionalString,
    city : optionalString,
})

export type PersonalInformaionValues = z.infer<typeof personalInformationSchema>


export const workExpereinceSchema = z.object({
    listOfWorkExperiences : z.array(
        z.object({
            position : optionalString,
            company : optionalString,
            startDate : optionalString,
            endDate : optionalString,
            description : optionalString,
        })
    ).optional()
})

export type WorkExperienceValues = z.infer<typeof workExpereinceSchema>


export const projectsSchema = z.object({
    listOfProjects : z.array(
        z.object({
            projectName : optionalString,
            projectLink : optionalString,
            description : optionalString
        })
    ).optional()
})
export type ProjectValues = z.infer< typeof projectsSchema>

export const educationSchema = z.object({
    listOfEducation : z.array(
        z.object({
            degree : optionalString,
            schoolName : optionalString,
            startDate : optionalString,
            endDate : optionalString,
        })
    ).optional()
})

export type EducationValues = z.infer<typeof educationSchema>

export const skillSchema = z.object({
    listOfSkills: z.array(
        z.string().trim()).optional()
})
export type SkillValues = z.infer<typeof skillSchema>

export const socialSiteSchema = z.object({
    github : optionalString,
    facebook : optionalString,
    instagram : optionalString,
    portfolio : optionalString,
    behance : optionalString,
    kaggle : optionalString,
    medium : optionalString,
    dribble : optionalString,
})
export type SocialSiteValues = z.infer<typeof socialSiteSchema>


export const summarySchema = z.object({summary : optionalString})
export type SummaryValues = z.infer<typeof summarySchema>



// combining all the schema here with below logic
// resumeInformationSchema + personalInformationSchema + more ....
// this later on store in resumeData
export const resumeSchema = z.object({
    ...resumeInformationSchema.shape,
    ...personalInformationSchema.shape,
    ...workExpereinceSchema.shape,
    ...projectsSchema.shape,
    ...educationSchema.shape,
    ...summarySchema.shape,
    ...skillSchema.shape,
    ...socialSiteSchema.shape,
})

// Omit<z.infer<typeof resumeSchema>, 'photo'> will omit the photo from personalInformationSchema
// down id and photo is for database uploading
export type ResumeValues = Omit<z.infer<typeof resumeSchema>, 'photo'> & {
    id? : string
    photo? : File | string | null
}