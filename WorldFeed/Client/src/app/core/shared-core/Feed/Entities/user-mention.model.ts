export interface UserMention {
  screenName: string; // Screen name of the referenced user
  name: string; // Display name of the referenced user
  id: number; // ID of the mentioned user
  id_str: string;
  indices: [];
}
