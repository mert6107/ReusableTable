import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { DataList } from './dataList';

import {DataType} from './types/interface'


function App() {
  const [dataTable, setDataTable] = useState<DataType[]>([]);

  useEffect(() => {
    setDataTable(DataList)

  }, []);
 
 const column = [
  { heading: 'Id', value: 'id' , render: (text:string) => <a href="#">{text}</a>},
  { heading: 'Name', value: 'name', sorter: 'desc',},
  { heading: 'Email', value: 'email', render: (text:string) => <a href="#">{text}</a> },
  { heading: 'Body', value: 'body', searchMode:true},
]

  return (
    <div className="App">
      <Table data={dataTable} column={column} />
      </div>
  );
}

export default App;