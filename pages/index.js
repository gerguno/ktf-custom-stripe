import Link from "next/link";
import { FullsizeMedium } from "../components/FullsizeMedium";
import { request } from './api/getDataFromCMS';
import {useEffect} from "react";
import {MainLayout} from "../components/MainLayout"

export default function Home({typefaces}) {
    useEffect(()=>{
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
                                  <FullsizeMedium src={t.media.url} ext={t.media.mimeType}/>
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