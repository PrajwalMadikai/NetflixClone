import React from 'react'
import { Main } from '../components/Main'
import { Row } from '../components/Row'
import requests from '../Request'
export const Home = () => {
  return (<>
            <Main/>
           <Row rowId='1' title='UpComing' fetchURL={requests.requestUpcoming} />
           <Row rowId='2' title='Popular' fetchURL={requests.requestPopular} />
           <Row rowId='3' title='Top Rated' fetchURL={requests.requestTopRated} />
           <Row rowId='4' title='Now Playing' fetchURL={requests.requestNowplaying} />
         </>
        )
}
