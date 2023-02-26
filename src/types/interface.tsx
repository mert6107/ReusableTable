export interface DataType{
    postId?:number,
    id?:number,
    name?:string,
    email?:string,
    body?:string,
  }
  
  export interface TableProp<T>{
      data:T[],
      column:TablePropColumn[],
    }
    
  interface TablePropColumn{
      id?:number,
      heading:number | string,
      value:string,
      searchMode?:boolean,
      sorter?:string,
      render?:(text:string) => JSX.Element
    }
  
  // TABLE HEAD 
  export interface TableHead<T>{
      dataList:T[],
      item:TablePropColumn,
      column?:TablePropColumn,
      sortFunc:(sorting:boolean)=>void,
      searchFunc:(word:string)=>void
    }
  
  //TABLE ROW
  export interface TableRowProp<T>{
      item:T,
      column?:TablePropColumn[],
    }
  
  //SORTING
  export interface SortFuncProps{
      sortFunc:(args:boolean)=>void
  }
  
  //SEARCHING
  export interface SearchFuncProps{
      searchFunc:(args:string)=>void
  }
  
  //PAGINATION
  export interface PaginationProps{
      totalSearch:number,
      paginate:(args:number)=>void,
      currentPage:number,
  }