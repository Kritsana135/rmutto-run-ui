export type ProgressStatus = 'approved' | 'rejected' | 'pending';

export interface IProgressTable {
  id: string
  fullName: string;
  distance: number;
  imageUrl: string;
  uploadDate: Date;
  status: ProgressStatus;
}
