export interface ExamArchiveAuthorType {
    studentNumber: string;
    userID: string;
}

export interface ExamArchiveType {
    id: number;
    subject: string;
    professor: string;
    semester: string;
    author: ExamArchiveAuthorType;
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
