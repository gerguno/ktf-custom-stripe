import Link from "next/link";
import { FullsizeMedium } from "../components/FullsizeMedium";
import { request } from './api/getDataFromCMS';
import { useEffect, useState } from "react";
import { MainLayout } from "../components/MainLayout"
import useWindowDimensions from "../components/useWindowDimensions"


export default function Home({typefaces}) {
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    },[])

  return (
      <MainLayout>
          {typefaces.map(t => {
              return (
                  <>
                      <div className="home-media">
                          <Link href={`/[slug]`} as={`/${t.slug}`}>
                              <a>
                                  {width > 768
                                      ?
                                        (<FullsizeMedium src={t.media.url} ext={t.media.mimeType}/>)
                                      :
                                        (<FullsizeMedium src={t.mediaMobile.url} ext={t.mediaMobile.mimeType}/>)
                                  }
                              </a>
                          </Link>
                      </div>
                  </>
              )
          })}
      </MainLayout>
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
    mediaMobile {
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