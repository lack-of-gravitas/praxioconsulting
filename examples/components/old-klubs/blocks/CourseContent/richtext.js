import parse from "html-react-parser";

export default function RichText(data) {
  return (
    <>
      <div className="relative px-4 pt-5 pb-5 bg-gray-50 sm:px-6 lg:pt-5 lg:pb-10 lg:px-8">
        <div className="relative mx-auto mt-6 prose text-gray-500 max-w-7xl prose-primaryColor prose-md">
          <h4>Everything you need to get up and running</h4>
          <p>
            Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>.
            Amet, massa quam varius orci dapibus volutpat cras. In amet eu
            ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut
            viverra ridiculus non molestie. Gravida quis fringilla amet eget dui
            tempor dignissim. Facilisis auctor venenatis varius nunc, congue
            erat ac. Cras fermentum convallis quam.
          </p>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div>
      </div>
    </>
  );
}
