declare interface FileItem {
  FILEID: number;
  FILEPATH: string;
}

declare interface IToken {
  type: string;
  name: string;
  value: string;
}

declare interface ITokenDB {
  TYPE: string;
  NAME: string;
  VALUE: string;
}

declare module '*.less'

declare type FilesList = FileItem[];

declare type TokensList = Array<ITokenDB>;

declare module NodeJS {
  interface Global {
    db: any;
  }
}
