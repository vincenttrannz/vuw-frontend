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
    ProjectVideo: string;
    ProjectVideoLink: string;
    ProjectCaption: string;
    ProjectTags: string;
    ProjectThumbnail: ImagesDataType;
    ProjectExternalLink: string;
    ProjectLinkDisplay: string;
    SubProject3D: SubProject3D;
    SubProjectCarousel: SubProjectCarousel;
    SubProjectCode: SubProjectCode;
    SubProjectPDF: SubProjectPDF;
    SubProjectVideo: SubProjectVideo;
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
    StudentEmail: string;
    StudentMinor: string;
    StudentShortDetail: string;
    FirstStudentLink: string;
    SecondStudentLink: string;
    ThirdStudentLink: string;
    FourthStudentLink: string;
    award: {
      data: Award;
    };
    major: {
      data: Major;
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
    Slug: string;
    EventShortDescription: string;
    EventLocation: string;
    EventGoogleLocation: string;
    EventPrice: string;
    EventPriceType: string;
    EventType: string;
    EventCalendarDescription: string;
    EventFirstLink: string;
    EventSecondLink: string;
    EventThirdLink: string;
    EventImageThumbnail: ImagesDataType;
    event_categories: {
      data: EventCategories;
    };
    event_type: {
      data: EventType;
    };
    projects: {
      data: Projects;
    };
    SeoData: SeoDataType;
    EventStartDate: Date;
    EventFinishDate: Date;
    EventRichDescription: string;
    EventVideoLink: string;
    EventGallery: SubProjectCarousel;
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
    events: Events;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export type EventCategories = EventCategory[];

export type EventType = {
  id: number;
  attributes: {
    EventTypeName: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    events: {
      data: Events;
    };
  };
};

export type EventTypes = EventType[];

// Global type
export type Global = {
  id: number;
  attributes: {
    SiteName: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    Favicon: ImagesDataType;
    SeoData: SeoDataType;
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
    QuickIntroSubtitle: string;
    QuickIntroColumnOne: string;
    QuickIntroColumnTwo: string;
    SeoData: SeoDataType;
    EventPageHeroBanner: ImagesDataType;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

// Privacy Policy page
export type PrivacyPage = {
  id: number;
  attributes: {
    SeoData: SeoDataType;
    HeroBanner: ImagesDataType;
    ContentBlock: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  }
}

// Other component type
export type SeoDataType = {
  id: number;
  MetaTitle: string;
  MetaDescription: string;
  ShareImage: ImagesDataType;
};

export type TwoColumnsBlock = {
  id: number;
  BlockImage: ImagesDataType;
  BlockParagraph: string;
  BlockTitle: string;
};

export type GreyContentBlock = {
  id: number;
  BlockTitle: string;
  BlockRichText: string;
  BlockButtonLink: string;
};

export type SubProject3D = {
  id: number;
  Project3DLink: string;
  ProjectCaption: string;
};

export type SubProjectCarousel = {
  id: number;
  ProjectImages: {
    data: ImagesDataType["data"][] | ImagesDataType["data"];
  };
};

export type SubProjectCode = {
  id: number;
  ProjectCodeLink: string;
  ProjectCaption: string;
};

export type SubProjectPDF = {
  id: number;
  ProjectCaption: string;
  ProjectPDFLink: {
    data: ImagesDataType["data"];
  };
};

export type SubProjectVideo = {
  id: number;
  ProjectVideoLink: string;
  ProjectCaption: string;
};

export type ImagesDataType = {
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
