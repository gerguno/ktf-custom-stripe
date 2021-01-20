import Link from "next/link";
import { FullsizeMedium } from "../components/FullsizeMedium";
import { request } from './api/getDataFromCMS';
import {useEffect} from "react";

export default function Home({typefaces}) {
    useEffect(()=>{
        document.body.style.backgroundColor = '#FFFFFF'
    },[])

  return (
      <>
          <div className="logo">
              KTF
          </div>
          <div className="wrapper">
              {typefaces.map(t => {
                return (
                    <>
                        <div className='home-banner'>
                            <div>
                                <div>{t.releaseTitle}</div>
                            </div>
                            <div>
                                <div>
                                    <Link href={`/[slug]/buy`} as={`/${t.slug}/buy`}>
                                        <a>Buy</a>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={`/[slug]`} as={`/${t.slug}`}>
                                        <a>Look</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="home-media">
                            <Link href={`/[slug]`} as={`/${t.slug}`}>
                                <a>
                                    <FullsizeMedium src={t.media.url} ext={t.media.mimeType}/>
                                </a>
                            </Link>
                        </div>
                    </>
                )
              })}
          </div>
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