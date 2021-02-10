import Link from "next/link";
import { request } from './api/getDataFromCMS';
import { useEffect, useState } from "react";
import { MainLayout } from "../components/MainLayout"
import useWindowDimensions from "../components/useWindowDimensions"


export default function About({about}) {
    // const { height, width } = useWindowDimensions();
    console.log(about);

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    },[])

    return (
        <MainLayout>
            <div className="about-section">
                <div className="about-section-caption">
                    Profile
                </div>
                <div>
                    <p>
                        {about.profile.intro}
                    </p>
                    <p>
                        {about.profile.content}
                    </p>
                    <p>
                        {about.profile.email}
                    </p>
                    <p>
                        {about.profile.phoneNumber}
                    </p>
                </div>
            </div>
            <div className="about-section">
                <div className="about-section-caption">
                    Approach
                </div>
                <div>
                    <p>
                        {about.profile.content}
                    </p>
                </div>
            </div>
            <div className="about-section">
                <div className="about-section-caption">
                    Founders
                </div>
                <div>
                    <p>
                        {about.founders.content}
                    </p>
                </div>
            </div>
            {/*{typefaces.map(t => {*/}
            {/*    return (*/}
            {/*        <>*/}
            {/*            <div className="home-media">*/}
            {/*                <Link href={`/[slug]`} as={`/${t.slug}`}>*/}
            {/*                    <a>*/}
            {/*                        {width > 768*/}
            {/*                            ?*/}
            {/*                            (<FullsizeMedium src={t.media.url} ext={t.media.mimeType}/>)*/}
            {/*                            :*/}
            {/*                            (<FullsizeMedium src={t.mediaMobile.url} ext={t.mediaMobile.mimeType}/>)*/}
            {/*                        }*/}
            {/*                    </a>*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*    )*/}
            {/*})}*/}
        </MainLayout>
    )
}

export async function getStaticProps() {
    const data = await request({
        query: `
{
  abouts {
    profile {
      intro
      content
      email
      phoneNumber
    }
    approach {
      content
      image {
        url
      }
    }
    founders {
      content
    }
  }
}
    `
    })
    return {
        props: {
            about: data.abouts[0]
        }
    }

}