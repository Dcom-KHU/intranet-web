export interface ExamArchiveType {
    id: number;
    subject: string;
    professor: string;
    semester: string;
    author: string;
    date: string;
    description: string;
    files: string[];
}

export interface ExamArchiveDetailType {
    id: number;
    subject: string;
    professor: string;
    posts: ExamArchiveType[];
}

export interface ExamArchiveListType {
    id: number;
    subject: string;
    count: number;
    professor: string;
    date: string;
}
