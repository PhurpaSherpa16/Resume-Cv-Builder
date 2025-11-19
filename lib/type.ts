import { ResumeValues } from "./validation";

export interface EditorProps{
    resumeData : ResumeValues
    setResumeData : (data : ResumeValues) => void
}

export interface ResumePreviewProps{
    resumeData : ResumeValues
}