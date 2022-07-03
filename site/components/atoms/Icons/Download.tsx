const Download = ({ ...props }) => {
  return (
    <svg
      data-testid="geist-icon"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      // style="color:var(--geist-foreground)"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
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

export default Download
