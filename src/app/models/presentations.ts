export interface PresentationRequest {
  title: string;
  content: string;
  description?: string;
  settings?: string;
}

export interface Slide {
  id: number;
  position: number;
  title: string;
  content: string;
  layout: string;
}

export interface Presentation {
  id: number;
  title: string;
  description?: string;
  content?: string;
  settings?: string;
  createdAt: string;
  updatedAt: string;
  slides: Slide[];
}
