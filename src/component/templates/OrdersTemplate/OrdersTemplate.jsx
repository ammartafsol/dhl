"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import PageHeading from "@/component/atoms/PageHeading/PageHeading";
import AppTable from "@/component/organisms/AppTable/AppTable";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { RECORDS_LIMIT } from "@/const";
import { ordersTableHeader } from "@/developmentContent/tableData/tableHeader";
import useAxios from "@/interceptor/axiosInterceptor";
import { capitalizeFirstLetter, getFormattedPrice } from "@/resources/utils/helper";
import StatusBadge from "@/component/atoms/StatusBadge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./OrdersTemplate.module.css";

export default function OrdersTemplate() {
  const router = useRouter();
  const { Get } = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState("");
  const [data, setData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [countryValue, setCountryValue] = useState({ label: "All Countries", value: "" });
  const [cityValue, setCityValue] = useState({
    label: "All Cities", 
    value: "",
  });

  const getShippingStatus = (order) => {
    if (order?.deliveryType === "pickup" && order?.status === "paid")
      return "Not Picked Up";
    if (order?.deliveryType === "pickup" && order?.status === "delivered")
      return "Picked Up";
    if (order?.status === "paid") return "pending";
    // pending, dispatched, delivered, failed;
    return order?.status;
  };

  const getOrders = async ({ 
    pg = currentPage,
    country = countryValue?.value || "",
    city = cityValue?.value || "" 
  }) => {
    const payload = {
      page: pg,
      limit: RECORDS_LIMIT,
      country: country,
      city: city,
    };
    setLoading("loading");
    const query = new URLSearchParams(payload).toString();
    const { response } = await Get({
      route: `admin/shipping/screen?${query}`,
    });

    if (response) {
      setData(response?.data);
      setCurrentPage(pg);
      setTotalRecords(response?.totalRecords);
    }
    setLoading("");
  };

  const getCountriesAndCities = async () => {
    setLoading("countries");
    const { response } = await Get({
      route: "shipping/country/cities",
    });

    if (response && Array.isArray(response)) {
      setCountriesData(response);
    } else if (response?.data && Array.isArray(response.data)) {
      setCountriesData(response.data);
    } else {
      console.log("Countries API response:", response);
      setCountriesData([]);
    }
    setLoading("");
  };

  const handleAddressClick = (address) => {
    if (address) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  // Helper function to capitalize each word
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(/[\s-]+/) // Split by spaces or hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Generate country options
  const countryOptions = [
    { label: "All Countries", value: "" },
    ...(Array.isArray(countriesData) ? countriesData.map((item) => ({
      label: capitalizeWords(item?.country || ""),
      value: item?.country || "",
    })) : []),
  ];

  // Generate city options based on selected country
  const cityOptions = [
    { label: "All Cities", value: "" },
    ...(countryValue?.value && Array.isArray(countriesData)
      ? (countriesData.find(item => item?.country === countryValue.value)?.cities || [])
          .map(city => ({
            label: capitalizeWords((city || "").replace('-', ' ')),
            value: city || "",
          }))
      : []
    ),
  ];

  // Handle country change and reset city
  const handleCountryChange = (newCountry) => {
    setCountryValue(newCountry || { label: "All Countries", value: "" });
    setCityValue({ label: "All Cities", value: "" });
  };

  useEffect(() => {
    getCountriesAndCities();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    getOrders({
      pg: 1,
      country: countryValue?.value || "",
      city: cityValue?.value || "",
    });
  }, [countryValue, cityValue]);

  return (
    <Container>
      <PageHeading heading={"Orders"} />
      <BorderWrapper className={classes.tableWrapper}>
        <div className={classes.customTableTop}>
          <div className={classes.filterSection}>
            <div className={classes.filterTabs}>
              {loading !== "countries" && Array.isArray(countriesData) ? (
                <>
                  <DropDown
                    placeholder={"Country"}
                    value={countryValue}
                    setValue={handleCountryChange}
                    options={countryOptions}
                    containerClass={classes.dropDownContainer}
                    border
                  />
                  <DropDown
                    placeholder={"City"}
                    value={cityValue}
                    setValue={setCityValue}
                    options={cityOptions}
                    containerClass={classes.dropDownContainer}
                    border
                    disabled={!countryValue?.value}
                  />
                </>
              ) : (
                <div className={classes.loadingText}>Loading filters...</div>
              )}
            </div>
          </div>
        </div>
        <hr className={classes.line} />
        <AppTable
          loading={loading === "loading"}
          tableHeader={ordersTableHeader}
          data={data}
          noDataText="No Orders Found"
          hasPagination={true}
          currentPage={currentPage}
          totalRecords={totalRecords}
          {...{ totalRecords, currentPage: currentPage }}
          setCurrentPage={(p) => {
            setCurrentPage(p);
            getOrders({
              pg: p,
              country: countryValue?.value || "",
              city: cityValue?.value || "",
            });
          }}
          renderItem={({ item, key, rowIndex, renderValue }) => {
            const rowItem = data[rowIndex];
            if (renderValue) {
              return renderValue(item, rowItem);
            }

            if (key === "user") {
              return <span className="maxLine1">{rowItem?.user?.fullName || "N/A"}</span>;
            }

            if (key === "merchant") {
              return <span className="maxLine1">{rowItem?.merchant?.fullName || "N/A"}</span>;
            }

            if (key === "totalPrice") {
              return <span className="maxLine1">{getFormattedPrice(rowItem?.totalPrice)}</span>;
            }

            if (key === "status") {
              const status = getShippingStatus(rowItem);
              return <StatusBadge status={status} size="small" />;
            }

            if (key === "country") {
              const country = rowItem?.shippingDetails?.country;
              return <span className="maxLine1">{country ? capitalizeWords(country) : "N/A"}</span>;
            }

            if (key === "city") {
              const city = rowItem?.shippingDetails?.city;
              return <span className="maxLine1">{city ? capitalizeWords(city.replace('-', ' ')) : "N/A"}</span>;
            }

            if (key === "address") {
              const address = rowItem?.shippingDetails?.address;
              return (
                <span
                  className={`${classes.addressLink} maxLine1`}
                  title={address || "No address available"}
                  onClick={() => handleAddressClick(address)}
                >
                  CLICK HERE
                </span>
              );
            }

            if (key === "shippingType") {
              return (
                <span className={`${classes.shippingType} maxLine1`}>
                  {capitalizeFirstLetter(rowItem?.shippingType || "N/A")}
                </span>
              );
            }

            if (key === "action") {
              return (
                <p
                  className={classes.actionLink}
                  onClick={() =>
                    router.push(`/orders/${rowItem?.slug}`)
                  }
                >
                  Show Detail
                </p>
              );
            }

            // Fallback for simple string/number values
            return typeof item === 'object' ? "N/A" : (item || "N/A");
          }}
        />
      </BorderWrapper>
    </Container>
  );
} 