import { request } from './api/getDataFromCMS';
import { useEffect, useState } from "react";
import { MainLayout } from "../components/MainLayout"
import ReactMarkdown from "react-markdown";


export default function FAQ({faqs}) {
    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    },[])

    return (
        <MainLayout>
            <div className="slug-nav">
                <div>FAQ</div>
            </div>
            <div className="wrapper">
                <div className="faq">
                    {faqs.map(f => {
                        return (
                            <div className="faq-item">
                                <div className="faq-question">
                                    {f.question}
                                </div>
                                <div className="faq-answer">
                                    <ReactMarkdown source={f.answer}/>
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
  faqs {
    question
    answer
  }
}

    `
    })
    return {
        props: {
            faqs: data.faqs
        }
    }

}