const Annotation = ({ ...props }) => {
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
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
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

export default Annotation
