const Logout = ({ ...props }) => {
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
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>

    //   <svg
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

export default Logout
