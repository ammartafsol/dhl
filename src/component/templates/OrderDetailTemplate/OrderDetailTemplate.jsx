"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import Button from "@/component/atoms/Button";
import { Loader } from "@/component/atoms/Loader";
import PageHeading from "@/component/atoms/PageHeading/PageHeading";
import RenderToast from "@/component/atoms/RenderToast";
import ShowMoreShowLessText from "@/component/atoms/ShowMoreShowLess";
import ConfirmModal from "@/component/molecules/Modal/ConfirmModal/ConfirmModal";
import StatusBadge from "@/component/atoms/StatusBadge";
import { VAT_PERCENTAGE } from "@/const";
import useAxios from "@/interceptor/axiosInterceptor";
import {
  capitalizeFirstLetter,
  getFormattedPrice,
  mediaUrl,
  mergeClass,
} from "@/resources/utils/helper";
import moment from "moment-timezone";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import classes from "./OrderDetailTemplate.module.css";

const OrderDetailTemplate = ({ slug }) => {
  const router = useRouter();
  const { Get, Patch } = useAxios();
  const [loading, setLoading] = useState("");
  const [order, setOrder] = useState(null);
  const [areYouSureModalWith, setAreYouSureModalWith] = useState({
    isOpen: false,
    message: "",
  });

  // Helper function to capitalize each word
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(/[\s-]+/) // Split by spaces or hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Calculate VAT
  const vat =
    order?.vatInclusive && order?.vatVisibilityGlobal
      ? ((order?.totalPrice - order?.shippingCost) * VAT_PERCENTAGE) / 100
      : 0;

  // Get order details
  const getOrderDetails = async () => {
    setLoading("loading");
    const { response } = await Get({ route: `orders/detail/${slug}` });

    if (response) {
      setOrder(response?.data);
    }
    setLoading("");
  };

  // Download Invoice
  const handleDownloadInvoice = async () => {
    try {
      setLoading("download");
      const { response } = await Get({
        route: `orders/invoice/${slug}`,
        responseType: "blob",
      });

      if (response) {
        const file = new Blob([response], { type: "application/pdf" });
        const fileURL = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `invoice-${order?.slug || "order"}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(fileURL);

        RenderToast({
          message: "Invoice downloaded successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      RenderToast({
        message: "Failed to download invoice",
        type: "error",
      });
    } finally {
      setLoading("");
    }
  };

  const getShippingStatus = () => {
    if (order?.deliveryType === "pickup" && order?.status === "paid")
      return "Not Picked Up";
    if (order?.deliveryType === "pickup" && order?.status === "delivered")
      return "Picked Up";
    if (order?.status === "paid") return "pending";
    return order?.status;
  };

  const getStatusChangeLabel = () => {
    if (order?.deliveryType === "pickup" && order?.status === "paid")
      return "Order Picked Up";
    if (order?.status === "paid") {
      return "Dispatch Order";
    }
    if (order?.status === "dispatched") {
      return "Deliver Order";
    }
    return capitalizeFirstLetter(order?.status);
  };

  // Handle status change
  const handleStatusChange = async () => {
    if (["delivered", "pending"].includes(order?.status)) return;

    const status =
      order?.deliveryType === "pickup"
        ? "delivered"
        : order?.status === "paid"
        ? "dispatched"
        : "delivered";
    setLoading("status");
    const { response } = await Patch({
      route: `orders/status/${slug}`,
      data: { status },
    });
    if (response) {
      await getOrderDetails();
      setAreYouSureModalWith({ isOpen: false, message: "" });
      RenderToast({
        message: "Order status changed successfully",
        type: "success",
      });
    }
    setLoading("");
  };

  useEffect(() => {
    if (slug) {
      getOrderDetails();
    }
  }, [slug]);

  if (loading === "loading") {
    return <Loader />;
  }

  if (!order) {
    return (
      <Container>
        <PageHeading heading="Order Not Found" showBackRoute />
        <BorderWrapper style={{ padding: "40px", textAlign: "center" }}>
          <p>The requested order could not be found.</p>
        </BorderWrapper>
      </Container>
    );
  }

  return (
    <div className={classes.orderParent}>
      <Container>
        <div className={classes.orderMains}>
          <div className={classes.orders}>
            <PageHeading
              heading={`Order Details - ${order?.slug}`}
              showBackRoute
            />
          </div>
          <Button
            className={classes.btn}
            label={
              loading === "download" ? "Downloading..." : "Download Invoice"
            }
            onClick={handleDownloadInvoice}
            disabled={loading === "download"}
          />
        </div>

        <Row>
          {/* Left Column - Product & Customer Info */}
          <Col md={6} className={classes?.mainLeftCol}>
            {/* Product Information */}
            <BorderWrapper className={classes.productSection}>
              <h6 className={classes.sectionTitle}>Product Information</h6>
              <div className={classes.productInfo}>
                <div className={classes.productImage}>
                  {order?.product?.images?.[0] ? (
                    <Image
                      src={mediaUrl(order.product.images[0])}
                      alt={order.product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className={classes.noImage}>No Image</div>
                  )}
                </div>
                <div className={classes.productDetails}>
                  <h5>{order?.product?.name}</h5>
                  <p className={classes.category}>
                    Category: {order?.product?.category?.title}
                  </p>
                  {order?.product?.description?.[0] && (
                    <div className={classes.description}>
                      <ShowMoreShowLessText
                        text={order.product.description[0]}
                        visibility={150}
                      />
                    </div>
                  )}
                </div>
              </div>
            </BorderWrapper>
            {(order?.status && order?.status !== "delivered") &&
              ["paid", "delivered", "dispatched"].includes(order.status) && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={loading === "status"}
                  onClick={() =>
                    setAreYouSureModalWith({
                      isOpen: true,
                      message: `Are you sure you want to change the order status to ${
                        order?.deliveryType === "pickup"
                          ? "picked up"
                          : order?.status === "paid"
                          ? "dispatched"
                          : "delivered"
                      }?`,
                    })
                  }
                  className={classes.statusButton}
                >
                  {loading === "status"
                    ? "Updating..."
                    : getStatusChangeLabel()}
                </Button>
              )}

            {/* Customer Information */}
            <BorderWrapper className={classes.customerSection}>
              <h6 className={classes.sectionTitle}>Customer Information</h6>
              <div className={classes.customerInfo}>
                <div className={classes.customerDetails}>
                  <div className={classes.customerName}>
                    <strong>{order?.user?.fullName}</strong>
                  </div>
                  <div className={classes.contactInfo}>
                    <span>
                      <MdOutlineEmail size={16} />
                      {order?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </BorderWrapper>

            {/* Merchant Information */}
            <BorderWrapper className={classes.merchantSection}>
              <h6 className={classes.sectionTitle}>Merchant Information</h6>
              <div className={classes.merchantInfo}>
                <div className={classes.merchantDetails}>
                  <div className={classes.merchantName}>
                    <strong>{order?.merchant?.fullName}</strong>
                  </div>
                  <div className={classes.contactInfo}>
                    <span>
                      <MdOutlineEmail size={16} />
                      {order?.merchant?.email}
                    </span>
                    {order?.merchant?.phoneNumber && (
                      <span>
                        <MdOutlinePhone size={16} />
                        {order?.merchant?.phoneNumber}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </BorderWrapper>
          </Col>

          {/* Right Column - Order Details */}
          <Col md={6}>
            <BorderWrapper>
              <div className={classes.approvalDiv}>
                {/* Order Status */}
                <div className={classes.shippingStatus}>
                  <div className={classes.shipStatus}>
                    <FaShippingFast size={30} color="#EF6923" />
                    <h6>Order Status</h6>
                  </div>
                  <div className={classes.statusContainer}>
                    <StatusBadge status={getShippingStatus()} />
                  </div>
                </div>

                {/* Basic Order Info */}
                <div className={classes.infoDiv}>
                  <span>Order ID</span>
                  <p className="t-t-c">{order?.slug}</p>
                </div>

                <div className={classes.infoDiv}>
                  <span>Order Date</span>
                  <p className="t-t-c">
                    {moment(order?.createdAt).format("lll")}
                  </p>
                </div>

                <div className={classes.infoDiv}>
                  <span>Delivery Type</span>
                  <p className="t-t-c">
                    {capitalizeFirstLetter(order?.deliveryType)}
                  </p>
                </div>

                <div className={classes.infoDiv}>
                  <span>Shipping Method</span>
                  <p className="t-t-c">
                    {capitalizeFirstLetter(order?.shippingType)}
                  </p>
                </div>

                {order?.deliveredAt && (
                  <div className={classes.infoDiv}>
                    <span>
                      {order?.deliveryType === "pickup"
                        ? "Picked Up At"
                        : "Delivered At"}
                    </span>
                    <p className="t-t-c">
                      {moment(order?.deliveredAt).format("lll")}
                    </p>
                  </div>
                )}

                {/* Shipping Details */}
                <div className={classes.infoDiv}>
                  <span>Receiver Name</span>
                  <p className="t-t-c">{order?.shippingDetails?.fullName}</p>
                </div>

                <div className={classes.infoDiv}>
                  <span>Delivery Address</span>
                  <p>{order?.shippingDetails?.address}</p>
                </div>

                <div className={classes.infoDiv}>
                  <span>Country</span>
                  <p className="t-t-c">
                    {capitalizeWords(order?.shippingDetails?.country)}
                  </p>
                </div>

                <div className={classes.infoDiv}>
                  <span>City</span>
                  <p className="t-t-c">
                    {capitalizeWords(
                      order?.shippingDetails?.city?.replace("-", " ")
                    )}
                  </p>
                </div>

                {order?.shippingDetails?.zipcode && (
                  <div className={classes.infoDiv}>
                    <span>Zipcode</span>
                    <p className="t-t-c">{order?.shippingDetails?.zipcode}</p>
                  </div>
                )}

                {/* Product Variants */}
                {order?.selectedSizes?.length > 0 && (
                  <div className={classes.infoDiv}>
                    <span>Selected Variants</span>
                    <div className={classes.infoSubDiv}>
                      {order.selectedSizes.map((variant, i) => (
                        <div className={classes.priceDiv} key={i}>
                          <span>
                            {variant?.unit?.name} x {variant?.quantity}
                          </span>
                          <p>
                            {getFormattedPrice(
                              order?.unitPrice * variant?.quantity
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wholesale Packages */}
                {order?.wholesalePackages?.length > 0 && (
                  <div className={classes.infoDiv}>
                    <span>Wholesale Packages</span>
                    <div className={classes.infoSubDiv}>
                      {order.wholesalePackages.map((pkg, i) => (
                        <div className={classes.priceDiv} key={i}>
                          <span>
                            {pkg?.unit?.name} x {pkg?.quantity}
                          </span>
                          <p>{getFormattedPrice(pkg?.price * pkg?.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className={mergeClass(classes.vatDiv)}>
                  <span>Shipping Cost</span>
                  <p>{getFormattedPrice(order?.shippingCost)}</p>
                </div>

                {order?.vatInclusive && order?.vatVisibilityGlobal && (
                  <div className={mergeClass(classes.vatDiv)}>
                    <span>VAT ({VAT_PERCENTAGE}%)</span>
                    <p>{getFormattedPrice(vat)}</p>
                  </div>
                )}

                <div className={classes.finalPrice}>
                  <span>Total Amount</span>
                  <p>{getFormattedPrice(order?.totalPrice)}</p>
                </div>

                {/* Payable to Merchant - Prominent Display */}
                {order?.payableToMerchant && (
                  <div className={classes.payableToMerchant}>
                    <span>Payable to Merchant</span>
                    <p>{getFormattedPrice(order?.payableToMerchant)}</p>
                  </div>
                )}
              </div>
            </BorderWrapper>
          </Col>
        </Row>
      </Container>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={areYouSureModalWith.isOpen}
        onClose={() => setAreYouSureModalWith({ isOpen: false, message: "" })}
        message={areYouSureModalWith.message}
        onYesClick={handleStatusChange}
        isLoading={loading === "status"}
      />
    </div>
  );
};

export default OrderDetailTemplate;
