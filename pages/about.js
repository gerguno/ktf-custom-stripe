import Link from "next/link";
import { request } from './api/getDataFromCMS';
import { useEffect, useState } from "react";
import { MainLayout } from "../components/MainLayout"
import useWindowDimensions from "../components/useWindowDimensions"
import ReactMarkdown from "react-markdown";


export default function About({about}) {
    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    },[])

    return (
        <MainLayout>
            <div className="slug-nav">
                <div>About</div>
            </div>
            <div className="wrapper">
                <div className="about">
                    <div className="about-section">
                        <div className="about-section-caption">
                            Profile
                        </div>
                        <div className="about-section-text">
                            <p>
                                {about.profile.intro}
                            </p>
                            <div className="about-section-text-main">
                                <div className="freak">
                                    <div>
                                        <ReactMarkdown source={about.profile.contentCol1}/>
                                    </div>
                                    <div>
                                        <ReactMarkdown source={about.profile.contentCol2}/>
                                    </div>
                                </div>
                                <div className="about-contacts">
                                    <div>
                                        <Link href={`mailto: ${about.profile.email}`}>
                                            <a>email</a>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href={`tel: ${about.profile.phoneNumber}`}>
                                            <a>{about.profile.phoneNumber}</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-section">
                        <div className="about-section-caption">
                            Approach
                        </div>
                        <div className="about-section-text">
                            <ReactMarkdown source={about.approach.content}/>
                        </div>
                    </div>
                    <div className="about-section">
                        <div className="about-section-caption">
                            Founders
                        </div>
                        <div className="about-section-text">
                            <div className="freak">
                                <div>
                                    <ReactMarkdown source={about.founders.contentCol1}/>
                                </div>
                                <div>
                                    <ReactMarkdown source={about.founders.contentCol2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
      contentCol1
      contentCol2
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
      contentCol1
      contentCol2
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