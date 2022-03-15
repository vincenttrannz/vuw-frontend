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
    ProjectTags: string;
    ProjectThumbnail: ImagesDataType;
    ProjectExternalLink: string;
    ProjectLinkDisplay: string;
    DownloadLinkOne: string;
    DownloadLinkOneNameDisplay: string;
    DownloadLinkTwo: string;
    DownloadLinkTwoNameDisplay: string;
    LicensingLink: string;
    LicensingNameDisplay: string;
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
    };
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
    AwardType: string;
    CompanyLink: string;
    CompanyLogo: {
      data: ImagesDataType;
    };
    CompanyName: string;
    projects: {
      data: Projects;
    };
    students: {
      data: Students;
    };
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
      data: Award;
    };
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export type Students = Student[];

// Event type
export type Event = {
  id: number;
  attributes: {
    EventName: string;
    EventShortDescription: string;
    EventLocation: string;
    EventPrice: string;
    EventPriceType: string;
    EventType: string;
    EventImageThumbnail: ImagesDataType;
    event_category: {
      data: EventCategory;
    };
    EventStartDate: Date;
    EventFinishDate: Date;
    EventRichDescription: string;
    EventVideoLink: string;
    EventPhotoGallery: ImagesDataType[];
    EventStartTime: Date;
    EventEndTime: Date;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export type Events = Event[];

export type EventCategory = {
  id: number;
  attributes: {
    EventCategoryName: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export type EventCategories = EventCategory[];

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
    AboutHeroBanner: ImagesDataType;
    AboutShortDescription: string;
    AboutPageInfoBlock: TwoColumnsBlock;
    ArchitectureSchool: TwoColumnsBlock;
    DesignSchool: TwoColumnsBlock;
    FirstContentGreyBlock: GreyContentBlock;
    SecondContentGreyBlock: GreyContentBlock;
    ThirdContentGreyBlock: GreyContentBlock;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    SeoData: SeoDataType;
  };
};

// Event page type
export type EventPage = {
  id: number;
  attributes: {
    QuickIntroTitle: string;
    QuickIntroColumnOne: string;
    QuickIntroColumnTwo: string;
    SeoData: SeoDataType;
    EventPageHeroBanner: ImagesDataType;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

// Other component type
type SeoDataType = {
  id: number;
  MetaTitle: string;
  MetaDescription: string;
  ShareImage: ImagesDataType;
};

type TwoColumnsBlock = {
  id: number;
  BlockImage: ImagesDataType;
  BlockParagraph: string;
  BlockTitle: string;
};

type GreyContentBlock = {
  id: number;
  BlockTitle: string;
  BlockRichText: string;
  BlockButtonLink: string;
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
