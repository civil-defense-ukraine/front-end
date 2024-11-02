/* eslint-disable @typescript-eslint/no-explicit-any */
export type TeamMember = {
  id: number;
  image: string;
  name: string;
  position: string;
  description: string;
};

export function isTeamMember(obj: any): obj is TeamMember {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.image === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.position === 'string' &&
    typeof obj.description === 'string'
  );
}
