import React, { useEffect, useState } from 'react';
import '../assets/table.css'
import Search from './Search';
import Sorter from './Sorter';
import Pagination from './Pagination'
import {TableProp , TableHead , TableRowProp} from '../types/interface'


const Table = <T extends {}>({ data, column }:TableProp<T>) => {

    const [dataList,setDataList] = useState(data);
    const [isDESC,setDESC] = useState<boolean>(false)
    const [searchWord,setWord] = useState<string>('')
    const [sortingColumn,setsortingColumn] = useState<string>('')
    const [searchingColumn,setSearchgColumn] = useState<string>('')
   
    const [currentPage,setCurrentPage] = useState<number>(1)
    const indexOfLastPost = currentPage * 6
    const indexOfFirstPost = indexOfLastPost - 6
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber)

    const sortTable = (sorting:boolean)=>{
       setDESC(sorting)
    }
    const searchedWord = (word:string)=>{
      setWord(word)
    }
    const sortColumn:string[] = []
    const searchColumn:string[] = []

    useEffect(()=>{
      setsortingColumn(sortColumn[0])
      const sortedData = dataList.sort(isDESC === true ? (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? 1 : -1 : (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? -1 : 1)
      setDataList(sortedData)
    },[isDESC,dataList])

    useEffect(()=>{
      setSearchgColumn(searchColumn[0])
      setDataList(data.filter((data)=>String(data[searchingColumn as keyof {}]).toLowerCase().includes(searchWord)).sort(isDESC === true ? (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? 1 : -1 : (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? -1 : 1))
    },[data,searchWord])

    useEffect(()=>{
      
    },[searchWord])
    return (
      <>
      <table>
        <thead>
          <tr>
            {column.map((item, index) => {
              if(item.sorter === 'desc'){
                sortColumn.push(item.value)
               }
              if(item.searchMode === true){
                searchColumn.push(item.value)
              } 
              
              return <TableHeadItem item={item} dataList={dataList} sortFunc={sortTable} searchFunc={searchedWord}/>
            })}
          </tr>
          
        </thead>
        <tbody>
          {dataList.slice(indexOfFirstPost,indexOfLastPost).map((item, index) => {
              return <TableRow item={item} column={column} />
          })}
        </tbody>
      </table>
       <div style={{display:'flex',justifyContent:'center'}}>
       <Pagination paginate={paginate} totalSearch={data.length} currentPage={currentPage}/>
     </div>
     </>
    )
  
  }
  
  const TableHeadItem = <T extends {}>({ item, dataList,sortFunc,searchFunc }:TableHead<T>) => {
    const [Data,setData] = useState(dataList);
       useEffect(()=>{
        setData(dataList)
      },[dataList])
        
        if(item.searchMode===true){
            return <th key={item.id}>{item.heading} {<Search searchFunc={searchFunc}/> }</th>
        }
        if(item.sorter === 'desc'){
            return <th key={item.id}>{item.heading} <Sorter sortFunc={sortFunc} /></th>
        }
        if(item.sorter !== null){
          return <th key={item.id}>{item.heading}</th>
      }
        else{
            return <th key={item.id}>{item.heading} </th>
        }
      
  }

  const TableRow = <T extends {}>({ item, column}:TableRowProp<T>) => (
  <tr>
    {column?.map((columnItem, index) => {
      
      if(columnItem.render !== undefined){
        return <td key={index}>{columnItem.render(item[`${columnItem.value}` as keyof {}])}</td>
      }

      return <td key={index}>{item[`${columnItem.value}` as keyof {}]}</td>
    })}
  </tr>
  

)

export default Table
