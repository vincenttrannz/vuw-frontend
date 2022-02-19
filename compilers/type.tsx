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
      data: [ImagesDataType];
    };
    Project3D: boolean;
    Project3DLink: string;
    ProjectPDF: boolean;
    ProjectPDFLink: string;
    ProjectCode: boolean;
    ProjectCodeLink: string;
    ProjectThumbnail: ImagesDataType;
    SeoData: SeoDataType;
  };
};

export type Projects = [Project];

export type School = {
  id: number;
  attributes: {
    SchoolName: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    majors: {
      data: [Major];
    };
    projects: {
      data: [Project];
    };
  };
};

export type Major = {
  id: number;
  attributes: {
    MajorName: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export type Schools = [School]

// Homepage type
export type Homepage = {
  id: number;
  attributes: {
    Hero_title: string;
    quick_intro_title: string;
    Quick_intro_te_reo: string;
    Quick_intro_text_field: string;
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
