import * as React from "react";
import { STATUS_TYPE } from "@egjs/infinitegrid";
import { JustifiedInfiniteGrid } from "@egjs/react-infinitegrid";

import { useStatusStore } from "../../state/status";
import GalleryCard from "./card";
import { GalleryProps } from "./props";
import { useSettingsStore } from "../../state/settings";

export default function GalleryGrid({
  galleries,
  page,
}: {
  galleries: GalleryProps[];
  page: string;
}) {
  const columnCount = useSettingsStore((state) => state.columnCount);
  const statusByPage = useStatusStore((state) => state.statusByPage);
  const updateStatus = useStatusStore((state) => state.updateStatus);
  const igRef = React.useRef() as React.RefObject<JustifiedInfiniteGrid>;

  React.useEffect(() => {
    const newState = statusByPage.get(page);
    if (newState) {
      // console.log(
      //   "updating state: ",
      //   newState.scrollManager.prevScrollPos,
      //   igRef.current!.getStatus(),
      // );
      igRef.current!.setStatus(newState);
    }
  }, [page]);

  const saveView = (prevPage: string) => {
    const sts = igRef.current!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS);

    // console.log("saving state: ", sts.scrollManager.prevScrollPos, prevPage);

    updateStatus(statusByPage.set(prevPage, sts));
  };

  return (
    <JustifiedInfiniteGrid
      style={{ width: "100%" }}
      columnRange={columnCount}
      // rowRange={1}
      gap={5}
      key={page}
      ref={igRef}
    >
      {galleries.map((item, index: number) => (
        <GalleryCard
          calculateView={saveView}
          gallery={item}
          data-grid-groupkey={Math.floor(index / (10 * columnCount))}
          key={index}
          page={page}
          index={index}
        />
      ))}
    </JustifiedInfiniteGrid>
  );
}
