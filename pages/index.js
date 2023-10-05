import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useObserver } from "../lib/hooks/useObserver";
import ConcertItem from "../components/ConcertItem";
import style from "../style/index.module.css";
import convert from "xml-js";
import moment from "moment";

const initPage = 1;
let from = moment().endOf("week").add(1, "d").format("YYYYMMDD");
let to = moment().endOf("week").add(1, "d").endOf("week").format("YYYYMMDD");

const getConcertList = ({ pageParam = initPage }) =>
  axios
    .get(
      `${process.env.NEXT_PUBLIC_URL}/api/openApi/restful/pblprfr?service=${process.env.NEXT_PUBLIC_SERVICEKEY}&stdate=${from}&eddate=${to}&cpage=${pageParam}&rows=9&prfstate=01,02`
    )
    .then((response) => {
      const result = convert.xml2json(response.data, {
        compact: true,
        spaces: 4,
      });
      const jsonData = JSON.parse(result);
      return {
        list: jsonData.dbs.db,
        cPage: pageParam,
      };
    });

const Index = () => {
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage("concert_list_scroll", 0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("concertList", getConcertList, {
    getNextPageParam: (lastPage) => {
      const { cPage } = lastPage;

      return Number(cPage) + 1;
    },
  });

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    ref: true,
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    if (scrollY !== "0") window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <div className={style.ConcertListBlock}>
      {status === "loading" && <p>불러오는 중</p>}

      {status === "error" && <p>{error.message}</p>}

      {status === "success" && (
        <div className={style.ConcertListBlock}>
          {data.pages.map((page, index) =>
            page.list.map((item, idx) => (
              <ConcertItem key={item.mt20id._text} item={item} />
            ))
          )}
        </div>
      )}

      <div ref={bottom} />

      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
};

export default Index;