import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { DataState } from "../interfaces/global.interface";
// import { Politician } from "../interfaces/politician.interface";
// import { useSelector } from "react-redux";

export function OrderedList(props: any) {
  const [sort, setSort] = useState<any>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>(["empty"]);
  //const [id, setId] = useState<any>();

  // Access the redux store
  // const politicians: Record<number, Politician> = useSelector(
  //   (state: DataState) => state.politicians
  // );
  
  // const poli = politicians[props.poliId];
  
  // Get politician age from DOB
  const getAge = (dob: string) => {
    const today = new Date();
    const bday = new Date(dob);
    let age = today.getFullYear() - bday.getFullYear();
    const m = today.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    return age;
  };

  const getResult = async () => {
    let url = `${process.env.REACT_APP_API_BASE_URL}/${props.page}/list?sortField=${props.sort.field}&order=${props.sort.order}`;
    if (props.filters.length > 0) {
      if (props.page === "organizations") {
        url =
          url + `&industries=${props.filters.join(",").replace(/&/g, "%26")}`;
      } else if (props.page === "universities") {
        url = url + `&states=${props.filters.join(",")}`;
      } else if (props.page === "recipients") {
        url = url + `&states=${props.filters.join(",")}`;
      }
    }
    const res = await fetch(url);
    const data = await res.json();
    setResults(data[props.page]);
  };

  useEffect(() => {
    if (
      results[0] === "empty" ||
      sort !== props.sort ||
      filters !== props.filters
    ) {
      setSort(props.sort);
      setFilters(props.filters);
      getResult();
    }
  });

  const listHeader = () => {
    if (props.page == "organizations") {
      return (
        <div className="hidden md:flex flex-row p-4">
          <p className="grow-1 basis-1/3 font-semibold">Name</p>
          <p className="grow-1 basis-1/3 font-semibold">Industry</p>
          <div className="grow-1 basis-1/3" />
        </div>
      );
    } else if (props.page == "universities") {
      return (
        <div className="hidden md:flex flex-row p-4">
          <p className="grow-1 basis-1/4 font-semibold">Name</p>
          <p className="grow-1 basis-1/4 font-semibold">Rank</p>
          <p className="grow-1 basis-1/4 font-semibold">Type</p>
          <div className="grow-1 basis-1/4" />
        </div>
      );
    } else if (props.page == "recipients") {
      return (
        <div className="hidden md:flex flex-row p-4">
          <p className="grow-1 basis-1/4 font-semibold">Name</p>
          <p className="grow-1 basis-1/4 font-semibold">State</p>
          <p className="grow-1 basis-1/4 font-semibold">Age</p>
          <div className="grow-1 basis-1/3" />
        </div>
      );
    }
  };

  const listEntry = (entry: any, index: number) => {
    if (props.page == "organizations") {
      return (
        <Link key={index} to={"/corporations/" + entry.id}>
          <div className="flex flex-row justify-between bg-white border rounded-lg px-4 py-2">
            <div className="flex flex-col md:flex-row basis-2/3">
              <p className="grow-1 basis-1/2">{entry.name}</p>
              <p className="grow-1 basis-1/2 text-sm md:text-base text-gray-700">
                {entry.industry}
              </p>
            </div>
            <div className="flex flex-row-reverse grow-1 basis-1/3 items-center">
              <FiExternalLink size="1.1em" />
            </div>
          </div>
        </Link>
      );
    } else if (props.page == "universities") {
      return (
        <Link key={index} to={"/universities/" + entry.id}>
          <div className="flex flex-row justify-between bg-white border rounded-lg px-4 py-2">
            <div className="flex flex-col md:flex-row basis-3/4">
              <p className="grow-1 basis-1/3">{entry.name}</p>
              <p className="grow-1 basis-1/3 text-sm md:text-base">
                #{entry.id}
              </p>
              <p className="grow-1 basis-1/3 text-sm md:text-base text-gray-700">
                {entry.uni_public ? "Public" : "Private"}
              </p>
            </div>
            <div className="flex flex-row-reverse grow-1 basis-1/4 items-center">
              <FiExternalLink size="1.1em" />
            </div>
          </div>
        </Link>
      );
    } else if (props.page == "recipients") {
      return (
        <Link key={index} to={"/politicians/" + entry.id}>
          <div className="flex flex-row justify-between bg-white border rounded-lg px-4 py-2">
            <div className="flex flex-col md:flex-row basis-3/4">
              <p className="grow-1 basis-1/3">{entry.name}</p>
              <p className="grow-1 basis-1/3 text-sm md:text-base ">
                {entry.state}
              </p>
              <p className="grow-1 basis-1/3">{entry.dob}</p>
            </div>
            <div className="flex flex-row-reverse grow-1 basis-1/3 items-center">
              <FiExternalLink size="1.1em" />
            </div>
          </div>
        </Link>
      );
    }
  };

  if (results[0] !== "empty") {
    return (
      <div className="relative">
        {listHeader()}
        <div className="flex flex-col space-y-2">
          {results.map((entry: any, index: number) => {
            return listEntry(entry, index);
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen flex justify-center content-center items-center justify-items-center">
      <FaSpinner size={50} className="animate-spin mb-16" />
    </div>
  );
}
