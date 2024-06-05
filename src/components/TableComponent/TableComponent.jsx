/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import { Radio, Divider, Table, Button } from "antd";
import { Excel } from "antd-table-saveas-excel";
import ModalComponent from "../ModalComponent/ModalComponent";
const TableComponent = (props) => {
  const {selectionType = 'checkbox', data: dataSource = [], columns=[], handleDeleteMany} = props
  const [rowSelectedKey, setRowSelectedKey]= useState([])
  const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false)

  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'Action' && col.dataIndex !== 'avatar')
    return arr
  }, [columns])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKey(selectedRowKeys)
      
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeleteManys = () =>{
    handleDeleteMany(rowSelectedKey)
    setIsModalOpenDeleteMany(false)
  }
  const handleCancelDeleteMany= () => {
    setIsModalOpenDeleteMany(false)
  }
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };
  return (
    <>
      {!!rowSelectedKey.length && (
        <Button 
          style={{background:'#1d1ddd', color:'#fff', fontWeight:'bold', cursor:'pointer', fontSize:'14px', marginBottom:'10px', marginRight:'10px'}} 
          onClick={()=> setIsModalOpenDeleteMany(true)}
        >
          Xoá mục đã chọn
        </Button>
      )}
      <Button onClick={exportExcel} style={{marginBottom:'10px'}}>Export Excel</Button>
      <Table
        rowSelection={{
            type: selectionType,
            ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
      <ModalComponent forceRender title="Xoá sản phẩm" open={isModalOpenDeleteMany} onCancel={handleCancelDeleteMany} onOk={handleDeleteManys}>
          <div>Bạn có chắc muốn xoá sản phẩm này không?</div>
        </ModalComponent>
    </>
  );
};

export default TableComponent;
