import {
  RenderAmount,
  RenderApprovalButtons,
  RenderDateCell,
  RenderShipmentStatus,
  RenderStatus,
  RenderTextCell,
} from "@/component/organisms/AppTable/CommonCells";
import Button from "@/component/atoms/Button";
import moment from "moment-timezone";

export const merchantTableHeader = [
  {
    key: "fullName",
    title: "Name",
    style: { width: "10%" },
    // renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "email",
    title: "Email",
    style: { width: "14%" },
    // renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "createdAt",
    title: "Register date",
    style: { width: "12%" },
    renderValue: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "phoneNumber",
    title: "Phone Number",
    style: { width: "13%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },

  {
    key: "country",
    title: "Country",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "isActive",
    title: "Status",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderStatus {...{ cellValue }} />,
  },
  {
    key: "city",
    title: "City",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },

  {
    title: "",
    key: "action",
    style: { width: "10%" },
  },
];

export const productRequestsTableHeader = [
  {
    key: "name",
    title: "Product name",
    style: { width: "25%" },
  },
  {
    key: "category",
    title: "Category",
    style: { width: "10%" },
    // renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "updatedAt",
    title: "Upload date",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "costPrice",
    title: "Cost Price",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderAmount {...{ cellValue }} />,
  },
  {
    key: "salePrice",
    title: "Sale Price",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderAmount {...{ cellValue }} />,
  },
  {
    key: "status",
    title: "Admin Approval",
    style: { width: "20%" },
    renderTextCell: (cellValue, rowItem, handleApproval) => (
      <RenderApprovalButtons
        cellValue={rowItem}
        handleApproval={handleApproval}
      />
    ),
  },
  {
    title: "",
    key: "action",
    style: { width: "10%" },
  },
];

export const merchantDetailTableHeader = [
  {
    key: "name",
    title: "Product name",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "category",
    title: "Category",
    style: { width: "15%" },
  },
  {
    key: "updatedAt",
    title: "Upload date",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "costPrice",
    title: "Cost Price",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderAmount cellValue={cellValue} />,
  },
  {
    key: "salePrice",
    title: "Sale Price",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderAmount cellValue={cellValue} />,
  },
  {
    key: "wholesaleCount",
    title: "Wholesale Package",
    style: { width: "15%" },
  },
  {
    title: "",
    key: "action",
    style: { width: "10%" },
  },
];

export const merchantManualShipmentsTableHeader = [
  {
    key: "name",
    title: "Product name",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "buyer",
    title: "Buyer Name",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "date",
    title: "Order date",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "price",
    title: "Order Price",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "status",
    title: "Order Status",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderShipmentStatus {...{ cellValue }} />,
  },
  {
    title: "",
    key: "action",
    style: { width: "10%" },
  },
];

export const ordersTableHeader = [
  {
    key: "user",
    title: "User Name",
    style: { width: "12%" },
    // Custom rendering handled in component
  },
  {
    key: "merchant",
    title: "Merchant Name",
    style: { width: "12%" },
    // Custom rendering handled in component
  },
  {
    key: "totalPrice",
    title: "Total Price",
    style: { width: "10%" },
    // Custom rendering handled in component
  },
  {
    key: "status",
    title: "Status",
    style: { width: "10%" },
    // Custom status rendering handled in component
  },
  {
    key: "country",
    title: "Country",
    style: { width: "8%" },
    // Custom rendering handled in component
  },
  {
    key: "city",
    title: "City",  
    style: { width: "8%" },
    // Custom rendering handled in component
  },
  {
    key: "address",
    title: "Address",
    style: { width: "10%" },
    // Custom address rendering handled in component
  },
  {
    key: "createdAt",
    title: "Order Date",
    style: { width: "12%" },
    renderValue: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "shippingType",
    title: "Shipping Type",
    style: { width: "10%" },
    // Custom rendering handled in component
  },
  {
    title: "Action",
    key: "action",
    style: { width: "8%" },
  },
];

export const giftTableHeader = [
  {
    key: "title",
    title: "Title",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "startDate",
    title: "Start date",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "type",
    title: "Type",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "endDate",
    title: "End date",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "amount",
    title: "Price",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderAmount {...{ cellValue }} />,
  },
  {
    key: "isActive",
    title: "Status",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderStatus {...{ cellValue }} />,
  },
  {
    title: "",
    key: "action",
    style: { width: "10%" },
  },
];

export const MerchantsTableHeader = [
  {
    key: "merchants",
    title: "Marchant name",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "email",
    title: "Email",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "date",
    title: "Register date",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  // {
  //   key: "shipping",
  //   title: "Shipping Type",
  //   style: { width: "20%" },
  //   renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  // },
  {
    key: "country",
    title: "Country",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "",
    key: "action",
    style: { width: "20%" },
  },
];
export const disputeTableHeader = [
  {
    key: "reason",
    title: "Reason",
    style: { width: "20%" },
    // renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "username",
    title: "User Name",
    style: { width: "15%" },
    // renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue:'123' }} />,
  },
  {
    key: "justification",
    title: "Justification",
    style: { width: "15%" },
    // renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "refundAmount",
    title: "Amount",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderAmount {...{ cellValue }} />,
  },
  {
    key: "updatedAt",
    title: "date",
    style: { width: "10%" },
    // renderTextCell: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "status",
    title: "Status",
    style: { width: "10%" },
    // renderTextCell: (cellValue) => <RenderStatus {...{ cellValue }} />,
  },
  {
    title: "",
    key: "action",
    style: { width: "15%" },
  },
];

export const categorTableHeader = [
  {
    key: "title",
    title: "Category Name",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "updatedAt",
    title: "Date",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "isActive",
    title: "Status",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderStatus {...{ cellValue }} />,
  },
  {
    title: "",
    key: "action",
    style: { width: "25%" },
  },
];

export const giftDetailTableHeader = [
  {
    key: "fullName",
    title: "Username",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "email",
    title: "Email",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  
  {
    title: "",
    key: "action",
    style: { width: "15%" },
  },
];

export const billingHistoryTableHeader = [
  {
    key: "username",
    title: "Username",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "userType",
    title: "User Type",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "date",
    title: "Date",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "amount",
    title: "Amount",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "commission",
    title: "Commission Rate",
    style: { width: "12%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "discount",
    title: "Loyalty Discount",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "status",
    title: "Status",
    style: { width: "13%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "action",
    title: "",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
];

export const userTableHeader = [
  {
    key: "fullName",
    title: "Name",
    style: { width: "12%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "email",
    title: "Email",
    style: { width: "15%" },
    // renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "createdAt",
    title: "Register date",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "phoneNumber",
    title: "Phone Number",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "ordersCount",
    title: "Orders",
    style: { width: "8%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "country",
    title: "Country",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "isActive",
    title: "Status",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderStatus {...{ cellValue }} />,
  },
  {
    key: "city",
    title: "City",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "",
    key: "action",
    style: { width: "10%" },
  },
];

export const userDetailTableHeader = [
  {
    key: "name",
    title: "Product name",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "category",
    title: "Category",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "date",
    title: "Upload date",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "cost",
    title: "Price",
    style: { width: "10%" },
    renderTextCell: (cellValue) => <RenderAmount {...{ cellValue }} />,
  },
  {
    title: "",
    key: "action",
    style: { width: "10%" },
  },
];
export const walletTableHeader = [
  {
    key: "name",
    title: "Username",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Date",
    key: "createdAt",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    key: "amount",
    title: "Amount",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "commission",
    title: "Commission Rate",
    style: { width: "20%" },
    renderTextCell: (cellValue) => <RenderAmount {...{ cellValue }} />,
  },
  {
    key: "discount",
    title: "Discount Code",
    style: { width: "20%" },
  },
  {
    key: "loyaltyDiscount",
    title: "Loyalty Discount",
    style: { width: "15%" },
    renderTextCell: (cellValue) => <RenderAmount {...{ cellValue }} />,
  },
];

export const walletRequestHeader = [
  {
    key: "name",
    title: "Username",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "amount",
    title: "Amount",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "withdrawalStatus",
    title: "Status",
    style: { width: "25%" },
  },
  {
    key: "action",
    title: "",
    style: { width: "25%" },
    renderTextCell: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
];

export const walletRefundTableHeader = [
  {
    key: "userName",
    title: "User Name",
    style: { width: "25%" },
    renderTextCell: (cellValue, rowItem) => rowItem?.user?.fullName || "-",
  },
  {
    key: "amount",
    title: "Amount",
    style: { width: "15%" },
    renderTextCell: (cellValue, rowItem) => `SAR ${rowItem?.amount?.toFixed(0) || 0}`,
  },
  {
    key: "refundStatus",
    title: "Refund Status",
    style: { width: "15%" },
    renderTextCell: (cellValue, rowItem) => {
      const status = rowItem?.refundStatus;
      let color = "#FFA500"; // pending
      if (status === "completed") color = "#4CAF50";
      return (
        <span style={{ color, fontWeight: 600, textTransform: "capitalize" }}>
          {status}
        </span>
      );
    },
  },
  {
    key: "createdAt",
    title: "Created At",
    style: { width: "15%" },
    renderTextCell: (cellValue, rowItem) => 
      rowItem?.createdAt ? moment(rowItem.createdAt).format("YYYY/MM/DD") : "-",
  },
  {
    key: "action",
    title: "Action",
    style: { width: "30%" },
    renderTextCell: (cellValue, rowItem, _, { onViewDetails, onRelease, releaseRefundLoadingId }) => (
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          variant="outlined"
          label="View Details"
          onClick={() => onViewDetails(rowItem)}
          style={{ fontSize: "12px", padding: "6px 14px",width:"fit-content" }}
        />
        {rowItem?.refundStatus !== "completed" && (
          <Button
            label={releaseRefundLoadingId === rowItem._id ? "Releasing..." : "Release"}
            onClick={() => onRelease(rowItem)}
            style={{ fontSize: "12px", padding: "6px 26px",width:"fit-content" }}
            disabled={releaseRefundLoadingId === rowItem._id}
          />
        )}
      </div>
    ),
  },
];
