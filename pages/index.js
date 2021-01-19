import Link from "next/link";
import { FullsizeMedium } from "../components/FullsizeMedium"
import { request } from './api/getDataFromCMS'

export default function Home({typefaces}) {

  return (
      <>
          {typefaces.map(t => {
            return (
                <>
                    <div className='typeface'>
                        <div>
                            <div>{t.releaseTitle}</div>
                            <div>{t.releaseDate}</div>
                        </div>
                        <div>
                            <div>
                                <Link href={`/[slug]/buy`} as={`/${t.slug}/buy`}>
                                    <a>Buy (
                                        {t.licenses[0] ? `${t.licenses[0].userss[0].price} ` : ''}
                                        EUR)
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href={'mailto:info@kyivtypefoundry.com'}><a>Request Trial</a></Link>
                            </div>
                            <div>
                                <Link href={t.specimen.url}><a target="_blank">Specimen</a></Link>
                            </div>
                        </div>
                    </div>
                    <Link href={`/[slug]`} as={`/${t.slug}`}>
                        <a>
                            <FullsizeMedium src={t.media.url} ext={t.media.mimeType}/>
                        </a>
                    </Link>

                </>
            )
          })}
          <div className='footer'>© 2020 Kyiv, Hannover. All rights reserved</div>
      </>
  )
}

export async function getStaticProps() {
    const data = await request({
        query: `
{
  typefaces {
    title
    id
    slug
    releaseTitle
    releaseDate
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
  }
}
    `
    })
    return {
        props: {
            typefaces: data.typefaces
        }
    }

}