import Link from "next/link"
import { request } from '../api/getDataFromCMS'
import ReactMarkdown from "react-markdown"
import FadeCarousel from '../../components/FadeCarousel'

export default function Index({typeface}) {
    console.log(typeface)
    return (
        <>
            <div className='typeface'>
                <div>
                    <div>{typeface.releaseTitle}</div>
                    <div>{typeface.releaseDate}</div>
                </div>
                <div>
                    <div>
                        <Link href={`/[slug]/buy`} as={`/${typeface.slug}/buy`}>
                            <a>Buy (
                                {typeface.licenses[0] ? `${typeface.licenses[0].userss[0].price} ` : ''}
                                EUR)
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href={'mailto:info@kyivtypefoundry.com'}><a>Request Trial</a></Link>
                    </div>
                    <div>
                        <Link href={typeface.specimen.url}><a target="_blank">Specimen</a></Link>
                    </div>
                </div>
            </div>

            <ReactMarkdown source={typeface.about}/>

            <div className='carousel'>
                <FadeCarousel media={typeface.aboutMedia}/>
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