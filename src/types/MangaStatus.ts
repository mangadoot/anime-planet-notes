export enum MangaStatus {
  Unread = '0',
  Reading = '2',
  WantToRead = '4',
  Stalled = '5',
  Dropped = '3',
  WontRead = '6',
}
export const MangaStatusIdToName = {
  [MangaStatus.Unread]: 'Unread',
  [MangaStatus.Reading]: 'Reading',
  [MangaStatus.WantToRead]: 'Want to Read',
  [MangaStatus.Stalled]: 'Stalled',
  [MangaStatus.Dropped]: 'Dropped',
  [MangaStatus.WontRead]: "Won't Read",
};
