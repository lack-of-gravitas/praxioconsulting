const Menu = ({ ...props }) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="w-6 h-6"
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke="currentColor"
    //   {...props}
    // >
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     strokeWidth={2}
    //     d="M4 6h16M4 12h16m-7 6h7"
    //   />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
      data-testid="geist-icon"
      height="24"
      shapeRendering="geometricPrecision"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      width="24"
      // style="color:var(--geist-foreground)"
    >
      <path d="M3 12h18" />
      <path d="M3 6h18" />
      <path d="M3 18h18" />
    </svg>
  )
}

export default Menu
