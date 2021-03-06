import {
  Box,
  Grid
} from '@chakra-ui/react'

import TableDataCell from './TableDataCell'
import TableHeaderCell from './TableHeaderCell'

import { generateGridTemplateColumns } from 'utils/table'

export default function SimpleTable (props) {
  const {
    rows,
    fields,
    hideFields = [],
    rowKey,
    rowType
  } = props

  const filteredFields = hideFields.length > 0 ? fields.filter(({ key }) => !hideFields.includes(key)) : fields

  return (
    <Grid as='table' gridTemplateColumns={generateGridTemplateColumns(filteredFields)}>
      <Box as='thead' display='contents'>
        <Box as='tr' display='contents'>
          {filteredFields.map(({ key, label, justifyContent = 'left' }, idx) => (
            <TableHeaderCell
              key={key}
              field={key}
              fontSize='xs'
              justifyContent={justifyContent}
              isLeftEdge={idx === 0}
              isRightEdge={idx === filteredFields.length - 1}
            >
              {label}
            </TableHeaderCell>
          ))}
        </Box>
      </Box>
      <Box as='tbody' my='20px' display='contents'>
        {rows.map(row => (
          <Box key={row[rowKey]} as='tr' display='contents'>
            {filteredFields.map(({ key: columnKey, renderTD: RenderTD, justifyContent = 'left', ...rest }) => {
              const cellProps = { ...rest, [rowType]: row, justifyContent }
              return (
                <TableDataCell key={`${rowKey}-${columnKey}`} justifyContent={justifyContent} fontSize='sm'>
                  <RenderTD {...cellProps} />
                </TableDataCell>
              )
            })}
          </Box>
        ))}
      </Box>
    </Grid>
  )
}
