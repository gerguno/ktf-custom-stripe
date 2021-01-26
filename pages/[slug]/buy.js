import Link from "next/link"
import { request } from '../api/getDataFromCMS'
import { Typeface } from '../../components/Typeface'
import ProductContextProvider from "../../contexts/ProductContext";
import {useEffect} from "react";

export default function Buy({typeface}) {
    useEffect(() => {
        document.body.style.backgroundColor = '#E9E9E9'
    },[])
    return (
        <ProductContextProvider>
            <Typeface typeface={typeface}/>
        </ProductContextProvider>
    )
}

export async function getStaticPaths() {
    const data = await request({
        query: `
			{
			  typefaces {
				slug
			  }
			}
		`,
    })
    return {
        paths: data.typefaces.map((t) => `/${t.slug}/buy`) || [],
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const data = await request({
        query: `
query ($slug: String) {
  typefaces(where: {slug: $slug}) {
    title
    id
    slug
    releaseTitle
    releaseDate
    about
    aboutMedia {
      url
    }
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
    familyPackage {
      familyPackageTitle
      familyPackageLicenses {
        licenseTitle
        userss {
          option
          title
          price
        }
      }
    }
  }
}
    `,
        variables: {
            slug: params.slug
        }
    })
    return {
        props: {
            typeface: data.typefaces[0]
        }
    }

}