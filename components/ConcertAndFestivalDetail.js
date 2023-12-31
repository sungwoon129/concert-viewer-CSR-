import axios from "axios";
import convert from "xml-js";
import Header from "./Header";
import Footer from "./Footer";
import usePromise from "@/lib/hooks/usePromise";
import Image from "next/image";
import style from "../style/detail.module.css";
import Back from "./Back";
import Loader from "./Spinner";

const toJson = (xml) => {
  const jsonStr = convert.xml2json(xml.data, {
    compact: true,
    spaces: 4,
  });
  return JSON.parse(jsonStr);
};

const ConcertItemAndFestivalDetail = ({ itemId }) => {
  const [loading, response, error] = usePromise(() => {
    return axios.get(
      `/api/classic_and_festival/${itemId}?service=${process.env.NEXT_PUBLIC_CONCERTKEY}`
    );
  }, [itemId]);

  if (loading) {
    return (
      <>
        <Header />
        <Back />
        <div className={style.contentsWrap}>
          <Loader />
        </div>
        <Footer />
      </>
    );
  }
  if (error)
    return (
      <>
        <Header />
        <Back />
        <div>
          <p>데이터 로딩 중 에러가 발생하였습니다.</p>
        </div>
        <Footer />
      </>
    );

  if (response) {
    const jsonData = toJson(response);

    const {
      poster,
      prfnm,
      prfpdfrom,
      prfpdto,
      fcltynm,
      prfcrew,
      prfruntime,
      prfage,
      entrpsnm,
      sty,
      area,
      mt210,
      genrenm,
      openrun,
      prfstate,
      styurls,
      dtguidance,
      pcseguidance,
      prfcast,
    } = jsonData.dbs.db;

    return (
      <>
        <Back />
        <div className={style.contentsWrap}>
          <div className={style.imgBox}>
            <img
              src={poster._text}
              className={style.poster}
              onClick={() => {
                return window.open(
                  `https://www.google.com/search?q=${encodeURI(prfnm._text)}`,
                  "_blank"
                );
              }}
              alt="포스터 이미지"
              sizes="210px"
              width={300}
              height={400}
            />
          </div>
          <div className={style.description}>
            <div className={style.title}>{prfnm._text}</div>
            <div>
              기간 : {prfpdfrom._text} - {prfpdto._text}
            </div>
            <div>시간 : {dtguidance._text}</div>
            <div>장소 : {fcltynm._text}</div>
            <div>지역 : {area._text}</div>
            <div>가격 : {pcseguidance._text}</div>
            <div>런타임 : {prfruntime._text}</div>
            <div>관람연령제한 : {prfage._text}</div>
            <div>{prfstate._text}</div>
            <div>출연진 : {prfcast._text}</div>
            <div>오픈런 : {openrun._text}</div>
          </div>
        </div>
        <div className={style.subImgBox}>
          {styurls.styurl ? (
            <img
              src={styurls.styurl._text}
              alt="기타 이미지"
              layout="fill"
              sizes="180px"
              className="subImg"
            />
          ) : (
            <></>
          )}
        </div>
        <Footer />
      </>
    );
  }
};

export default ConcertItemAndFestivalDetail;
