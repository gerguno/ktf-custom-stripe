import { request } from './api/getDataFromCMS';
import { useEffect, useState } from "react";
import { MainLayout } from "../components/MainLayout"
import ReactMarkdown from "react-markdown";
import Link from "next/link";


export default function InUse({inuses}) {
    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    },[])

    return (
        <MainLayout>
            <div className="slug-nav">
                <div>In Use</div>
            </div>
            <div className="wrapper">
                <div className="inuse">
                    {inuses.map(i => {
                        return (
                            <div className="inuse-item">
                                <div className="inuse-image">
                                    <img src={i.picture.url}/>
                                </div>
                                <div className="inuse-link">
                                    <div>
                                        <img src='./bullet.svg' width="13px" height="13px"/>
                                    </div>
                                    <div>
                                        <Link href={i.urlToAuthor}>
                                            <a>
                                                link
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </MainLayout>
    )
}

export async function getStaticProps() {
    const data = await request({
        query: `
{
  inUses {
    picture {
      url
    }
    urlToAuthor
  }
}

    `
    })
    return {
        props: {
            inuses: data.inUses
        }
    }

}