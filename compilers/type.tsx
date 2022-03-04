// Project Type
export type Project = {
  id: number;
  attributes: {
    ProjectTitle: string;
    Slug: string;
    ProjectDescription: string;
    LecturerName: string;
    CourseName: string;
    ProjectDate: string;
    ProjectExternalLink: string;
    ProjectLinkDisplay: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    ImagesCarousel: boolean;
    ProjectImages: {
      data: ImagesDataType[];
    };
    Project3D: boolean;
    Project3DLink: string;
    ProjectPDF: boolean;
    ProjectPDFLink: string;
    ProjectCode: boolean;
    ProjectCodeLink: string;
    ProjectThumbnail: ImagesDataType;
    SeoData: SeoDataType;
    level: {
      data: Level;
    };
    school: {
      data: School;
    };
    major: {
      data: Major;
    };
    student: {
      data: Student;
    };
    award: {
      data: Award;
    }
  };
};

export type Projects = Project[];

// School Type
export type School = {
  id: number;
  attributes: {
    SchoolName: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    majors: {
      data: Major[];
    };
    projects: {
      data: Project[];
    };
  };
};

export type Major = {
  id: number;
  attributes: {
    MajorName: string;
    MajorTeReo: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export type Schools = School[];

// Level study type
export type Level = {
  id: number;
  attributes: {
    StudyLevel: string;
    createdAt: Date;
    projects: Projects;
    publishedAt: Date;
    updatedAt: Date;
  };
};

export type Levels = Level[];

// Award type
export type Award = {
  id: number;
  attributes: {
    AwardName: string;
    createdAt: Date;
    publishedAt: Date;
    updatedAt: Date;
  };
};

export type Awards = Award[];

// Student type
export type Student = {
  id: number;
  attributes: null | {
    StudentName: string;
    StudentShortDetail: string;
    StudentRichDetail: string;
    award: {
      data: Award
    };
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

// Homepage type
export type Homepage = {
  id: number;
  attributes: {
    Hero_title: string;
    quick_intro_title: string;
    Quick_intro_te_reo: string;
    Quick_intro_text_column_one: string;
    Quick_intro_text_column_two: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    hero_banner: ImagesDataType;
    SeoData: SeoDataType;
  };
};

// About page type
export type About = {
  id: number;
  attributes: {
    AboutTitle: string;
    AboutShortDescription: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    SeoData: SeoDataType;
  };
};

// Other component type
type SeoDataType = {
  id: number;
  MetaTitle: string;
  MetaDescription: string;
  ShareImage: ImagesDataType;
};

type ImagesDataType = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          width: number;
          height: number;
          size: number;
          path: string;
          url: string;
        };
        large: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          width: number;
          height: number;
          size: number;
          path: string;
          url: string;
        };
        medium: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          width: number;
          height: number;
          size: number;
          path: string;
          url: string;
        };
        small: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          width: number;
          height: number;
          size: number;
          path: string;
          url: string;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string;
      provider: string;
      provider_metadata: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};
