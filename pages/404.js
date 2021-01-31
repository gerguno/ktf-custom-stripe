import Link from "next/link"
import {MainLayout} from "../components/MainLayout";

export default function ErrorPage() {
    return (
        <MainLayout title={'404 • Kyiv Type Foundry'}>
            <div className="wrapper">
                <div>
                    <p>
                        Page not found @ K___T___F
                    </p>
                    <Link href={'/'}><a>Go Home</a></Link>
                </div>
            </div>
        </MainLayout>
    )
}