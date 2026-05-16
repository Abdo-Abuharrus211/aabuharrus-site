

export type Project = {
    id: number;
    name: string;
    teaser: string;
    featured: boolean;
    images: string[];
    date: string;
    text: string;
    keyPoints: string[];
    status: string;
    link: string;
    github: string;
    tags: string[];
};


export type Skill = {
    id: number,
    name: string,
    icon: string,
    points: string[]
};

export type pDataEntry = { id: number; data: Project };
