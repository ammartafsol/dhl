
export const downloadFile = async ({
  route,
  fileName = "file",
  extension = ".csv",
  get,
}) => {
  const { response } = await get({
    route,
    config: { responseType: "blob" }, 
  });

  if (response) {
    const blob = response instanceof Blob
      ? response
      : new Blob([response.data || response], { type: "text/csv;charset=utf-8;" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}${extension}`);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }
};
