/* eslint-disable no-underscore-dangle */
export interface ImageId {
  _id: string;
  baseUrl: string;
  key: string;
  name: string;
}

export class FaqModel {
  isShowing: boolean;

  status: string;

  displayOrder: number;

  _id: string;

  title: string;

  description: string;

  organizationId: string;

  categoryId: string;

  slug: string;

  createdAt: Date;

  updatedAt: Date;

  __v: number;

  videoUrl: string;

  videoType: string;

  imageId: ImageId;

  constructor(data: Partial<FaqModel>) {
    this.displayOrder = data.displayOrder || 0;
    this.status = data.status || '';
    this._id = data._id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.organizationId = data.organizationId || '';
    this.categoryId = data.categoryId || '';
    this.slug = data.slug || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.isShowing = data.isShowing || false;
    this.status = data.status || '';
    this.__v = data.__v || 0;
    this.videoType = data.videoType || '';
    this.videoUrl = data.videoUrl || '';
    this.imageId = data.imageId || <ImageId>{};
  }
}

export interface FaqModelObject {
  success: boolean;
  data: FaqModel[];
}
