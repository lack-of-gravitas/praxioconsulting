import dynamic from 'next/dynamic'

const Articles = dynamic(() => import('./ArticlesPaginated'))
const ContentBlock = dynamic(() => import('./ContentBlock'))
const Cta = dynamic(() => import('./Cta'))
const FAQs = dynamic(() => import('../global/FAQs'))
const Hero = dynamic(() => import('./Hero'))
const MajorFeature = dynamic(() => import('../global/MajorFeature'))
const MinorFeatures = dynamic(() => import('../global/MinorFeatures'))
const Price = dynamic(() => import('./Price'))
const Products = dynamic(() => import('../templates/Products'))
const RecentArticles = dynamic(() => import('./ArticlesRecent'))
const Reviews = dynamic(() => import('./Reviews'))
const SneakPeek = dynamic(() => import('./SneakPeek'))
const Team = dynamic(() => import('./Team'))

export const Block = ({ block, data }) => {
  // console.log("block.products: ", block);

  // switch (block.__component) { // using graphql
  switch (block.__component) {
    case 'blocks.course':
      // case "ComponentBlocksCourse":
      return <Products data={block} />
      break
    case 'blocks.products':
      // case "ComponentBlocksCourse":
      return <Products data={block} />
      break
    case 'blocks.cta':
      // case "ComponentBlocksCta":
      return <Cta data={block} />

    case 'blocks.faq':
      // case "ComponentBlocksFaq":
      return <FAQs data={block} />
      break
    // case "ComponentBlocksHero": // using graphql
    case 'blocks.hero':
      return <Hero data={block} />

    case 'blocks.major-feature':
      // case "ComponentBlocksMajorFeature":
      return <MajorFeature data={block} />

    case 'blocks.sneak-peek':
      // case "ComponentBlocksSneakPeek":
      return <SneakPeek data={block} />

    case 'blocks.single-price':
      // case "ComponentBlocksSinglePrice":
      return <Price data={block} product={data} displayFormat={'single'} />

    case 'blocks.multi-price':
      // case "ComponentBlocksMultiPrice":
      return <Price data={block} product={data} displayFormat={'multi'} />

    case 'blocks.minor-features':
      // case "ComponentBlocksMinorFeatures":
      return <MinorFeatures data={block} />

    case 'blocks.recent-articles':
      // case "ComponentBlocksRecentArticles":
      // console.log('data.path -- ', data.articles);
      if (data.slug === 'blog') {
        return <Articles data={block} articles={data.articles} />
      } else {
        return <RecentArticles data={block} articles={data.articles} />
      }

    case 'blocks.review':
      // case "ComponentBlocksReviews":
      return <Reviews data={block} />

    case 'blocks.rich-content':
      // case "ComponentBlocksRichContent":
      return <ContentBlock data={block} />

    case 'blocks.team':
      // case "ComponentBlocksTeam":
      return <Team data={block} />

    default:
      return <></>
  }
}
