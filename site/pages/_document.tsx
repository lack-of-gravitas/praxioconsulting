import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />

        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        {/* <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MN6W52S');`,
            }}
          ></script> */}

        <body className="loading">
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MN6W52S" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <script
            type="text/javascript"
            src="https://static.typebot.io/typebot-1.0.0.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `var typebot = Typebot.Chat({publishId: "faq-mj24-mnn49",buttonColor: "#e27d60",buttonIconUrl: "",loadingColors: {chatBackground: "#ffffff",bubbleBackground: "#F7F8FF",typingDots: "#303235",},proactiveMessage: {avatar: "undefined",textContent: "Contact the sales team",delay: 60000,remember: true}});`,
            }}
          ></script> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
