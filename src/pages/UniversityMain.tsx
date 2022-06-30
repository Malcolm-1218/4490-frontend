import React, { useState } from "react";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { MultipleDropDown } from "../components/MultipleDropDown";
import { OrderedList } from "../components/OrderedList";
import Select from "react-select";

export default function UniversityMain() {
  const sortItems = [
    { display: "Rank, Ascending", field: "uni_rank", order: "asc" },
    { display: "Rank, Descending", field: "uni_rank", order: "desc" },
    { display: "Alphabet, Ascending", field: "name", order: "asc" },
    { display: "Alphabet, Descending", field: "name", order: "desc" },
  ];
  const filterItems = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Northern Mariana Islands",
    "Mississippi",
    "Montana",
    "North Carolina	",
    "North Dakota	",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "UM",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
  ];
  const type = ["Public", "Private"];

  const [sort, setSort] = useState<any>(sortItems[0]);
  const [filters, setFilters] = useState<string[]>([]);

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
          Universities
        </p>
        <div className="flex flex-col lg:flex-row-reverse items-end">
          <div className="flex flex-row flex-wrap items-center max-w-full">
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
            <div className="flex flex-row items-center ml-auto lg:ml-0 my-2 max-w-full">
              <p className="px-5">Filters:</p>
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
            <div className="flex flex-row items-center ml-auto lg:ml-0 my-2 max-w-full">
              <p className="px-5">Type:</p>
              <Select
                className="text-xs lg:text-base max-w-min"
                onChange={(e) => {
                  if (e) {
                    setSort(e.value);
                  }
                }}
                options={type.map((item) => {
                  return { value: item, label: item };
                })}
                isSearchable={true}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <OrderedList page={"universities"} sort={sort} filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
