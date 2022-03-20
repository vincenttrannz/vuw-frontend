export const getFilterList = (isDesktop: boolean, dataFilter: string[], filterName: string, handleClick: (event:any) => void) => {
  return (
    <div id={filterName} className={`${isDesktop ? "categories-container__desktop" : "categories-container__mobile"}`}>
      {dataFilter.map((filter: string, i: number) => {
        return (
          <a
            key={i}
            onClick={handleClick}
            type="button"
            className={`p2 bold categories-container__category`}
            data-filter={filter.replace(/ /g, "_")}
          >
            {filter.replace(/_/g, " ")}
          </a>
        );
      })}
    </div>
  )
}