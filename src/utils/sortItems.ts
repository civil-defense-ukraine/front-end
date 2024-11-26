import { News } from "../types/News";
import { TeamMember } from "../types/TeamMember";

export const sort  = {
  teamMembers: (person1: TeamMember, person2: TeamMember) => person1.id - person2.id,
  newsByDate: (news1: News, news2: News) => {
    const date1 = new Date(news1.publicationDate);
    const date2 = new Date(news2.publicationDate);
  
    if (date1 > date2) {
      return -1;
    }
    if (date1 < date2) {
      return 1;
    }
  
    return 0;
  }
}