import React from 'react'
import DataTable from 'react-data-table-component';

const customHeaderStyle = {
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
};



const DataTableBase = (props) => {
  return (
    <DataTable
      pagination
      direction="auto"
      responsive
      subHeaderAlign="right"
      subHeaderWrap
      striped
      highlightOnHover
      fixedHeader
      customHeaderStyle={customHeaderStyle}
      {...props} />
  )
}

export default DataTableBase
