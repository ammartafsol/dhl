import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import classes from "./ImagePreview.module.css";
import { mediaUrl } from "@/resources/utils/helper";
import { Col } from "react-bootstrap";

const ImagePreview = ({ images, className, media = false,mediaClass }) => {
  return (
    <PhotoProvider maskOpacity={0.75}>
      <div className={`${classes?.imageContainer} ${className && className}`}>
        {images?.map((item, index) =>
          media ? (
            <Col key={index} md={12} className={mediaClass}>
              <PhotoView key={index} src={mediaUrl(item?.key)}>
                <img src={mediaUrl(item?.key)} alt="" />
              </PhotoView>
            </Col>
          ) : (
            <Col key={index} sm={6} md={4} lg={3}>
              <PhotoView key={index} src={mediaUrl(item)}>
                <img src={mediaUrl(item)} alt="" />
              </PhotoView>
            </Col>
          )
        )}
      </div>
    </PhotoProvider>
  );
};

export default ImagePreview;
