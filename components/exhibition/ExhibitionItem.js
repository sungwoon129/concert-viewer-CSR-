import React from "react";
import Link from "next/link";
import styles from "../../style/index.module.css";
import Image from "next/image";
import HtmlDecoder from "lodash";

const ExhibitionItem = ({ item }) => {
  const {
    seq,
    title,
    startDate,
    endDate,
    place,
    realmName,
    area,
    thumbnail,
    gpsX,
    gpsY,
  } = item;
  const url = "/item/" + seq._text;

  return (
    <div className={styles.ConcertItemBlock}>
      {thumbnail && (
        <Link href={{ pathname: url, query: { category: "exhibition" } }}>
          <div className={styles.thumbnail}>
            <img
              className={styles.thum_img}
              src={thumbnail._text}
              alt="thumbnail"
            />
          </div>
        </Link>
      )}
      <div className={styles.contents}>
        <h3 className={styles.sub}>{HtmlDecoder.unescape(title._text)}</h3>
        <div>
          {startDate._text} - {endDate._text}
        </div>
        <div>{place._text}</div>
        <p>{realmName._text}</p>
        <p>
          <b>{area._text}</b>
        </p>
      </div>
    </div>
  );
};

export default ExhibitionItem;
