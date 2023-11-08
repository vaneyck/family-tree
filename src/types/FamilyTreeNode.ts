export type FamilyTreeNode = {
  id: string;
  name: string;
  pids?: string[];
  fid?: string;
  mid?: string;
  gender: string; // TODO male or female
  yearsRange?: string;
  headShotImage?: string;
};
