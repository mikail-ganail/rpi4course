import type { JSX } from "react";
import { useState } from "react";

const SORTING_OPTIONS = [
  { id: "popular", label: "Popular" },
  { id: "price-low-high", label: "Price: low to high" },
  { id: "price-high-low", label: "Price: high to low" },
  { id: "top-rated", label: "Top rated first" },
] as const;

type SortingOption = (typeof SORTING_OPTIONS)[number];

function Sorting(): JSX.Element {
  const [activeOption, setActiveOption] =
    useState<SortingOption["id"]>("popular");
  const [isOpened, setIsOpened] = useState(false);

  const toggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  const handleOptionClick = (optionId: SortingOption["id"]) => {
    setActiveOption(optionId);
    setIsOpened(false); // Закрываем при выборе
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleDropdown}
      >
        {SORTING_OPTIONS.find((opt) => opt.id === activeOption)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${
          isOpened ? "places__options--opened" : ""
        }`}
      >
        {SORTING_OPTIONS.map((option) => (
          <li
            key={option.id}
            className={`places__option ${
              activeOption === option.id ? "places__option--active" : ""
            }`}
            tabIndex={0}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { Sorting };
