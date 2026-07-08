export interface ExamArchiveAuthorType {
    studentNumber: string;
    name: string;
}

export interface ExamArchiveFileType {
    id: number;
    name: string;
    url: string;
}

export interface ExamArchiveType {
    id: number;
    subject: string;
    professor: string;
    semester: string;
    examYear?: number;
    semesterCode?: "FIRST" | "SECOND" | "SUMMER" | "WINTER";
    examType?: "MIDTERM" | "FINAL";
    author: ExamArchiveAuthorType;
    date: string;
    description: string;
    files?: string[] | ExamArchiveFileType[];
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

export interface ExamArchivesResponseType {
    content: ExamArchiveListType[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
} 
