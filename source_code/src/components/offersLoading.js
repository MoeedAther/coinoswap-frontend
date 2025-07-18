import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OffersLoading = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skeleton
        enableAnimation={true}
        borderRadius={18}
        className="offer-skeleton-animation"
      ></Skeleton>
    </SkeletonTheme>
  );
};
export default OffersLoading;
