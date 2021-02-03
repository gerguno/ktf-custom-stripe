import Link from "next/link"
import { request } from '../api/getDataFromCMS'
import ReactMarkdown from "react-markdown"
import FadeCarousel from "../../components/FadeCarousel"
import FadeCarouselMob from "../../components/FadeCarouselMob"
import { useEffect } from "react"
import {FullsizeMedium} from "../../components/FullsizeMedium";
import {MainLayout} from "../../components/MainLayout";
import useWindowDimensions from "../../components/useWindowDimensions";

export default function Index({typeface}) {
    const { height, width } = useWindowDimensions();

    useEffect(()=>{
        document.body.style.backgroundColor = '#FFFFFF'
    },[])

    return (
        <MainLayout
            title={`${typeface.releaseTitle} • Kyiv Type Foundry`}
            seoTitle={typeface.seoTitle}
            seoDescription={typeface.seoDescription}
        >
            <div className="slug-nav">
                <div className="close">
                    <Link href={`/`}>
                        <a>
                            <img src="/close.svg" alt=""/>
                        </a>
                    </Link>
                </div>
                <div>{typeface.releaseTitle}</div>
            </div>
            {width > 768
                ?
                    (<>
                        <div className="slug-buy">
                            <Link href={`/[slug]/buy`} as={`/${typeface.slug}/buy`}>
                                <button className="pink">Buy</button>
                            </Link>
                        </div>
                        <div className="slug-carousel">
                            <FadeCarousel media={typeface.aboutMedia}/>
                        </div>
                    </>)
                :
                    (<div className="slug-carousel">
                        <FadeCarouselMob media={typeface.aboutMediaMobile}/>
                        <div className="slug-buy">
                            <Link href={`/[slug]/buy`} as={`/${typeface.slug}/buy`}>
                                <button className="pink">Buy</button>
                            </Link>
                        </div>
                    </div>)
            }
            <div className='wrapper'>
                <div className="slug-buttons">
                    <form action={typeface.specimen.url} target='_blank'>
                        <button className="darkgrey">PDF Specimen</button>
                    </form>
                    <form action='mailto:info@kyivtypefoundry.com'>
                        <button>Request trial</button>
                    </form>
                </div>

                <div className="slug-about">
                    <div className="slug-about-text">
                        <ReactMarkdown source={typeface.about}/>
                    </div>
                    {typeface.footnote &&
                        <div className="slug-about-footnote">
                            <ReactMarkdown source={typeface.footnote}/>
                        </div>
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export async function getStaticPaths() {
    const data = await request({
        query: `
			{
			  typefaces {
				slug
			  }
			}
		`,
    })
    return {
        paths: data.typefaces.map((t) => `/${t.slug}`) || [],
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const data = await request({
        query: `
query ($slug: String) {
  typefaces(where: {slug: $slug}) {
    title
    id
    slug
    releaseTitle
    seoTitle
    seoDescription
    about
    aboutMedia {
      url
    }
    aboutMediaMobile {
      url
    }
    footnote
    specimen {
      url
    }
    media {
      url
      mimeType
    }
    fonts {
      fontTitle
    }
    licenses {
      licenseTitle
      userss {
        option
        title
        price
      }
    }
    familyPackage {
      familyPackageTitle
      familyPackageLicenses {
        licenseTitle
        userss {
          option
          title
          price
        }
      }
    }
  }
}
    `,
        variables: {
            slug: params.slug
        }
    })
    return {
        props: {
            typeface: data.typefaces[0]
        }
    }

}