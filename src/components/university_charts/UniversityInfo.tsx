import React from "react";
import { FaUniversity } from "react-icons/fa";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { DataState } from "../../interfaces/global.interface";
import { University } from "../../interfaces/university.interface";

export default function UniversityInfo(props: any) {
  // Access the redux store
  const universities: Record<number, University> = useSelector(
    (state: DataState) => state.universities
  );

  const uni = universities[props.uniId];

  const tailwindBoldValue = "text-base lg:text-xl font-semibold" + " ";
  const tailwindValueLabel = "text-base lg:text-xl font-light" + " ";
  const temp =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // Compute the uni enrollment component
  let enrollment;
  if (uni.uni_enrollment_low && uni.uni_enrollment_high) {
    enrollment = (
      <div className="flex items-center">
        <div className={tailwindBoldValue + "mr-1"}>
          {uni.uni_enrollment_low + "-" + uni.uni_enrollment_high}
        </div>
        <div className={tailwindValueLabel}> Enrollment</div>
      </div>
    );
  } else if (uni.uni_enrollment_low) {
    enrollment = (
      <div className="flex items-center">
        <MdArrowDropUp size={30} />
        <div className={tailwindBoldValue + "mr-1"}>
          {uni.uni_enrollment_low}
        </div>
        <div className={tailwindValueLabel}> Enrollment</div>
      </div>
    );
  } else {
    enrollment = (
      <div className="flex items-center">
        <MdArrowDropDown size={30} />
        <div className={tailwindBoldValue + "mr-1"}>
          {uni.uni_enrollment_high}
        </div>
        <div className={tailwindValueLabel}> Enrollment</div>
      </div>
    );
  }

  return (
    <div className="lg:pt-2 pl-8 pr-8 flex flex-col overflow-y-auto">
      <div className="flex items-center">
        <FaUniversity size={85} className="mr-6 mb-2" />
        <div className="mb-0.5">
          <div className="text-xl lg:text-4xl font-bold mb-0.5">
            {uni.name}
          </div>
          <div className="text-gray-600 text-xs lg:text-base">
            {uni.uni_acronym} ‧ {uni.location} ‧ {uni.uni_public ? "Public" : "Private"}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full lg:flex lg:flex-row lg:space-x-5 2xl:space-x-10 lg:content-center mb-0.5 mt-0.5 lg:mb-2 lg:mt-2">
        <div>
          <span className={tailwindBoldValue}>{uni.uni_founded}</span>
          <span className={tailwindValueLabel}> Founded</span>
        </div>
        {enrollment}
        <div>
          <span className={tailwindBoldValue}>#{uni.uni_rank}</span>
          <span className={tailwindValueLabel}> Ranking</span>
        </div>
      </div>
      <div className="h-fit lg:h-1/2 w-auto mt-2">
        {/* <div className="h-2/3 overflow-y-auto mb-4 text-gray-600">{uni.description}</div> */}
        <div className="h-fit mb-1 text-sm lg:text-lg text-gray-600">
          {temp}
        </div>
        {uni.website ? (
          <div className="text-blue text-sm lg:text-lg">
            <a href={uni.website} target="_blank" rel="noreferrer">
              University Website
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
