import React, { useState } from "react";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { MultipleDropDown } from "../components/MultipleDropDown";
import { OrderedList } from "../components/OrderedList";
import Select from "react-select";

export default function PoliticianMain() {
  const sortItems = [
    { display: "Alphabet, Ascending", field: "name", order: "asc" },
    { display: "Alphabet, Descending", field: "name", order: "desc" },
    {display: "Age, Ascending", field: "dob", order: "asc"},
    {display: "Age, Descending", field: "dob", order: "desc"}
  ];

  const filterItems = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MP",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UM",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];
  const positionItem = ["Current House","Former House","Current Senate", "Former Senate", "Current Governor", "Former Governor","Current President","Former President","Current Vice President","Former Vice President"];
  const currentState = ["Active", "Retired"];

  const [sort, setSort] = useState<any>(sortItems[0]);
  const [filters, setFilters] = useState<string[]>([]);
  const [currState, setCurrState] = useState<any>();
  const [position, setPosition] = useState<any>();

  const customStyles = {
    valueContainer: (base: any) => ({
      ...base,
      flexWrap: "nowrap",
    }),
    control: (base: any) => ({
      ...base,
      minWidth: "200px",
      maxWidth: "500px",
    }),
    container: (base: any) => ({
      ...base,
      minWidth: "200px",
      maxWidth: "100%",
    }),
  };

  return (
    <div>
      <Header />
      <div className="m-10 lg:m-20 flex flex-col space-y-5">
        <p className="w-fill text-xl lg:text-4xl font-bold text-center sm:text-left">
          Politicians
        </p>
        <div className="flex flex-col lg:flex-row-reverse items-end">
          <div className="flex flex-row flex-wrap items-center max-w-full">
            {/* sort */}
            <div className="flex flex-row items-center ml-auto lg:ml-0 my-2 max-w-full">
              <p className="px-5">Sort:</p>
              <Select
                className="text-xs lg:text-base"
                onChange={(e) => {
                  if (e) {
                    setSort(e.value);
                  }
                }}
                defaultValue={{
                  value: sortItems[0],
                  label: sortItems[0].display,
                }}
                options={sortItems.map((item) => {
                  return { value: item, label: item.display };
                })}
                isSearchable={false}
                styles={customStyles}
              />
            </div>
            {/* Filters */}
            <div className="flex flex-row items-center ml-auto lg:ml-0 my-2 max-w-full">
              <p className="px-5">State:</p>
              <Select
                className="text-xs lg:text-base max-w-min"
                isMulti
                onChange={(e) => {
                  if (e) {
                    setFilters(
                      Array.from(e.values()).map((item) => item.value)
                    );
                  }
                }}
                options={filterItems.map((item) => {
                  return { value: item, label: item };
                })}
                isSearchable={true}
                styles={customStyles}
              />
            </div>
            {/* Position */}
            <div className="flex flex-row items-center ml-auto lg:ml-0 my-2 max-w-full">
              <p className="px-5">Position:</p>
              <Select
                className="text-xs lg:text-base max-w-min"
                onChange={(e) => {
                  if (e) {
                    setCurrState(e.value);
                  }
                }}
                options={positionItem.map((item) => {
                  return { value: item, label: item };
                })}
                isSearchable={true}
                styles={customStyles}
              />
            </div>
            {/* CurrentState */}
            <div className="flex flex-row items-center ml-auto lg:ml-0 my-2 max-w-full">
              <p className="px-5">Active/Retired:</p>
              <Select
                className="text-xs lg:text-base max-w-min"
                onChange={(e) => {
                  if (e) {
                    setCurrState(e.value);
                  }
                }}
                options={currentState.map((item) => {
                  return { value: item, label: item };
                })}
                isSearchable={true}
                styles={customStyles}
              />
            </div>
            
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <OrderedList page={"recipients"} sort={sort} filters={filters} currState={currState}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
