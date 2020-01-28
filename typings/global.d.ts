declare interface FileItem {
  FILEID: number;
  FILEPATH: string;
}

declare type FilesList = FileItem[];

declare module NodeJS  {
  interface Global {
      db: any
  }
}
