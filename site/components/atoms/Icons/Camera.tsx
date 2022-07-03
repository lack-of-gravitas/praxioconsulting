const Camera = ({ ...props }) => {
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
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
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

export default Camera
