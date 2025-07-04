import { RenderTextCell } from "@/component/organisms/AppTable/CommonCells";

export const PatientTableHeader = [
  {
    key: "name",
    title: "Name",
    style: { width: "10%" },
    renderValue: (cellValue, completeData) => {
      let data =
        completeData?.firstName &&
        `${completeData?.firstName} ${completeData?.lastName}`;
      return <RenderTextCell {...{ cellValue: data }} />;
    },
  },
  {
    key: "email",
    title: "Email Address",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "medicalCondition",
    title: "Medical Conditions",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "gender",
    title: "Gender",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "bloodType",
    title: "Blood Type",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "usefulInformation",
    title: "Useful Information",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Action",
    key: "action",
    style: { width: "10%" },
  },
];
