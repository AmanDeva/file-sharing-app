export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  encrypted: boolean;
  expiryDate?: Date;
}

export interface UploadedFile extends FileInfo {
  url: string;
  password?: string;
}