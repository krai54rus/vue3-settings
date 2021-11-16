declare namespace Test {
    export interface Test1 {
      title: string,
      acl: Array<any>,
      fail?: boolean,
      denied?: boolean,
      text: string,
      [key: string]: any,
    }
  
    export interface Test2 extends Error {
      list?: Array<any>,
    }
  
    export interface Test3 {
      result: number,
      reply: any,
      fail?: boolean,
      denied?: boolean,
      text?: string,
    }
  }
  