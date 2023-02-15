import { Suspense } from 'react'
import User from './component/User'
import fetchData from './modules/fetchData'

function Test() {

    return (
        <div className='Suspense'>
            <div style={{ marginTop: "400px" }}>suspense 연습페이지입니다.</div>
            <Suspense fallback={<div></div>}>
                {/* 함수를 호출해서 인자로 userId를 전달한 값의 결과값을 prop으로 전달 */}
                <User resource={fetchData()} />
            </Suspense>
        </div>
    )
}
export default Test