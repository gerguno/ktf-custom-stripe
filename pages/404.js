import Link from "next/link"
import {MainLayout} from "../components/MainLayout";
import React from "react";
import useWindowDimensions from "../components/useWindowDimensions";

export default function ErrorPage() {
    return (
        <MainLayout title={'404 • Kyiv Type Foundry'}>
            <div className="not-found">
                <img src="./404.png"/>
            </div>
            <div className="slug-nav difference">
                <p>{`This page doesn't exist. `}<Link href={'/'}><a>Go home!</a></Link></p>
            </div>
        </MainLayout>
    )
}