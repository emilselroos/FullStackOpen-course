interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

interface DescriptionType extends CoursePartBase {
	description: string;
}

interface CourseNormalPart extends CoursePartBase, DescriptionType {
	type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
	type: "groupProject";
	groupProjectCount: number;
}
  
interface CourseSubmissionPart extends CoursePartBase, DescriptionType {
	type: "submission";
	exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase, DescriptionType {
	type: "special";
	requirements: string[];
}
  
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;