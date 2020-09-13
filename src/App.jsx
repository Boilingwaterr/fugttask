import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  getBigDataThunk, getSmallDataThunk, concatLists,
  sort, setInputValue, filter, setInit, setData, clearError
} from './redux/rootReducer';
import Table from './components/Table';
import Search from './components/Search';
import AddForm from './components/AddForm';
import Paginator from './components/Paginator';
import { pageChanger, setTotalRowsCount, divideList } from './redux/paginatorReducer';
import ErrorComponent from './components/Error';

const App = props => {

  const { root, setTotalRowsCount, divideList, paginator, setInit, setData,
    concatLists, getSmallDataThunk, getBigDataThunk } = props;

  const [loadTable, setLoadTable] = useState(false);
  const [type, setType] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [switcher, setSwitcher] = useState(true);
  const [_data, _setData] = useState([]);
  const [date, setDate] = useState();

  // useEffect(() => {
  //   if (loadTable) {
  //     requestIdleCallback(() => {
  //       setDate(new Date())
  //     })
  //   }
  // })

  useEffect(() => {
    if (type === 'big') {
      getBigDataThunk();
    } else if (type === 'small') {
      getSmallDataThunk();
    } else {
      return;
    }
  }, [type, getSmallDataThunk, getBigDataThunk]);

  useEffect(() => {// делим на порции
    if (!!root.filtered) {
      setTotalRowsCount(root.filtered.length) && divideList(root.filtered, paginator.pageSize);
    } else {
      setTotalRowsCount(root.list.length) && divideList(root.list, paginator.pageSize);
    }
    return () => {
      setTotalRowsCount(0) && divideList([], 0);
    };
  }, [root.list, setTotalRowsCount, divideList, paginator.pageSize, root.filtered, root.sortedList]);

  useEffect(() => {
    if (!switcher) {
      _setData(root.sortedList || root.filtered || root.list)
    } else {
      _setData(paginator.listPortion[paginator.currentPage - 1] || root.filtered || root.list)
    }
    return () => {
      _setData([])
    };
  }, [root.sortedList, root.filtered, root.list,
  paginator.listPortion, paginator.currentPage, switcher]);

  if (!loadTable) {
    return <div className="App">
      <button type="submit" onClick={() => { setType('small'); setLoadTable(true); }}>
        SMALL DATA
      </button>
      <button type="submit" onClick={() => { setType('big'); setLoadTable(true); }}>
        BIG DATA
      </button>
    </div>
  } else {
    if (root.error) {
      return <ErrorComponent error={root.error} />
    } else if (addMode) {
      return <AddForm setAddMode={setAddMode} setSwitcher={setSwitcher} />
    } else {
      return <>
        <h1>{date?.toLocaleTimeString()}</h1>
        <Search
          inputValue={root.inputValue}
          setInputValue={props.setInputValue}
          filter={props.filter}
          filtered={root.filtered}
          list={root.list}
          divideList={divideList}
          pageSize={paginator.pageSize}
          setSwitcher={setSwitcher}
        />
        <div className='button-wrapper'>
          <div className='add-button' onClick={() => setAddMode(true)}>
            Добавить
            </div>
        </div>
        <Table
          data={_data}
          type={type}
          getBigDataThunk={props.getBigDataThunk}
          getSmallDataThunk={props.getSmallDataThunk}
          sort={props.sort}
          sortedList={root.sortedList}
          setInit={setInit}
          isInit={root.isInit}
          list={root.list}
          setData={setData}
          concatLists={concatLists}
          newFieldList={root.newFieldList}
          setSwitcher={setSwitcher}
        />
        <Paginator
          totalRowsCount={paginator.totalRowsCount}
          pageSize={paginator.pageSize}
          onPageChanged={props.pageChanger}
          currentPage={paginator.currentPage}
          setSwitcher={setSwitcher}
        />
      </>
    }
  }
}

const mapStateToProprs = state => ({ root: state.rootReducer, paginator: state.paginatorReducer });

export default connect(mapStateToProprs, {
  getSmallDataThunk, getBigDataThunk, sort,
  setInputValue, filter, pageChanger, setTotalRowsCount,
  divideList, setInit, setData, concatLists, clearError
})(App);
