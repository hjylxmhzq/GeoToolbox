const IpcInterface = {
  GET_FILE: 'get-file',
  GET_FILE_RESPONSE: 'get-file-response',
  GET_FILESLIST: 'get-fileslist',
  GET_FILESLIST_RESPONSE: 'get-fileslist-response',
  OPEN_FILE: 'open-file',
  OPEN_FILE_RESPONSE: 'open-file-response',
  OPEN_FILE_EDITOR: 'open-file-editor',
  OPEN_FIlE_EDITOR_RESPONSE: 'open-file-editor-response',
  OPEN_TOUR_GUIDE: 'open-tour-guide',
  RELOAD_FILE: 'reload-file',
  RELOAD_FILE_RESPONSE: 'reload-file-response',
  GET_FILE_CONTENT: 'get-file-content',
  GET_FILE_CONTENT_RESPONSE: 'get-file-content-response',
  GET_TOKENSLIST: 'get-tokenslist',
  GET_TOKENSLIST_RESPONSE: 'get-tokenslist-response',
  DELETE_TOKEN: 'delete-token',
  ADD_TOKEN: 'add-token',
}

enum TourGuidePage {
  BAIDU_LBS = 'baidulbs',
}

export interface IToken {
  type: string;
  name: string;
  value: string;
}

export { IpcInterface, TourGuidePage };