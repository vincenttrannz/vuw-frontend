const getFilterList = (isDesktop: boolean, dataFilter: string[], filterName: string, handleClick: (event:any) => void) => {
  return (
    <div data-parent-filter={filterName} className={`${isDesktop ? "categories-container__desktop" : "categories-container__mobile"}`}>
      {dataFilter.map((filter: string, i: number) => {
        return (
          <div
            key={i}
            onClick={handleClick}
            className={`p2 bold categories-container__category`}
            data-responsive={isDesktop ? "desktopFilter" : "mobileFilter"}
            data-filter={filter.replace(/ /g, "_")}
          >
            {filter.replace(/_/g, " ")}
          </div>
        );
      })}
    </div>
  )
}

export default getFilterList;