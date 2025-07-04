import TableSkeleton from "@/component/molecules/TableSkeleton";
import classes from "./AppTable.module.css";
import { RECORDS_LIMIT } from "@/const";
import PaginationComponent from "@/component/molecules/PaginationComponent";
import NoData from "@/component/atoms/NoData/NoData";
import { mergeClass } from "@/resources/utils/helper";
export default function AppTable({
  data = [],
  tableHeader = [],
  loading = false,
  noDataText = "",
  renderItem = null,
  renderTableHeader = null,
  hasPagination,
  ...props
}) {
  return (
    <>
      <style>
        {`
          .table100-body {
            overflow: auto !important;
          }

          @media screen and (max-width: 1440px) {
            .table100-head,
            .table100-body {
              width: 1200px;
            }
            .table100.ver1 {
              overflow-x: auto !important;
            }
          }
        `}
      </style>
      <div className={mergeClass(`${classes?.tableMainContainer}`)}>
        <div
          className={mergeClass(
            `${classes?.tableHeaderContainer} table100-head`
          )}
        >
          <table>
            <thead>
              <tr>
                {tableHeader?.map((item, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "left",
                      ...(item.style && item.style),
                    }}
                  >
                    {renderTableHeader
                      ? renderTableHeader({ item: item, index })
                      : item?.title}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        {loading ? (
          <TableSkeleton rowsCount={RECORDS_LIMIT} colsData={tableHeader} />
        ) : (
          <div
            className={mergeClass(
              `${classes?.tableBodyContainer} table100-body`
            )}
          >
            <table>
              <tbody>
                {data?.length ? (
                  data?.map((item, rowIndex) => {
                    return (
                      <tr
                        key={rowIndex}
                        className={mergeClass("row100 body", classes.bodyRow)}
                      >
                        {tableHeader?.map(
                          ({ key, style, title, renderValue }, colIndex) => (
                            <td
                              key={colIndex}
                              className={`cell100 column${colIndex + 1}`}
                              style={{
                                textAlign: "left",
                                ...style,
                              }}
                            >
                              {renderItem
                                ? renderItem({
                                    item: item[key],
                                    colIndex,
                                    rowIndex,
                                    key,
                                    title,
                                    renderValue,
                                  })
                                : renderValue
                                ? renderValue(item[key], item)
                                : item[key]}
                            </td>
                          )
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <NoData text={noDataText} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {hasPagination && <PaginationComponent {...props} />}
      </div>
    </>
  );
}
