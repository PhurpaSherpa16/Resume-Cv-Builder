import { EditorProps } from "@/lib/type"
import GeneralInfoForm from "../resumes/forms/GeneralInfoForm"
import PersonalDetailsForms from "../resumes/forms/PersonalDetailsForms"
import WorkExpereince from "../resumes/forms/WorkExpereince"
import ProjectsForm from "../resumes/forms/ProjectsForm"
import EducationForm from "../resumes/forms/EducationForm"
import SummaryForm from "../resumes/forms/SummaryForm"
import SkillForm from "../resumes/forms/SkillForm"
import SocialSiteForm from "../resumes/forms/SocialSiteForm"

export const steps :{
  title : string
  component : React.ComponentType<EditorProps>
  key : string
}[] = [
  {title : "Resume Information", component: GeneralInfoForm, key:'resume-info'},
  {title : 'Personal Information', component: PersonalDetailsForms, key:'personal-info'},
  {title : 'Summary', component: SummaryForm, key:'summary'},
  {title : 'Work Experience', component: WorkExpereince, key:'work-experience'},
  {title : 'Projects', component: ProjectsForm, key:'project'},
  {title : 'Education', component: EducationForm, key:'education'},
  {title : 'Skills', component: SkillForm, key:'skill'},
  {title : 'Social Site', component: SocialSiteForm, key:'social'},
]

