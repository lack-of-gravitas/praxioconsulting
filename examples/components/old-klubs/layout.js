import delve from "dlv";
import Footer from "./global/Footer";
import Navbar from "./global/Navbar";
import PreviewBanner from "./global/previewBanner";
import Seo from "./seo";

const Layout = ({ data, seo, slug, children, preview }) => {
  return (
    <div>
      <Seo seo={seo} />
      {preview && <PreviewBanner />}
      <Navbar {...data} slug={slug} />
      {children}
      <Footer {...data} />
    </div>
  );
};

export default Layout;
