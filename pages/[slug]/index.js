import Link from "next/link"
import { request } from '../api/getDataFromCMS'
import ReactMarkdown from "react-markdown"
import FadeCarousel from '../../components/FadeCarousel'
import { useEffect } from "react"
import {FullsizeMedium} from "../../components/FullsizeMedium";

export default function Index({typeface}) {
    useEffect(()=>{
        document.body.style.backgroundColor = '#E9E9E9'
    },[])

    return (
        <>
            <div className='wrapper'>
                <div className="slug-banner">
                    <div>
                        <Link href={`/`}>
                            <a>
                                <img src='/close.svg' alt=""/>
                            </a>
                        </Link>
                    </div>
                    <div className="slug-banner-title">
                        <div>{typeface.releaseTitle}</div>
                    </div>
                    <div>
                        <div>
                            <span style={{borderBottom: '1px solid black'}}>
                                Look
                            </span>
                        </div>
                        <div>
                            <Link href={`/[slug]/buy`} as={`/${typeface.slug}/buy`}>
                                <a>Buy</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="slug-about">
                    <ReactMarkdown source={typeface.about}/>
                </div>
                <div>
                    <div className='carousel'>
                        <FadeCarousel media={typeface.aboutMedia}/>
                    </div>
                </div>
            </div>
        </>
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
    releaseDate
    about
    aboutMedia {
      url
    }
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