const Collection = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      data-testid="geist-icon"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
    // <svg
    //   width="24"
    //   height="20"
    //   viewBox="0 0 24 20"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    //   data-testid="geist-icon"
    //   shapeRendering="geometricPrecision"
    //   stroke="currentColor"
    //   strokeWidth="1.5"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"

    //   // style="color:var(--geist-foreground)"
    // >
    //   <circle cx="12" cy="12" r="10" fill="var(--geist-fill)" />
    //   <path d="M12 8v4" stroke="var(--geist-stroke)" />
    //   <path d="M12 16h.01" stroke="var(--geist-stroke)" />
    // </svg>
  )
}

export default Collection
