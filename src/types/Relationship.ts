export enum RelationshipType {
  MARRIED_TO = "MARRIED_TO",
  FATHER_TO = "FATHER_TO",
  MOTHER_TO = "MOTHER_TO",
}

export type Relationship = {
  relationship_uuid: string;
  subject_uuid: string;
  object_uuid: string;
  relationship_type: RelationshipType;
};
